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

export interface GQLResponse {
	collabies: Collabie<Bio | string, Role | CollabieRoles>[];
	teams: DeveloperTeam[];
}
