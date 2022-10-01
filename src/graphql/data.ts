import { GraphQLClient } from 'graphql-request';
import { format, parseISO } from 'date-fns';

import { CollabiesAndTeamsQuery, TechTalksQuery } from './queries';
import type {
	Bio,
	CollabieData,
	CollabiesAndTeamsResponse,
	Role,
	TechTalkResponse,
} from './types';

const EMPTY_ARRAY = [] as const;

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

const client = new GraphQLClient(
	'https://api-us-east-1.hygraph.com/v2/ckfwosu634r7l01xpco7z3hvq/master',
);

async function getData() {
	try {
		const [collabiesResponse, techTalkResponse] = await Promise.all([
			client.request<CollabiesAndTeamsResponse>(CollabiesAndTeamsQuery),
			client.request<TechTalkResponse>(TechTalksQuery),
		]);

		const collabies = collabiesResponse.collabies.map((c) => {
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

		const teams = collabiesResponse.teams.map((team) => {
			team.calculatedDate = calculatedDate({
				startDate: team.startDate,
				endDate: team.endDate,
			});
			team.teamNumber = calculateTeamNumber(team.anchor);
			return team;
		});

		const techTalks = techTalkResponse.techTalks.map((talk) => {
			const rgx = /(v=([\w-]+))|(be\/([\w-]+))/; // there's probably room for improvement here
			talk.formattedDate = format(parseISO(talk.dateAndTime), 'd MMM y');
			talk.youTubeEmbedUrl = null;
			if (talk.youTubeUrl) {
				// source = https://www.youtube.com/watch?v=3mci0a8AWnI
				// source = https://youtu.be/FU7v7JI5-pg
				// target = https://www.youtube.com/embed/3mci0a8AWnI
				const matches = talk.youTubeUrl.match(rgx) || EMPTY_ARRAY;
				// depending on the format of the input URL, the slug will be
				// at either position 2 or position 4 of the `matches` array
				const id = matches[2] || matches[4];
				talk.youTubeEmbedUrl = id && `https://www.youtube.com/embed/${id}`;
			}
			return talk;
		});

		return {
			mentors,
			teams,
			techTalks,
			volunteers,
		};
	} catch (err) {
		console.error('Error fetching GraphQL data', err);

		return {
			mentors: EMPTY_ARRAY,
			teams: EMPTY_ARRAY,
			techTalks: EMPTY_ARRAY,
			volunteers: EMPTY_ARRAY,
		};
	}
}

export const { mentors, teams, techTalks, volunteers } = await getData();
