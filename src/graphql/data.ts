import { GraphQLClient } from 'graphql-request';

import {
	ApplicationBlockQuery,
	CollabiesAndTeamsQuery,
	PagesQuery,
	TechTalksQuery,
	TestimonialsQuery,
} from './queries';
import type {
	ApplicationBlockResponse,
	Bio,
	Block,
	CollabieData,
	CollabiesAndTeamsResponse,
	PagesResponse,
	Role,
	TechTalkResponse,
	TestimonialsResponse,
} from './types';

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

const [
	applicationBlockResponse,
	collabiesResponse,
	pagesResponse,
	techTalkResponse,
	testimonialsResponse,
] = await Promise.all([
	client.request<ApplicationBlockResponse>(ApplicationBlockQuery),
	client.request<CollabiesAndTeamsResponse>(CollabiesAndTeamsQuery),
	client.request<PagesResponse>(PagesQuery),
	client.request<TechTalkResponse>(TechTalksQuery),
	client.request<TestimonialsResponse>(TestimonialsQuery),
]);

const getApplicationBlockData = () =>
	applicationBlockResponse.textBlocks[0].textContent.html;

const getCollabiesData = () => {
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

	return {
		mentors,
		volunteers,
		teams,
	};
};

const getPagesData = () => {
	return pagesResponse.pages.map((page) => {
		return {
			html: getPageHTML(page.blocks),
			slug: page.slug,
		};
	});
};

function getTechTalksData() {
	return techTalkResponse.techTalks.map((talk) => {
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
}

export interface Testimonial {
	fullName: string;
	pathToPhoto: string;
	testimony: string;
}

function getTestimonials(): Testimonial[] {
	return testimonialsResponse.testimonials.map((t) => {
		return {
			fullName: t.collabie.fullName,
			pathToPhoto: t.collabie.pathToPhoto,
			testimony: t.body.html,
		};
	});
}

/**
 * Blocks allow us to build up arbitrary pages composed of other entities.
 * This function takes a `blocks` array from a `Pages` query and assembles
 * the HTML to be rendered.
 *
 * The default type is `TextBlock`. Adding new types would entail creatiing
 * a content model in GraphCMS then adding a `case` statement to this
 * function to handle rendering of that type.
 */
const getPageHTML = (blocks: Block[]) => {
	let html = '';
	if (Array.isArray(blocks)) {
		blocks.forEach((block) => {
			switch (block.__typename) {
				case 'ImageFloatedRight':
					html += `
						<figure class="float-right image-floated-right">
							<img
								src="${block.path}"
								alt="${block.caption}"
							/>
							<figcaption>${block.caption}</figcaption>
						</figure>
						`;
					break;
				default:
					html += block.visible ? block.textContent?.html : '';
					break;
			}
		});
	}
	return html;
};

export const applicationBlock = getApplicationBlockData();
export const { mentors, volunteers, teams } = getCollabiesData();
export const pages = getPagesData();
export const techTalks = getTechTalksData();
export const testimonials = getTestimonials();
