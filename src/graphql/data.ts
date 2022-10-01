import { GraphQLClient } from 'graphql-request';

import { CollabiesAndTeamsQuery, TechTalksQuery } from './queries';
import type {
	Bio,
	CollabieData,
	CollabiesAndTeamsResponse,
	Role,
	TechTalkResponse,
} from './types';

const EMPTY_ARRAY = [] as const;

const monthAndYearFormat = new Intl.DateTimeFormat('en-US', {
	month: 'long',
	year: 'numeric',
});
const fullDateShortMonthFormat = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
});

/**
 * Transforms two dates of type 2020-10-10 and 2020-11-11 to
 * October 2020 - November 2020
 *
 * Used in the Teams section.
 */
const calculatedDate = ({ startDate, endDate }: Record<string, string>) => {
	const formattedStartDate = monthAndYearFormat.format(new Date(startDate));
	const formattedEndDate = monthAndYearFormat.format(new Date(endDate));

	// if the months are the same, don’t show the month twice
	// e.g. "October 2020 – November 2020" -> "October – November 2020"
	if (formattedStartDate.slice(-4) === formattedEndDate.slice(-4)) {
		return `${formattedStartDate.slice(-4)} – ${formattedEndDate}`;
	}

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
			talk.formattedDate = fullDateShortMonthFormat.format(
				new Date(talk.dateAndTime),
			);
			talk.youTubeEmbedUrl = null;
			if (talk.youTubeUrl) {
				// source = https://www.youtube.com/watch?v=3mci0a8AWnI
				// source = https://youtu.be/FU7v7JI5-pg
				// target = https://www.youtube.com/embed/3mci0a8AWnI
				const matches = talk.youTubeUrl.match(rgx);
				if (matches) {
					// depending on the format of the input URL, the slug will be
					// at either position 2 or position 4 of the `matches` array
					const id = matches[2] || matches[4];
					talk.youTubeEmbedUrl = `https://www.youtube.com/embed/${id}`;
				}
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
