// modified from https://js.langchain.com/docs/modules/chains/index_related_chains/conversational_retrieval
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SECRET_OPENAI_API_KEY } from '$env/static/private';
import type { ChatMessage } from "$lib/types/requests/chatCompletion";
import { HumanChatMessage, SystemChatMessage, AIChatMessage } from "langchain/schema";
/* Load in the file we want to do question answering over */
import text from "$lib/server/db/learnliko_info.txt?raw";

const nonStreamingModel = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: SECRET_OPENAI_API_KEY,
});
/* Split the text into chunks */
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);
/* Create the vectorstore */
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings(
    { openAIApiKey: SECRET_OPENAI_API_KEY }
));

const chatMessageToLangchainMessage = (message: ChatMessage) => {
    if (message.role === 'assistant') {
        return new AIChatMessage(message.content);
    } else if (message.role === 'user') {
        return new HumanChatMessage(message.content);
    } else {
        return new SystemChatMessage(message.content);
    }
}

export const assistantChatCompletion = async (message: ChatMessage[]) => {
    const query = message.pop();
    if (!query)
        throw new Error("Call assistant chat completion with empty arguments");

    // modified from https://stackoverflow.com/a/74336207
    const stream = new ReadableStream<string>({
        async start(controller) {
            /* Initialize the LLM to use to answer the question */
            const model = new ChatOpenAI({
                modelName: "gpt-3.5-turbo",
                openAIApiKey: SECRET_OPENAI_API_KEY,
                streaming: true,
                callbacks: [
                    {
                        handleLLMNewToken(token) {
                            controller.enqueue(token);
                        },
                    },
                ],
            });

            /* Create the chain */
            const chain = ConversationalRetrievalQAChain.fromLLM(
                model,
                vectorStore.asRetriever(),
                {
                    returnSourceDocuments: true,
                    questionGeneratorChainOptions: {
                        llm: nonStreamingModel,
                    },
                }
            );

            await chain.call({ question: query.content, chat_history: message.map(chatMessageToLangchainMessage) });
            controller.close();
        },
    })
    return stream;
}