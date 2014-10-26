/**
 * Created by k33g_org on 26/10/14.
 */
import Observable from './Observable';

export default class Model extends Observable {
  constructor (mongoDbHelper,collectionName, fields={}, observers=[]) {
    this.db = mongoDbHelper;
    this.fields = fields;
    this.collection = collectionName;

    /* TODO ?
      state : notPersist, updated, created, deleted
     */

    super(observers); // observers as parameter
  }

  get (fieldName) {
    return this.fields[fieldName];
  }

  set (fieldName, value) { // fluent
    this.fields[fieldName] = value;
    return this;
  }

  insert () {
    return new Promise((resolve, reject) => {

      this.db.collection(this.collection).insert(this.fields).then((modelDocument) => {

        this.fields = modelDocument;
        this.notifyObservers({event: "created", model: this});

        resolve(modelDocument)
      }).catch((err) => {
        reject(err)
      })

    });
  }

  update () {
    return new Promise((resolve, reject) => {

      this.db.collection(this.collection).update(this.fields).then((modelDocument) => {
        this.fields = modelDocument;
        this.notifyObservers({event: "updated", model: this});

        resolve(modelDocument)
      }).catch((err) => {
        reject(err)
      })

    });
  }

  findById (id=null) {
    return new Promise((resolve, reject) => {

      this.db.collection(this.collection).findById(id==null ? this.get("_id") : id).then((modelDocument) => {
        this.fields = modelDocument;
        this.notifyObservers({event: "fetched", model: this});
        resolve(modelDocument)
      }).catch((err) => {
        reject(err)
      })

    });
  }

  deleteById (id=null) {
    return new Promise((resolve, reject) => {
      let idToDelete = id==null ? this.get("_id") : id;
      this.db.collection(this.collection).deleteById(idToDelete).then((result) => {
        this.fields = {}
        this.fields._id = idToDelete;
        this.notifyObservers({event: "deleted", model: this});
        resolve(result)
      }).catch((err) => {
        reject(err)
      })

    });
  }

}

