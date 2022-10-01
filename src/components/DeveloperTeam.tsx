const avatarPlaceholderPath = '/img/members/generic-avatar.png';
const socials = ['gitHub', 'linkedIn', 'twitter'] as const;

function correctPhotoPath(path: string) {
	return path.replace(/^\/assets/, '');
}

export default function DeveloperTeam({
	team,
}: {
	team: {
		anchor: string;
		calculatedDate: string;
		developers: {
			fullName: string;
			firstName: string;
			pathToPhoto: string;
			gitHubUrl: string;
			linkedInUrl: string;
			twitterUrl: string;
		}[];
		displayName: string;
	};
}) {
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
							height="200"
							src={correctPhotoPath(developer.pathToPhoto)}
							width="200"
						/>
						<p>{developer.firstName}</p>
						{socials.map((site) => {
							const siteUrl = developer[`${site}Url` as const];

							if (!siteUrl) return null;

							return (
								<a href={siteUrl}>
									<img
										alt={site}
										height="20"
										src={`/img/icons/${site.toLowerCase()}.png`}
										width="20"
									/>
								</a>
							);
						})}
					</li>
				))}
			</ul>
		</>
	);
}
