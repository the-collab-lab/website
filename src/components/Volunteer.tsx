import type { CollabieData } from '@graphql';

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
		<div class="volunteer__grid-item">
			<figure className="volunteer">
				<img
					alt=""
					class="volunteer__photo"
					loading="lazy"
					height="300"
					src={correctPhotoPath(pathToPhoto) || avatarPlaceholderPath}
					width="300"
				/>
			</figure>
			<b>{fullName}</b>
			<ul class="volunteer__roles">
				{roles.map((role) => (
					<li class="volunteer__roles-item">{role}</li>
				))}
			</ul>
			<ul className="volunteer__socials">{renderSocials(collabie)}</ul>
		</div>
	);
}

function renderSocials(collabie: CollabieData) {
	return socialSiteNames.map((site) => {
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
}
