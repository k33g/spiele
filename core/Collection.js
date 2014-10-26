/**
 * Created by k33g_org on 26/10/14.
 */

import Observable from './Observable';

export default class Collection extends Observable {
  constructor(mongoDbHelper, collectionName, kindOfModel, models = [], observers = []) {
    this.db = mongoDbHelper;
    this.collection = collectionName;
    this.models = models;
    this.model = kindOfModel;

    super(observers); // observers as parameter
  }

  fetchDocs () {
    return new Promise((resolve, reject) => {

      this.db.collection(this.collection).findAll().then((docs) => {
        this.notifyObservers({event: "fetched", docs:docs});
        resolve(docs)
      }).catch((err) => {
        reject(err)
      })

    });
  }

  findDocs (criteria) {
    return new Promise((resolve, reject) => {

      this.db.collection(this.collection).find(criteria).then((docs) => {
        this.notifyObservers({event: "found", docs:docs});
        resolve(docs)
      }).catch((err) => {
        reject(err)
      })

    });
  }

  fetchModels () {
    return new Promise((resolve, reject) => {

      this.db.collection(this.collection).findAll().then((docs) => {
        this.models = [];
        docs.forEach((doc) => {

          //mongoDbHelper,collectionName, fields={}, observers=[]
          let newModel = new this.model(this.db, doc); // this is an instance of a model that extends Model,
          this.models.push(newModel);
        });
        this.notifyObservers({event: "fetched", models:this.models});
        resolve(docs)
      }).catch((err) => {
        reject(err)
      })
    });
  }

  findModels (criteria) {
    return new Promise((resolve, reject) => {

      this.db.collection(this.collection).find(criteria).then((docs) => {
        this.models = [];
        docs.forEach((doc) => {

          //mongoDbHelper,collectionName, fields={}, observers=[]
          let newModel = new this.model(this.db, doc); // this is an instance of a model that extends Model,
          this.models.push(newModel);
        });
        this.notifyObservers({event: "found", models:this.models});
        resolve(docs)
      }).catch((err) => {
        reject(err)
      })
    });
  }


  toJSON () {
    return this.models.map((model) => model.fields);
  }

  each (callBack) {
    this.models.forEach(callBack)
  }

  filter (callBack) {
    return this.models.filter(callBack)
  }

}