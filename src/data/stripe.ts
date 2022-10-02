import Stripe from 'stripe';
const { STRIPE_PK, STRIPE_SK } = import.meta.env;

interface FormattedPrice extends Stripe.Price {
	unit_amount: number;
}

export interface FormattedProduct extends Stripe.Product {
	default_price: FormattedPrice;
	price: {
		id: string;
		formatted_amount: string;
	};
}

export const getDonationOptions = async () => {
	try {
		const stripe = new Stripe(STRIPE_SK, {
			apiVersion: '2022-08-01',
		});
		const { data: products = [] } = await stripe.products.list({
			expand: ['data.default_price'],
		});

		const _options = products.map((option) => {
			const default_price = option.default_price as FormattedPrice;
			(option as unknown as FormattedProduct).price = {
				id: default_price?.id,
				formatted_amount: String(default_price.unit_amount / 100),
			};

			return option as unknown as FormattedProduct;
		});

		const options = _options.sort(
			(a, b) => a.default_price.unit_amount - b.default_price.unit_amount,
		);

		return {
			enabled: options?.length > 0 && STRIPE_PK !== undefined,
			options,
		};
	} catch (err) {
		return {
			enabled: false,
			options: [
				{
					price: {
						id: 'donation-option-000',
						formatted_amount: '5',
					},
					name: 'Yaaaay',
				},
				{
					price: {
						id: 'donation-option-001',
						formatted_amount: '10',
					},
					name: 'Booster',
				},
				{
					price: {
						id: 'donation-option-002',
						formatted_amount: '15',
						name: 'Amplifier',
					},
				},
			] as FormattedProduct[],
		};
	}
};
