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

const CollabiesAndTeams = gql`
	fragment CollabiesAndTeams on Query {
		collabies(
			where: {
				AND: [
					{ NOT: { roles_every: { name: "Participant" } } }
					{ roles_some: {} }
					{ visible: true }
				]
			}
			orderBy: firstName_ASC
		) {
			...collabieData
			roles(where: { name_not: "Participant" }, orderBy: name_ASC) {
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
			project {
				title
				gitHubUrl
				firebaseUrl
				previewImage {
					url(
						transformation: {
							image: { resize: { width: 240, height: 240, fit: crop } }
							document: { output: { format: png } }
						}
					)
				}
			}
		}
	}
	${COLLABIE_DATA_FRAGMENT}
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

const Projects = gql`
	fragment Projects on Query {
		projects {
			title
			team {
				anchor
				displayName
				startDate
				endDate
			}
			gitHubUrl
			firebaseUrl
			previewImage {
				thumbnail: url(
					transformation: {
						image: { resize: { width: 50, height: 50, fit: clip } }
						document: { output: { format: png } }
					}
				)
				url(transformation: { document: { output: { format: png } } })
			}
		}
	}
`;

export const ComposedQuery = gql`
	{
		...CollabiesAndTeams
		...TechTalks
		...Testimonials
		...Projects
	}
	${CollabiesAndTeams}
	${TechTalks}
	${Testimonials}
	${Projects}
`;
