export const SOCIAL_SITE_NAMES = ['gitHub', 'linkedIn', 'twitter'] as const;

export const DateFormatters = {
	dayMonth: new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		timeZone: 'UTC',
	}).format,
	fullDateShortMonth: new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'short',
		timeZone: 'UTC',
		year: 'numeric',
	}).format,
	fullDateLongMonth: new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		timeZone: 'UTC',
		year: 'numeric',
	}).format,
};

export function addDays(date: Date, days: number) {
	const nextDate = new Date(date);
	nextDate.setUTCDate(nextDate.getUTCDate() + days);
	return nextDate;
}

/**
 * Fix the path to a static asset.
 */
export function fixAssetPath(path?: string) {
	// Our CMS expects an /assets/ folder in the path, but
	// it doesn't exist in this project structure.
	// TODO: Delete this once the path is fixed in Hygraph.
	return path?.replace(/^\/assets/, '');
}

export function getRandomGenericAvatarPath() {
	const randomIndex = Math.floor(Math.random() * 4);

	// Some Collabies have the generic avatar hard-coded in their
	// CMS data. This expected file path doesn't have a number suffix,
	// so we need to get rid of it here.
	// TODO: Delete this once references to the generic avatar are
	// removed from Hygraph.
	const fileName = `generic-avatar${
		randomIndex === 0 ? '' : '-' + randomIndex
	}.png`;
	return `/img/members/${fileName}`;
}
