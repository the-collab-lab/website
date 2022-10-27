import { request } from 'graphql-request';

import { ComposedQuery } from './graphql-queries';
import type { Block, ComposedQueryResponse, Page } from './graphql-types';

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

const hygraphResponse = await request<ComposedQueryResponse>(
	'https://api-us-east-1.hygraph.com/v2/ckfwosu634r7l01xpco7z3hvq/master',
	ComposedQuery,
);

const getApplicationBlockData = () =>
	hygraphResponse.applicationBlock.textContent?.html;

const getCollabiesData = () => {
	const collabies = hygraphResponse.collabies.map((c) => {
		return {
			...c,
			bio: c.bio?.html,
			roles: c.roles.map((r) => r.name),
		};
	});

	const founders = [];
	const mentors = [];
	const volunteers = [];

	for (const collabie of collabies) {
		if (collabie.roles.includes('Founder')) {
			founders.push(collabie);
		} else {
			volunteers.push(collabie);
		}

		let isMentor = false;
		for (const role of collabie.roles) {
			if (role === 'Founder') break;
			if (role === 'Mentor') {
				isMentor = true;
			}
		}
		if (isMentor) {
			mentors.push(collabie);
		}
	}

	return {
		founders,
		mentors,
		volunteers,
	};
};

const getPageDataBySlug = () => {
	// return hygraphResponse.pages.map((page) => {
	// 	return {
	// 		html: getPageHTML(page.blocks),
	// 		slug: page.slug,
	// 	};
	// });

	const map: Record<string, string> = {};

	for (const page of hygraphResponse.pages) {
		map[page.slug] = renderPageBlockToHTML(page.blocks);
	}

	return map as Record<Page['slug'], string>;
};

/**
 * Blocks allow us to build up arbitrary pages composed of other entities.
 * This function takes a `blocks` array from a `Pages` query and assembles
 * the HTML to be rendered.
 *
 * The default type is `TextBlock`. Adding new types would entail creatiing
 * a content model in GraphCMS then adding a `case` statement to this
 * function to handle rendering of that type.
 */
const renderPageBlockToHTML = (blocks: Block[]) => {
	let html = '';
	blocks.forEach((block) => {
		switch (block.__typename) {
			case 'ImageFloatedRight':
				html += /* html */ `
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

	return html;
};

function getTeams() {
	return hygraphResponse.teams.map((team) => {
		return {
			...team,
			calculatedDate: calculatedDate({
				startDate: team.startDate,
				endDate: team.endDate,
			}),
			teamNumber: calculateTeamNumber(team.anchor),
		};
	});
}

function getTechTalksData() {
	return hygraphResponse.techTalks.map((talk) => {
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

export interface TestimonialFlat {
	fullName: string;
	pathToPhoto: string;
	testimony: string;
}

function getTestimonials(): TestimonialFlat[] {
	return hygraphResponse.testimonials.map((testimonial) => {
		return {
			fullName: testimonial.collabie.fullName,
			pathToPhoto: testimonial.collabie.pathToPhoto,
			testimony: testimonial.body.html,
		};
	});
}

export const applicationBlock = getApplicationBlockData();
export const { founders, mentors, volunteers } = getCollabiesData();
export const pages = getPageDataBySlug();
export const teams = getTeams();
export const techTalks = getTechTalksData();
export const testimonials = getTestimonials();

export type Collabie =
	| typeof founders[0]
	| typeof mentors[0]
	| typeof volunteers[0];

export type DeveloperTeam = typeof teams[0];
