import { request } from 'graphql-request';
import { format, parseISO } from 'date-fns';

import { CollabiesAndTeamsQuery } from './queries';
import type { Bio, CollabieData, GQLResponse, Role } from './types';

/**
 * Transforms two dates of type 2020-10-10 and 2020-11-11 to
 * October 2020 - November 2020
 *
 * Used in the Teams section.
 */
const calculatedDate = ({ startDate, endDate }: Record<string, string>) => {
	let startMask = 'MMMM y';
	const endMask = 'MMMM y';

	// if the years are the same, don’t show the year twice
	// e.g., "December 2019 – January 2020"
	// e.g., "October – November 2020"
	if (startDate.slice(0, 4) === endDate.slice(0, 4)) {
		startMask = 'MMMM';
	}

	const formattedStartDate = format(parseISO(startDate), startMask);
	const formattedEndDate = format(parseISO(endDate), endMask);

	return `${formattedStartDate} – ${formattedEndDate}`;
};

// Generate Team Number for sorting
const calculateTeamNumber = (anchor: string) =>
	anchor.includes('pilot')
		? 8.5
		: parseInt(anchor.split('-').pop() as string, 10);

const graphQLEndpoint =
	'https://api-us-east-1.hygraph.com/v2/ckfwosu634r7l01xpco7z3hvq/master';

async function getData() {
	return request<GQLResponse>(graphQLEndpoint, CollabiesAndTeamsQuery)
		.then((response) => {
			const collabies = response.collabies.map((c) => {
				// Flatten the bio prop to just the `html` string
				c.bio = (c.bio as Bio)?.html;
				// Flatten the role objects to just their `name` string
				c.roles = c.roles.map((r) => (r as Role).name);
				return c as CollabieData;
			});

			const mentors = collabies.filter((collabie) => {
				let keep = false;
				for (const role of collabie.roles) {
					if (role === 'Founder') return false;
					if (role === 'Mentor') {
						keep = true;
					}
				}
				return keep;
			});

			const volunteers = collabies.filter((c) => {
				return !c.roles.includes('Founder');
			});

			const teams = response.teams.map((team) => ({
				...team,
				calculatedDate: calculatedDate({
					startDate: team.startDate,
					endDate: team.endDate,
				}),
				teamNumber: calculateTeamNumber(team.anchor),
			}));

			return {
				mentors,
				teams,
				volunteers,
			};
		})
		.catch((error) => {
			console.error(error);
			return {
				mentors: [],
				teams: [],
				volunteers: [],
			};
		});
}

export const { mentors, teams, volunteers } = await getData();
