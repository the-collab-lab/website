export type CollabieRoles =
	| 'Advisor'
	| 'Automation Hero'
	| 'Board Member'
	| 'Career Coach'
	| 'Code of Conduct Responder'
	| 'Community Manager'
	| 'Founder'
	| 'Volunteer'
	| 'Mentor'
	| 'Tech Talk Presenter';

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
	project: Project;
}

export interface Project {
	title: string;
	gitHubUrl: string;
	projectUrl: string;
	previewImage: {
		url: string;
	};
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
	collabies: Collabie[];
	teams: DeveloperTeam[];
	techTalks: TechTalk[];
	testimonials: Testimonial[];
	projects: Project[];
}
