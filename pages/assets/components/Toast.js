/**
 *
 * Toast component to display notifications/alerts to users
 *
 * It expects a dom element and a message.
 * It additionally supports the following options props:
 * - type: 'success', 'error' and 'info' that will style the messages accordingly. Default to 'info'.
 * - autoHide: Defines whether or not the Toast should hide automatically. Default to 'true'.
 * - hideTimeout: Defines how long the Toast stay on the page before being hidden. Default to 5000 ms.
 */
class Toast {
  constructor({
    element,
    message,
    type = 'info',
    autoHide = true,
    hideTimeout = 5000,
  }) {
    if (!element || !message) {
      console.error('Toast requires an element and message to work properly');
    }

    this.element = element;
    this.type = type;
    this.message = message;
    this.autoHide = autoHide;
    this.hideTimeout = hideTimeout;

    this.loaded();
  }

  loaded() {
    this.element.className = '';
    this.element.classList.add('toast', 'hidden', this.type);
    this.element.textContent = this.message;
  }

  /**
   * Displays the toast
   */
  show() {
    if (this.element && this.message) {
      this.element.classList.remove('hidden');

      if (this.autoHide) {
        setTimeout(() => {
          this.hide();
        }, this.hideTimeout);
      }
    }
  }

  /**
   * Hides the toast
   */
  hide() {
    if (this.element && this.message) {
      this.element.classList.add('hidden');
    }
  }
}
