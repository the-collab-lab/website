import type { CollabieData } from '@graphql';

export interface VolunteerProps {
	collabie: CollabieData;
}

const socialSiteNames = ['gitHub', 'linkedIn', 'twitter'] as const;

export function Volunteer({ collabie }: VolunteerProps) {
	const { fullName, roles } = collabie;
	return (
		<>
			<h2>{fullName}</h2>
			<ul class="volunteer__roles">
				{roles.map((role) => (
					<li class="volunteer__roles-item">{role}</li>
				))}
			</ul>
			<ul>{renderSocials(collabie)}</ul>
		</>
	);
}

function renderSocials(collabie: CollabieData) {
	const ret = [];
	for (const site of socialSiteNames) {
		const siteUrl = collabie[`${site}Url` as const];

		if (siteUrl && siteUrl.length > 0) {
			const formattedSiteName =
				site.charAt(0).toUpperCase() + site.substring(1);
			ret.push(
				<li>
					<a href={siteUrl}>
						Connect with {collabie.firstName} on {formattedSiteName}!
					</a>
				</li>
			);
		}
	}
	return ret;
}
