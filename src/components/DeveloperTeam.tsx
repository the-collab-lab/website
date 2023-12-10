import type { DeveloperTeam as DeveloperTeamT } from '~data';
import {
	PROJECT_SITE_NAMES,
	SOCIAL_SITE_NAMES,
	getRandomGenericAvatarPath,
} from '~utils';
import type { Project as ProjectT } from '~data';

function renderSocialsList(volunteer: DeveloperTeamT['developers'][number]) {
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
		<ul className="project__links" style={{ display: 'flex', gap: '10px' }}>
			{socialItems}
		</ul>
	);
}

function renderProjectSiteAndRepo(project: ProjectT) {
	const projectLinks = PROJECT_SITE_NAMES.map((site) => {
		const siteUrl = project && project[`${site}Url` as const];

		if (!siteUrl || siteUrl.length === 0) return null;
		const formattedSiteName = site.charAt(0).toUpperCase() + site.slice(1);
		return (
			<li className="project__social-item">
				<a href={siteUrl}>
					<img
						src={`/img/icons/${site.toLowerCase()}.svg`}
						alt={`${project.title}'s ${formattedSiteName}`}
						height="24"
						width="24"
					/>
				</a>
			</li>
		);
	});

	return (
		<ul className="project__links" style={{ display: 'flex', gap: '10px' }}>
			{projectLinks}
		</ul>
	);
}

export function DeveloperTeam({ team }: { team: DeveloperTeamT }) {
	return (
		<div
			class="c-developer-team"
			style={{
				color: 'var(--color-black-light)',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<h3 id={team.anchor}>
				{team.displayName} | {team.calculatedDate}
			</h3>
			<ul
				class="member-gallery"
				style={{
					display: 'grid',
					gap: '1em',
					gridTemplateColumns: `repeat(
						auto-fit,
						minmax(min(200px, 100%), 1fr)
					)`,
				}}
			>
				{team.project && (
					<li class="project-container">
						<a href={team.project.projectUrl}>
							<img
								alt={team.project.title}
								height="240"
								loading="lazy"
								src={team.project.previewImage.url}
								width="240"
							/>
						</a>
						<div class="member-caption">
							<p>{team.project.title}</p>
							{renderProjectSiteAndRepo(team.project)}
						</div>
					</li>
				)}
				{team.developers.map((developer) => (
					<li class="member-container">
						<img
							alt={developer.fullName}
							className="team-member-photo"
							loading="lazy"
							height="240"
							src={developer.pathToPhoto || getRandomGenericAvatarPath()}
							width="240"
						/>
						<div class="member-caption">
							<p>{developer.firstName}</p>
							{renderSocialsList(developer)}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
