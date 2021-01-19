/*

Carousel behavior:

1. Detect that all photos have loaded, then add 'ready' class to all photos that don't already have it
2. Every 1 second, cross-fade to a new photo (i.e. add 'selected' class to the next photo and remove it from the current photo)

*/

class Gallery {
  // `interval` is the time between slides in ms
  constructor(interval = 2000) {
    this.imgs = document.querySelectorAll('.carousel-image');
    this.credits = document.querySelectorAll('.carousel-photo-credit');
    this.interval = interval;
    this.timeout = undefined;
    this.idx = 0; // array index of the selected photo

    // bail out if we don’t have at least 2 images
    if (this.imgs.length < 2) {
      console.log('Fewer than 2 images — was that intentional?');
      return;
    }

    // only enable photo credits if the number of images and number of credits match
    this.enableCredits = this.imgs.length === this.credits.length;

    // start the show once all images have loaded
    this.loaded();
  }

  loaded() {
    let promises = [];

    // for each image, create a `Promise` that resolves when the image is done loading
    for (let i = 0; i < this.imgs.length; i += 1) {
      promises.push(
        new Promise((resolve, reject) => {
          this.imgs[i].addEventListener('load', resolve);
          // the `load` event will only fire after we set the `src`, so we just set it back
          // to its original value to trick the `Promise` into resolving
          this.imgs[i].src = this.imgs[i].src;
        }),
      );
    }

    // when all of the `Promises` have resolved, add the 'ready' class to all images and
    // start the slideshow
    Promise.all(promises).then(() => {
      for (let i = 0; i < this.imgs.length; i += 1) {
        this.imgs[i].classList.add('ready');
      }
      this.start();
    });
  }

  start() {
    // start the photo and photo credit on the first one
    this.transition();

    // start rotating through (i.e. call `next` on an interval)
    this.next();
  }

  stop() {
    // stop rotating through (i.e. clear the interval)
    clearTimeout(this.timeout);
  }

  next() {
    this.timeout = setTimeout(() => {
      // increment index
      this.idx += 1;

      // check index bounds
      if (this.idx >= this.imgs.length) {
        this.idx = 0;
      }

      // transition photos and photo credits
      this.transition();

      // initiate next photo transition
      this.next();
    }, this.interval);
  }

  transition() {
    // remove 'selected' class from all images
    this.remove(this.imgs);

    // add 'selected' class to the next image
    this.add(this.imgs[this.idx]);

    // if photo credits are enabled…
    if (this.enableCredits) {
      // remove 'selected' class from all photo credits
      this.remove(this.credits);

      // add 'selected' class to the next photo credit
      this.add(this.credits[this.idx]);
    }
  }

  remove(nodes) {
    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].classList.remove('selected');
    }
  }

  add(node) {
    node.classList.add('selected');
  }
}
