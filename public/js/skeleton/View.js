import Observable from './Observable';

class View extends Observable {

  constructor (options={}, observers = []) {
    Object.assign(this, options);

    super(observers);
  }

  html (code) {
    this.element.innerHTML = code;
  }

  show () {
    this.element.style.display = "block"
  }

  hide () {
    this.element.style.display = "none"
  }

  toggle () {
    (this.element.style.display == "block" || this.element.style.display == "") ? this.hide() : this.show();
  }
}

export default View;
