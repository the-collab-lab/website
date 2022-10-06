import type { DonationOption } from '../data/stripe';

export function DonationLink({ option }: { option: DonationOption }) {
	return (
		<a href={option.url} className="donation-button">
			{option.name}
		</a>
	);
}
