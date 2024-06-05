import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

Swiper.use([Pagination]);

function SliderInit() {
  const sliderElement = document.querySelector('.js-blockchain-slider-init');
  
  if (!sliderElement) {
    return;
  }

  function remToPx(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  const spaceBetweenRem = 32;
  const spaceBetweenPx = remToPx(spaceBetweenRem);

  const swiper = new Swiper(sliderElement, {
    slidesPerView: 1,
    spaceBetween: spaceBetweenPx,
    autoHeight: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  });

  return swiper;
}

export default SliderInit;
