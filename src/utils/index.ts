export const AVATAR_PLACEHOLDER_PATH = '/img/members/generic-avatar.png';

export const SOCIAL_SITE_NAMES = ['gitHub', 'linkedIn', 'twitter'] as const;

/**
 * Fix the path to a static asset.
 * Our CMS thinks assets are in an `assets` directory,
 * but that folder doesn't exist in this project structure.
 */
export function fixAssetPath(path: string | null) {
	return path?.replace(/^\/assets/, '');
}
