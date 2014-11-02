/**
 * Created by k33g_org on 02/11/14.
 */
import Observable from './Observable';
import $q from './selector';
import Request from './Request';

class Part extends Observable { // extends View instead ?
  constructor (options = {url: "/", selector: "", observers: []}) {
    Object.assign(this, options);
    this.element = $q(this.selector);
    super(this.observers);
  }

  load (options) {
    return new Request(this.url+".html").getText().then((data) => {
      this.element.innerHTML = data;
      this.notifyObservers({event: "rendered", part:this});

      System.import(this.url).then((module) => {
        module.default(options); // export default (options) => {}
        this.notifyObservers({event: "started", part:this});

      }).catch((err) => {
        throw err;
      });
    });
  }


}

export default Part