import type { AiFriend } from "$gql/generated/graphql";

export const getAIFriends = async (): Promise<AiFriend[]> => {
    const result = await fetch('/api/v1/ai-friends', { method: 'GET' });
    const val = await result.json();
    return val;
}