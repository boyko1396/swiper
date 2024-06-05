class StickyHeader {
  constructor(headerSelector, scrollClass) {
    this.header = document.querySelector(headerSelector);
    this.scrollClass = scrollClass;

    if (this.header) {
      this.updateHeaderClass();
      this.addScrollListener();
    }
  }

  addScrollListener() {
    window.addEventListener('scroll', () => {
      if (this.header) {
        this.updateHeaderClass();
      }
    });
  }

  updateHeaderClass() {
    if (this.header && window.scrollY > 0) {
      this.header.classList.add(this.scrollClass);
    } else if (this.header) {
      this.header.classList.remove(this.scrollClass);
    }
  }
}

export default StickyHeader;