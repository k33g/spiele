/**
 * Created by k33g_org on 24/10/14.
 */
import mongodb  from 'mongodb';
import uuid from 'node-uuid';

/*
 http://mongodb.github.io/node-mongodb-native/2.0/tutorials/crud_operations/
 */

export default class MongoDbHelper {

  constructor (url) {
    this.url = url;
    this.mongoClient = mongodb.MongoClient;
    this.db = null;
  }

  start (callback) {
    this.mongoClient.connect(this.url, (err, db) => {
      this.db = db;
      callback(db)
    });
  }

  collection (collectionName) {
    let mongoDbCollection = this.db.collection(collectionName)
    let collection = {
      insert : (model) => { //TODO: insert many
        return new Promise((resolve, reject) => {
          model._id = uuid.v1();
          mongoDbCollection.insertOne(model, (err, result) => {
            if (err) { reject(err); }
            resolve(model);
          });
        });
      },

      update : (model) => { //TODO: update many
        return new Promise((resolve, reject) => {

          mongoDbCollection.updateOne({_id:model._id}, {$set:model}, (err, result) => {
            if (err) { reject(err); }
            resolve(model);
          });
        });
      },

      findAll : () => {
        return new Promise((resolve, reject) => {
          mongoDbCollection.find({}).toArray( (err, docs) => {
            if (err) { reject(err); }
            resolve(docs);
          });

        });
      },

      // ie: criteria = {firstName:"Bob"}
      find : (criteria) => {
        return new Promise((resolve, reject) => {
          mongoDbCollection.find(criteria).toArray( (err, docs) => {
            if (err) { reject(err); }
            resolve(docs);
          });

        });
      },
      //TODO: findOne
      findById : (id) => {
        return new Promise((resolve, reject) => {
          mongoDbCollection.findOne({_id: id}, (err, doc) => {
            if (err) { reject(err); }
            resolve(doc);
          });
        });
      },

      deleteById : (id) => { //TODO: delete many
        return new Promise((resolve, reject) => {
          mongoDbCollection.removeOne({_id: id}, (err, result) => {
            if (err) { reject(err); }
            resolve(result);
          });
        });
      }

    }

    return collection;
  }

}
