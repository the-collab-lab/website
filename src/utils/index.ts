export const SOCIAL_SITE_NAMES = ['gitHub', 'linkedIn', 'twitter'] as const;

export const DateFormatters = {
	dayMonth: new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		timeZone: 'UTC',
	}).format,
	monthYear: new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
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
