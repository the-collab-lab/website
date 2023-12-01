import type { Project as ProjectT } from '~data';
import { PROJECT_SITE_NAMES, getRandomGenericAvatarPath } from '~utils';

function renderProjectSiteAndRepo(project: ProjectT) {
	const socialItems = PROJECT_SITE_NAMES.map((site) => {
		const siteUrl = project[`${site}Url` as const];

		if (!siteUrl || siteUrl.length === 0) return null;
		const formattedSiteName = site.charAt(0).toUpperCase() + site.slice(1);
		return (
			<li className="project__social-item">
				<a href={siteUrl}>
					<img
						src={`/img/icons/${site.toLowerCase()}.svg`}
						alt={`${project.team.displayName}'s ${formattedSiteName}`}
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

export function ProjectGallery({ project }: { project: ProjectT }) {
	return (
		<div
			class="c-project-gallery"
			style={{
				color: 'var(--color-black-light)',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<h3 id={project.team.anchor}>
				{project.team.displayName} | {project.team.calculatedDate}
			</h3>
			<ul
				class="project-gallery"
				style={{
					display: 'grid',
					gap: '1em',
					gridTemplateColumns: `repeat(
						auto-fit,
						minmax(min(200px, 100%), 1fr)
					)`,
				}}
			>
				<li class="project-container">
					<img
						alt={project.title}
						className="project-preview-photo"
						loading="lazy"
						height="240"
						src={project.previewImage?.url || getRandomGenericAvatarPath()}
						width="240"
					/>
					<div class="project-links">{renderProjectSiteAndRepo(project)}</div>
				</li>
			</ul>
		</div>
	);
}
