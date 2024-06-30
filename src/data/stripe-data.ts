import Stripe from 'stripe';
const { MODE, STRIPE_PK, STRIPE_SK } = import.meta.env;

export interface DonationOption {
	amount: number;
	id: string;
	url: string;
	name: string;
}

/**
 * Get the data for the donation buttons rendered in the global site footer.
 * If we have access to Stripe environment variables, we get data from Stripe;
 * else (if there's a problem in production, or we're a dev who's not
 * using the Netlify CLI), we return some mock data.
 */
async function getDonationOptions(): Promise<{
	enabled: boolean;
	options: DonationOption[];
}> {
	try {
		const stripe = new Stripe(STRIPE_SK, {
			apiVersion: '2022-08-01',
		});

		const { data: paymentLinks = [] } = await stripe.paymentLinks.list({
			active: true,
			expand: ['data.line_items'],
		});

		const _options = new Map();

		for (const link of paymentLinks) {
			const { id, line_items, url } = link;
			const lineItem = line_items?.data[0] || {
				amount_total: 0,
				description: '',
			};
			const { amount_total, description } = lineItem;

			if (!_options.has(description)) {
				_options.set(description, {
					id,
					url,
					amount: amount_total / 100,
					name: description,
				});
			}
		}

		const options = Array.from(_options.values()).sort(
			(a, b) => a.amount - b.amount,
		);

		return {
			options,
			enabled: options?.length > 0 && STRIPE_PK !== undefined,
		};
	} catch (err) {
		const options =
			MODE === 'development'
				? ([
						{
							id: 'mock-0',
							url: '#mock-donation-option-0',
							amount: 5,
							name: 'Supporter',
						},
						{
							id: 'mock-1',
							url: '#mock-donation-option-1',
							amount: 10,
							name: 'Booster',
						},
						{
							id: 'mock-2',
							url: '#mock-donation-option-2',
							amount: 15,
							name: 'Amplifier',
						},
					] as DonationOption[])
				: [];
		return {
			options,
			enabled: false,
		};
	}
}

export const { enabled: donationsEnabled, options: donationOptions } =
	await getDonationOptions();
