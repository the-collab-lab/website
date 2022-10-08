import type { Collabie, CollabieRoles } from '~data';
import {
	AVATAR_PLACEHOLDER_PATH,
	SOCIAL_SITE_NAMES,
	fixAssetPath,
} from '~utils';

export interface VolunteerProps {
	volunteer: Collabie;
}

export function Volunteer({ volunteer }: VolunteerProps) {
	const { fullName, pathToPhoto, roles } = volunteer;
	return (
		<div className="volunteer__grid-item">
			<figure className="volunteer">
				<img
					alt=""
					className="volunteer__photo"
					loading="lazy"
					height="300"
					src={fixAssetPath(pathToPhoto) || AVATAR_PLACEHOLDER_PATH}
					width="300"
				/>
				<figcaption>
					<b>{fullName}</b>
					{renderRolesList(roles)}
					{renderSocialsList(volunteer)}
				</figcaption>
			</figure>
		</div>
	);
}

function renderRolesList(roles: CollabieRoles[]) {
	return (
		<ul className="volunteer__roles">
			{roles.map((role) => (
				<li className="volunteer__roles-item">{role}</li>
			))}
		</ul>
	);
}

function renderSocialsList(volunteer: Collabie) {
	const socialItems = SOCIAL_SITE_NAMES.map((site) => {
		const siteUrl = volunteer[`${site}Url` as const];

		if (!siteUrl || siteUrl.length === 0) return null;
		const formattedSiteName = site.charAt(0).toUpperCase() + site.slice(1);
		return (
			<li className="volunteer__social-item">
				<a href={siteUrl}>
					Connect with {volunteer.firstName} on {formattedSiteName}!
				</a>
			</li>
		);
	});
	return <ul className="volunteer__socials">{socialItems}</ul>;
}
