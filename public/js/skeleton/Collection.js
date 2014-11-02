import Observable from './Observable';
import Request from './Request';

class Collection extends Observable {

  constructor (options = {model: {}, url: "/", models: [], observers: []}) {
    Object.assign(this, options);
    super(this.observers);
  }

  toString () {
    return JSON.stringify(this.models);
  }

  add (model) {
    this.models.push(model);
    this.notifyObservers({event: "added", model: model});
    return this;
  }

  each (callbck) {
    this.models.forEach(callbck)
  }

  filter (callbck) {
    return this.models.filter(callbck)
  }

  map (callbck) {
    return this.models.map(callbck)
  }


  size () { return this.models.length; }

  /*--- sync ---*/

  fetch () {

    return new Request(this.url).get().then((models) => {
      this.models = []; /* empty list */

      models.forEach((fields) => {
        this.add(new this.model(fields)); // always initialize a model like that
      });

      this.notifyObservers({event: "fetched", models:models});
      return models;
    })
    .catch((error) => error)


  }
  /* TODO: add search() facilities */

}

export default Collection;