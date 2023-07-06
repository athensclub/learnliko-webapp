import { graphql } from '$gql/generated';

export const CREATE_USER_ACCOUNT = graphql(`
	mutation Mutation($data: UserCreateDataInput!) {
		userCreate(data: $data) {
			uid
			username
			profile {
				imageUrl
				coverUrl
				fullname
				firstname
				lastname
			}
			languageLevel {
				overall {
					progress
					level
				}
				vocabulary {
					progress
					level
				}
				grammar {
					progress
					level
				}
				communication {
					progress
					level
				}
			}
			coin
			exp
			classRoom {
				id
				name
			}
		}
	}
`);
