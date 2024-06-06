import NiceSelect from '../libs/nice-select2';

export class Translations {
  constructor(defaultLang = 'ru', translationFile = 'static/translations.json') {
    this.defaultLang = defaultLang;
    this.translationFile = translationFile;
    this.contentElements = document.querySelectorAll('[data-translate]');
    this.altElements = document.querySelectorAll('[data-translate-alt]');
    this.placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    this.optionElements = document.querySelectorAll('[data-translate-option]');
    this.languageButtons = document.querySelectorAll('.language-select__link');
    this.selectElement = document.getElementById('js-select-cta-question');
    this.init();
  }

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || this.defaultLang;

    fetch(this.translationFile)
      .then(response => response.json())
      .then(translations => {
        this.updateContent(translations, lang);
        this.initNiceSelect();
      });

    this.languageButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedLang = button.getAttribute('data-lang');
        history.pushState(null, '', `?lang=${selectedLang}`);
        fetch(this.translationFile)
          .then(response => response.json())
          .then(translations => {
            this.updateContent(translations, selectedLang);
            this.refreshNiceSelect();
          });
      });
    });
  }

  updateContent(translations, lang) {
    this.contentElements.forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[lang][key]) {
        element.innerHTML = translations[lang][key];
      }
    });

    this.altElements.forEach(element => {
      const key = element.getAttribute('data-translate-alt');
      if (translations[lang][key]) {
        element.alt = translations[lang][key];
      }
    });

    this.placeholderElements.forEach(element => {
      const key = element.getAttribute('data-translate-placeholder');
      if (translations[lang][key]) {
        element.placeholder = translations[lang][key];
      }
    });

    this.optionElements.forEach(element => {
      const key = element.getAttribute('data-translate-option');
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
        element.value = translations[lang][key];
      }
    });

    this.updateActiveButton(lang);
  }

  updateActiveButton(lang) {
    this.languageButtons.forEach(button => {
      button.classList.toggle('is-active', button.getAttribute('data-lang') === lang);
    });
  }

  initNiceSelect() {
    if (this.selectElement) {
      this.niceSelectInstance = new NiceSelect(this.selectElement, { searchable: false });
    }
  }

  refreshNiceSelect() {
    if (this.niceSelectInstance) {
      this.niceSelectInstance.destroy();
      this.initNiceSelect();
    }
  }
}