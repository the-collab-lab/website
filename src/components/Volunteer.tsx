import type { Collabie, CollabieRoles } from '~data';
import {
	SOCIAL_SITE_NAMES,
	getRandomGenericAvatarPath,
	fixAssetPath,
} from '~utils';

const englishCollator = new Intl.Collator('en', { sensitivity: 'base' });

export interface VolunteerProps {
	volunteer: Collabie;
}

export function Volunteer({ volunteer }: VolunteerProps) {
	const { fullName, pathToPhoto, roles } = volunteer;
	return (
		<div className="volunteer__grid-item">
			<figure
				className="volunteer"
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<img
					alt=""
					className="volunteer__photo"
					loading="lazy"
					height="300"
					src={fixAssetPath(pathToPhoto) || getRandomGenericAvatarPath()}
				/>
				<figcaption className="l-stack" style={{ marginBlock: '1.6em' }}>
					<span style={{ fontSize: '1.6em', fontWeight: '600' }}>
						{fullName}
					</span>
					{renderRolesList(roles)}
					<hr style={{ width: '100%' }} />
					{renderSocialsList(volunteer)}
				</figcaption>
			</figure>
		</div>
	);
}

function renderRolesList(roles: CollabieRoles[]) {
	return (
		<ul
			className="volunteer__roles"
			style={{
				alignItems: 'flex-start',
				display: 'flex',
				flexWrap: 'wrap',
				gap: '20px',
			}}
		>
			{roles.sort(englishCollator.compare).map((role) => (
				<li
					className="volunteer__roles-item"
					style={{
						padding: '0.4em',
						whiteSpace: 'nowrap',
						...getBadgeColors(role),
					}}
				>
					{role}
				</li>
			))}
		</ul>
	);
}

function getBadgeColors(role: CollabieRoles) {
	switch (role) {
		case 'Advisor':
			return {
				backgroundColor: '#563d7c',
				color: '#fff',
			};
		case 'Automation Hero':
			return {
				backgroundColor: '#f1e05a',
				color: '#000',
			};
		case 'Board Member':
			return {
				backgroundColor: '#0e8a16',
				color: '#fff',
			};
		case 'Career Coach':
			return {
				backgroundColor: '#0a6cff',
				color: '#fff',
			};
		case 'Code of Conduct Responder':
			return {
				backgroundColor: '#0e8a16',
				color: '#fff',
			};
		case 'Community Manager':
			return {
				backgroundColor: '#ff94e8',
				color: '#000',
			};
		case 'Mentor':
			return {
				backgroundColor: '#fbca04',
				color: '#000',
			};
		case 'Tech Talk Presenter':
			return {
				backgroundColor: '#0a6cff',
				color: '#fff',
			};
		case 'Volunteer':
			return {
				backgroundColor: '#e34c26',
				color: '#fff',
			};
	}
}

function renderSocialsList(volunteer: Collabie) {
	const socialItems = SOCIAL_SITE_NAMES.map((site) => {
		const siteUrl = volunteer[`${site}Url` as const];

		if (!siteUrl || siteUrl.length === 0) return null;
		const formattedSiteName = site.charAt(0).toUpperCase() + site.slice(1);
		return (
			<li className="volunteer__social-item">
				<a href={siteUrl}>
					<img
						src={`/img/icons/${site.toLowerCase()}.svg`}
						alt={`${volunteer.firstName}'s ${formattedSiteName}`}
						height="24"
						width="24"
					/>
				</a>
			</li>
		);
	});
	return (
		<ul className="volunteer__socials" style={{ display: 'flex', gap: '10px' }}>
			{socialItems}
		</ul>
	);
}
