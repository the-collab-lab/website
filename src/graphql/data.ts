import { request } from 'graphql-request';

import { VolunteerQuery } from './queries';
import type { Bio, CollabieData, GQLResponse, Role } from './types';

const graphQLEndpoint =
	'https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master';

let _mentors: CollabieData[] = [];
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
	console.log('Error fetching data');
}

export const mentors = _mentors;
export const volunteers = _volunteers;
