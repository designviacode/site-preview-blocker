export const previewBlocker = {
  removeElement: (element) => {
    if (!element) {
      console.error('DOM-selector not provided for removal');
      return;
    }

    console.log('Removing DOM-element: ', element);
    element?.remove();
  },

  removeElements: (selectorsList) => {
    if (!selectorsList) {
      console.error('selectorsList not provided for removal');
      return;
    }

    if (selectorsList) {
      return selectorsList.forEach((el) => {
        let domEl = document.querySelector(el);
        previewBlocker.removeElement(domEl);
      });
    }
  },

  changeOverflow: (value) => {
    const bodyEl = document.body;
    const bodyComputedStyle = window.getComputedStyle(bodyEl);

    if (!value) {
      bodyEl.style.overflow = bodyComputedStyle.overflow === 'hidden'
        ? 'auto'
        : 'hidden';
    } else {
      bodyEl.style.overflow = value;
    }
  },

  platforms: {
    glassdoor: {
      removeContentContributions: () => {
        document.querySelectorAll('[data-test="content-contribution"]').forEach(
          (el) => previewBlocker.removeElement(el),
        )
      },
    }
  },
};
