import Observable from './Observable';
import $q from './selector';

class View extends Observable {

  constructor (options={selector: "", observers: []}) {
    Object.assign(this, options);
    this.element = $q(this.selector);
    super(this.observers);
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

  /* $q("h3").attributes["data-model"].value */

  attribute (attrName) {
    return this.element.attributes[attrName];
  }

  attributes () {
    return this.element.attributes;
  }

  find (selector) {
    return this.element.find(selector);
  }

  on (eventName) {
    return this.element.on(eventName);
  }
}

export default View;
