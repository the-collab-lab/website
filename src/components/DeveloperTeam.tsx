import type { DeveloperTeam as DeveloperTeamT } from '@graphql';

const avatarPlaceholderPath = '/img/members/generic-avatar.png';
const socials = ['gitHub', 'linkedIn', 'twitter'] as const;

function correctPhotoPath(path: string) {
	return path.replace(/^\/assets/, '');
}

function renderSocials(developer: DeveloperTeamT['developers'][number]) {
	return socials.map((site) => {
		const siteUrl = developer[`${site}Url` as const];

		if (!siteUrl) return null;

		return (
			<a href={siteUrl} className="social-media-logo">
				<img
					alt={site}
					height="20"
					loading="lazy"
					src={`/img/icons/${site.toLowerCase()}.png`}
					width="20"
				/>
			</a>
		);
	});
}

export function DeveloperTeam({ team }: { team: DeveloperTeamT }) {
	return (
		<>
			<h3 id={team.anchor}>
				{team.displayName} | {team.calculatedDate}
			</h3>
			<ul class="member-gallery">
				{team.developers.map((developer) => (
					<li class="member-container">
						<img
							alt={developer.fullName}
							className="team-member-photo"
							loading="lazy"
							height="200"
							src={correctPhotoPath(developer.pathToPhoto)}
							width="200"
						/>
						<div class="member-caption">
							<p>{developer.firstName}</p>
							{renderSocials(developer)}
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
