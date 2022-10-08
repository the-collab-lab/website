import { gql } from 'graphql-request';

const ApplicationBlock = gql`
	fragment ApplicationBlock on Query {
		applicationBlock: textBlock(where: { id: "ckjwc7a3cak3v0d34n057w44k" }) {
			textContent {
				html
			}
		}
	}
`;

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

const CollabiesAndTeams = gql`
	fragment CollabiesAndTeams on Query {
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

const Pages = gql`
	fragment Pages on Query {
		pages {
			slug
			blocks {
				__typename
				... on TextBlock {
					textContent {
						html
					}
					visible
				}
				... on ImageFloatedRight {
					path
					caption
				}
			}
		}
	}
`;

const TechTalks = gql`
	fragment TechTalks on Query {
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

const Testimonials = gql`
	fragment Testimonials on Query {
		testimonials {
			collabie {
				fullName
				pathToPhoto
			}
			body {
				html
			}
		}
	}
`;

export const ComposedQuery = gql`
	{
		...ApplicationBlock
		...CollabiesAndTeams
		...Pages
		...TechTalks
		...Testimonials
	}
	${ApplicationBlock}
	${CollabiesAndTeams}
	${Pages}
	${TechTalks}
	${Testimonials}
`;
