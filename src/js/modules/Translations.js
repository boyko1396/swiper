export class Translations {
  constructor(defaultLang = 'ru', translationFile = 'static/translations.json') {
    this.defaultLang = defaultLang;
    this.translationFile = translationFile;
    this.contentElements = document.querySelectorAll('[data-translate]');
    this.altElements = document.querySelectorAll('[data-translate-alt]');
    this.languageButtons = document.querySelectorAll('.language-select__link');
    this.init();
  }

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || this.defaultLang;

    fetch(this.translationFile)
      .then(response => response.json())
      .then(translations => {
        this.updateContent(translations, lang);
      });

    this.languageButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedLang = button.getAttribute('data-lang');
        history.pushState(null, '', `?lang=${selectedLang}`);
        fetch(this.translationFile)
          .then(response => response.json())
          .then(translations => {
            this.updateContent(translations, selectedLang);
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

    this.updateActiveButton(lang);
  }

  updateActiveButton(lang) {
    this.languageButtons.forEach(button => {
      button.classList.toggle('is-active', button.getAttribute('data-lang') === lang);
    });
  }
}