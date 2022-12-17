export type CollabieRoles =
	| 'Advisor'
	| 'Automation Hero'
	| 'Board Member'
	| 'Career Coach'
	| 'Code of Conduct Responder'
	| 'Community Manager'
	| 'Founder'
	| 'Volunteer'
	| 'Mentor';

interface Collabie {
	bio?: {
		html: string;
	};
	gitHubUrl?: string;
	linkedInUrl?: string;
	twitterUrl?: string;
	firstName: string;
	fullName: string;
	pathToPhoto: string;
	roles: {
		name: CollabieRoles;
	}[];
}

interface DeveloperTeam {
	anchor: string;
	developers: Collabie[];
	displayName: string;
	endDate: string;
	startDate: string;
}

export interface TextBlock {
	__typename: 'TextBlock';
	textContent?: {
		html: string;
	};
	visible: boolean;
}

export interface ImageFloatedRight {
	__typename: 'ImageFloatedRight';
	caption?: string;
	path: string;
}

export type Block = TextBlock | ImageFloatedRight;

export interface Page {
	slug: '/participate/' | '/apply/' | '/mentor/';
	blocks: Array<Block>;
}

export interface TechTalk {
	title: string;
	presenters: Pick<Collabie, 'fullName'>;
	dateAndTime: string;
	description: { html: string };
	formattedDate?: string;
	meetupUrl: string;
	youTubeUrl?: string;
	image: {
		url: string;
		width: number;
		height: number;
	};
	visible: boolean;
	youTubeEmbedUrl?: string | null;
}

export interface Testimonial {
	collabie: Pick<Collabie, 'fullName' | 'pathToPhoto'>;
	body: { html: string };
}

export interface ComposedQueryResponse {
	applicationBlock: TextBlock;
	collabies: Collabie[];
	teams: DeveloperTeam[];
	pages: Page[];
	techTalks: TechTalk[];
	testimonials: Testimonial[];
}
