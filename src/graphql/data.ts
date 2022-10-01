import { request } from 'graphql-request';
import { format, parseISO } from 'date-fns';

import { TeamsQuery, VolunteerQuery } from './queries';
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

let _mentors: CollabieData[] = [];
let _teams = [];
let _volunteers: CollabieData[] = [];
try {
	const response = await request<GQLResponse>(graphQLEndpoint, VolunteerQuery);
	const collabies = response.collabies.map((c) => {
		// Flatten the bio prop to just the `html` string
		c.bio = (c.bio as Bio)?.html;
		// Flatten the role objects to just their `name` string
		c.roles = c.roles.map((r) => (r as Role).name);
		return c as CollabieData;
	});

	_mentors = collabies.filter((collabie) => {
		let keep = false;
		for (const role of collabie.roles) {
			if (role === 'Founder') return false;
			if (role === 'Mentor') {
				keep = true;
			}
		}
		return keep;
	});

	_volunteers = collabies.filter((c) => {
		return !c.roles.includes('Founder');
	});
} catch (error) {
	console.log('Error fetching mentor and volunteer data');
}

try {
	const { teams } = await request(graphQLEndpoint, TeamsQuery);
	_teams = teams.map(
		(team: { startDate: string; endDate: string; anchor: string }) => ({
			...team,
			calculatedDate: calculatedDate({
				startDate: team.startDate,
				endDate: team.endDate,
			}),
			teamNumber: calculateTeamNumber(team.anchor),
		}),
	);
} catch (error) {
	console.log('Error fetching teams data.');
}

export const mentors = _mentors;
export const teams = _teams;
export const volunteers = _volunteers;
