import Observable from './Observable';
import Request from './Request';

class Model extends Observable {

  constructor (fields={}, url="/", observers=[]) {

    this.fields = fields;
    this.url = url;

    super(observers);
  }

  get (fieldName) {
    return this.fields[fieldName];
  }

  set (fieldName, value) {
    this.fields[fieldName] = value;
    return this;
  }

  toString () {
    return JSON.stringify(this.fields)
  }

  /*--- sync ---*/


  id() { return this.get("_id");}

  save () {

    if (this.id() == undefined) {
      // create (insert)
      return new Request(this.url).post(this.fields)
        .then((data) => {
          this.fields = data;
          this.notifyObservers({event: "created", model: this});
          return data;
        })
        .catch((error) => error)
    } else {
      // update
      return new Request(`${this.url}/${this.id()}`).put(this.fields)
        .then((data) => {
          this.fields = data;
          this.notifyObservers({event: "updated", model: this});
          return data;
        })
        .catch((error) => error)
    }

  }

  fetch (id) {

    if (id == undefined) {
      new Request(`${this.url}/${this.id()}`).get()
        .then((data) => {
          this.fields = data;
          this.notifyObservers({event: "fetched", model: this});
          return data;
        })
        .catch((error) => error)
    } else {
      new Request(`${this.url}/${id}`).get()
        .then((data) => {
          this.fields = data;
          this.notifyObservers({event: "fetched", model: this});
          return data;
        })
        .catch((error) => error)
    }

  }

  delete (id) {

    if (id == undefined) {
      //console.log("delete",this.id())
      return new Request(`${this.url}/${this.id()}`).delete()
        .then((data) => {
          this.fields = data;
          this.notifyObservers({event: "deleted", model: this});
          return data;
        })
        .catch((error) => error)
    } else {
      return new Request(`${this.url}/${id}`).delete()
        .then((data) => {
          this.fields = data;
          this.notifyObservers({event: "deleted", model: this});
          return data;
        })
        .catch((error) => error)
    }
  }

}

export default Model;