import type { CollabieData, CollabieRoles } from '@graphql';

export interface VolunteerProps {
	collabie: CollabieData;
}

const socialSiteNames = ['gitHub', 'linkedIn', 'twitter'] as const;

function correctPhotoPath(path: string | null) {
	return path?.replace(/^\/assets/, '');
}

const avatarPlaceholderPath = '/img/members/generic-avatar.png';

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
					src={correctPhotoPath(pathToPhoto) || avatarPlaceholderPath}
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

function renderSocialsList(collabie: CollabieData) {
	const socialItems = socialSiteNames.map((site) => {
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
