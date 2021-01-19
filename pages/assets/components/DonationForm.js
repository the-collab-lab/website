/**
 * Handles the DonationForm and Donation options, including a basic error handling
 */
class DonationForm {
  constructor({ stripe, checkoutButtons }) {
    this.stripe = stripe;
    this.checkoutButtons = checkoutButtons;

    this.loaded();
  }

  loaded() {
    Array.from(this.checkoutButtons).forEach((checkoutButton) => {
      // on click, send the user to Stripe Checkout to process the donation
      checkoutButton.addEventListener('click', () => {
        const price = checkoutButton.dataset['stripePriceId'];

        checkoutButton.classList.add('loading');
        checkoutButton.disabled = true;

        this.stripe
          .redirectToCheckout({
            lineItems: [{ price, quantity: 1 }],
            mode: 'payment',
            successUrl: `${window.location.origin}/about-us?donation=success`,
            cancelUrl: window.location.origin,
          })
          .then(function (result) {
            checkoutButton.classList.remove('loading');
            checkoutButton.disabled = false;

            if (result.error) {
              new Toast({
                element: document.getElementById('toast'),
                type: 'error',
                message: result.error.message,
              }).show();
            }
          });
      });
    });
  }
}
