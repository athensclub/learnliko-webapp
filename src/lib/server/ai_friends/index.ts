import type { AiFriend } from '$gql/generated/graphql';

export const queryAIFriends = async (): Promise<AiFriend[]> => {
    const data = await import('$lib/server/db/ai_friends.json');
    return data.default;
};