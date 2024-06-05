import NiceSelect from '../libs/nice-select2';

export default function NiceSelectInit() {
  new NiceSelect(document.getElementById('js-select-cta-question'), {
    searchable: false
  });

  var selectElement = document.getElementById('js-select-cta-question');
  var selectElementsEl = document.querySelectorAll('.nice-select.js-select-cta-question');

  selectElement.addEventListener('change', function() {
    var selectedValue = this.value;
    selectElementsEl.forEach(function(element) {
      if (selectedValue !== 'Выбор вопроса') {
        element.classList.add('is-chooses');
      } else {
        element.classList.remove('is-chooses');
      }
    });
  });
}