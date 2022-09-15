import { gql } from "graphql-request";

export const VolunteerQuery = gql`
  query Volunteers {
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
  }
`;