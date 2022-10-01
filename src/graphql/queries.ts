import { gql } from 'graphql-request';

export const CollabiesAndTeamsQuery = gql`
	query {
		collabies(
			where: { NOT: { roles_every: { name: "Participant" } }, visible: true }
			orderBy: firstName_ASC
		) {
			bio {
				html
			}
			roles(where: { name_not: "Participant" }) {
				name
			}
			firstName
			fullName
			pathToPhoto
			gitHubUrl
			linkedInUrl
			twitterUrl
		}
		teams(where: { visible: true }, orderBy: startDate_DESC) {
			anchor
			displayName
			startDate
			endDate
			developers: participants(orderBy: firstName_ASC) {
				firstName
				fullName
				pathToPhoto
				gitHubUrl
				linkedInUrl
				twitterUrl
				bio {
					html
				}
			}
		}
	}
`;
