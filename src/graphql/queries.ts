import { gql } from 'graphql-request';

const COLLABIE_DATA_FRAGMENT = gql`
	fragment collabieData on Collabie {
		bio {
			html
		}
		firstName
		fullName
		pathToPhoto
		gitHubUrl
		linkedInUrl
		twitterUrl
	}
`;

export const CollabiesAndTeamsQuery = gql`
	query CollabiesAndTeams {
		collabies(
			where: { NOT: { roles_every: { name: "Participant" } }, visible: true }
			orderBy: firstName_ASC
		) {
			...collabieData
			roles(where: { name_not: "Participant" }) {
				name
			}
		}
		teams(where: { visible: true }, orderBy: startDate_DESC) {
			anchor
			displayName
			startDate
			endDate
			developers: participants(orderBy: firstName_ASC) {
				...collabieData
			}
		}
	}
	${COLLABIE_DATA_FRAGMENT}
`;

export const FrontPageApplicationBlockQuery = gql`
	query FrontPageApplicationBlock {
		textBlocks(
			where: {
				internalName_contains: "Front Page – Applications"
				visible: true
			}
		) {
			textContent {
				html
			}
		}
	}
`;

export const TechTalksQuery = gql`
	query TechTalks {
		techTalks(orderBy: dateAndTime_DESC) {
			title
			presenters {
				fullName
			}
			dateAndTime
			description {
				html
			}
			meetupUrl
			youTubeUrl
			image {
				url
				width
				height
			}
			visible
		}
	}
`;
