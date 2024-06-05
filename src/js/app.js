/**
 * !(i)
 * The code is included in the final file only when a function is called, for example: FLSFunctions.spollers();
 * Or when the entire file is imported, for example: import "files/script.js";
 * Unused code does not end up in the final file.

 * If we want to add a module, we should uncomment it.
 */

// support webp, identify device
import { Translations } from './modules/translations.js';
import BaseHelpers from './helpers/BaseHelpers.js';
import StickyHeader from './modules/StickyHeader.js';
import HeaderBtnToggle from './modules/HeaderBtnToggle.js';
import { SmoothScroll } from './modules/SmoothScroll.js';
import SliderInit from './modules/SwiperInit.js';
import FaqCard from './modules/FaqCard.js';
import NiceSelectInit from './modules/NiceSelectInit.js';

BaseHelpers.checkWebpSupport();
BaseHelpers.addTouchClass();
BaseHelpers.addLoadedClass();

document.addEventListener('DOMContentLoaded', function() {
  // translate languge
  const translations = new Translations();
  // header sticky
  new StickyHeader('.js-header-sticky', 'is-sticky');
  // nav active anchor
  const smoothScroll = new SmoothScroll('.js-anchor', '--scroll-offset', 650);
  // header nav mobile toggle
  const headerBtnToggle = new HeaderBtnToggle();
  // slider init
  SliderInit();
  // faq card
  const faqCard = new FaqCard();
  // select init
  NiceSelectInit();
});

// form
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('cta-form');
  const thanksMessage = document.querySelector('.cta-block__thanks');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 && xhr.responseText === 'success') {
          thanksMessage.classList.add('is-show');
        } else {
        }
      }
    };
    xhr.send(formData);
  });
});