import type { FormattedProduct } from '../data/stripe';

export function DonationButtons({
	enabled,
	options,
}: {
	enabled: boolean;
	options: FormattedProduct[];
}) {
	function goToCheckout(option: FormattedProduct) {
		// TODO: replace with real checkout logic.
		alert(`Checking out ${option.name}`);
	}

	return (
		<>
			<div className="donation-options">
				{options.map((option) => (
					<button onClick={() => goToCheckout(option)}>{option.name}</button>
				))}
			</div>
			{enabled && <script src="https://js.stripe.com/v3"></script>}
		</>
	);
}
