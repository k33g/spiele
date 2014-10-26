import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import MongoDbHelper from './core/MongoDbHelper';

import HumanCtrl from './controllers/HumanCtrl';
import HumansCtrl from './controllers/HumansCtrl';

// Connection URL
let url = 'mongodb://localhost:27017/spiele-project';
let mongoDbHelper = new MongoDbHelper(url);


let app = express()
  , http_port = 3008;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());


/* Get All Humans */
app.get("/humans", (req, res) => {
  let humansCtrl = new HumansCtrl(mongoDbHelper, req, res);
  humansCtrl.getAll();
});

/* new Request("/humans/find").post({firstName:"Bob"}).then((data) => { console.log(data); }) */
app.post("/humans/find", (req, res) => {
  let humansCtrl = new HumansCtrl(mongoDbHelper, req, res);
  humansCtrl.find();
});


/*
  Get Human by id: (Client side)
 let bobby = new Human({_id:"9c7d5ab0-5ce3-11e4-90a9-3ff7ca060ed2"});
 bobby.fetch().then((data) => { console.log(data); })
 */
app.get("/humans/:id", (req, res) => {
  let humanCtrl = new HumanCtrl(mongoDbHelper, req, res);
  humanCtrl.get();
});

/*
  Add Human: (Client side)
 let bob = new Human({firstName:"Bob", lastName:"Morane"});
 bob.save().then((data) => { console.log(data); })
 */
app.post("/humans", (req, res) => {
  let humanCtrl = new HumanCtrl(mongoDbHelper, req, res);
  humanCtrl.new();
});


/* Update human */
app.put("/humans/:id", (req, res) => {
  // ie: check with id if exists
  let humanCtrl = new HumanCtrl(mongoDbHelper, req, res);
  humanCtrl.update();
});

/* Delete human */
app.delete("/humans/:id", (req, res) => {
  let humanCtrl = new HumanCtrl(mongoDbHelper, req, res);
  humanCtrl.delete();
});

mongoDbHelper.start(() => {
  app.listen(http_port);
  console.log("Listening on " + http_port);
});

