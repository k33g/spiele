
class Observable {

  constructor (observers=[]) {
    this.observers = observers;
  }

  addObserver (observer) {
    this.observers.push(observer);
  }

  addObservers (observers) {
    observers.forEach((observer) => {
      this.observers.push(observer);
    });
  }

  notifyObservers (context) {
    this.observers.forEach((observer) => {
      observer.update(context)
    })
  }
}

export default Observable;