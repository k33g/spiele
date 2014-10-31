
class Observable {

  constructor (observers=[]) {
    this.observers = observers;
  }

  addObserver (observer) {
    this.observers.push(observer);
    return this;
  }

  addObservers (observers) {
    observers.forEach((observer) => {
      this.observers.push(observer);
    });
    return this;
  }

  notifyObservers (context) {
    this.observers.forEach((observer) => {
      observer.update(context)
    });
    return this;
  }

  /*TODO: removeObserver etc. ...*/
}

export default Observable;