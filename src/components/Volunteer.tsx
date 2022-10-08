import type { Collabie, CollabieRoles } from '~data';
import {
	AVATAR_PLACEHOLDER_PATH,
	SOCIAL_SITE_NAMES,
	fixAssetPath,
} from '~utils';

export interface VolunteerProps {
	collabie: Collabie;
}

export function Volunteer({ collabie }: VolunteerProps) {
	const { fullName, pathToPhoto, roles } = collabie;
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
					{renderSocialsList(collabie)}
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

function renderSocialsList(collabie: Collabie) {
	const socialItems = SOCIAL_SITE_NAMES.map((site) => {
		const siteUrl = collabie[`${site}Url` as const];

		if (!siteUrl || siteUrl.length === 0) return null;
		const formattedSiteName = site.charAt(0).toUpperCase() + site.slice(1);
		return (
			<li className="volunteer__social-item">
				<a href={siteUrl}>
					Connect with {collabie.firstName} on {formattedSiteName}!
				</a>
			</li>
		);
	});
	return <ul className="volunteer__socials">{socialItems}</ul>;
}
