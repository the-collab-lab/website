import type { FormattedProduct } from '../data/stripe';

export function DonationButtons({
	enabled,
	options,
}: {
	enabled: boolean;
	options: FormattedProduct[];
}) {
	return (
		<>
			<div className="donation-options">
				{options.map((option) => (
					<button>{option.name}</button>
				))}
			</div>
			{enabled && <script src="https://js.stripe.com/v3"></script>}
		</>
	);
}
