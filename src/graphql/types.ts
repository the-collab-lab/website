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

export interface GQLResponse {
	collabies: Collabie<Bio | string, Role | CollabieRoles>[];
}

export type CollabieData = Collabie<string, CollabieRoles>;
