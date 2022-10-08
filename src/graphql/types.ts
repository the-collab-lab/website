export type CollabieRoles = 'Founder' | 'Volunteer' | 'Mentor';

export interface Bio {
	html: string;
}

export interface Role {
	name: CollabieRoles;
}

export interface Collabie<BioT, RoleT> {
	bio?: BioT;
	gitHubUrl?: string;
	linkedInUrl?: string;
	twitterUrl?: string;
	firstName: string;
	fullName: string;
	pathToPhoto: string;
	roles: RoleT[];
}

export type CollabieData = Collabie<string, CollabieRoles>;

export interface DeveloperTeam {
	anchor: string;
	calculatedDate: string;
	developers: CollabieData[];
	displayName: string;
	endDate: string;
	startDate: string;
	teamNumber: number;
}

export interface CollabiesAndTeamsResponse {
	collabies: Collabie<Bio | string, Role | CollabieRoles>[];
	teams: DeveloperTeam[];
}

export interface ApplicationBlockResponse {
	textBlocks: {
		textContent: {
			html: string;
		};
	}[];
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
	slug: string;
	blocks: Array<Block>;
}

export interface PagesResponse {
	pages: Page[];
}

export interface TechTalk {
	title: string;
	presenters: Pick<CollabieData, 'fullName'>;
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

export interface TechTalkResponse {
	techTalks: TechTalk[];
}

export interface TestimonialsResponse {
	testimonials: {
		collabie: Pick<CollabieData, 'fullName' | 'pathToPhoto'>;
		body: { html: string };
	}[];
}
