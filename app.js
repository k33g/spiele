import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import MongoDbHelper from './core/MongoDbHelper';

import SandboxRoutes from './features/sandbox/SandboxRoutes';
import HumansRoutes from './features/humans/HumansRoutes';
import ContentsRoutes from './features/contents/ContentsRoutes';

// Connection URL for MongoDb
let url = 'mongodb://localhost:27017/spiele-project';
let mongoDbHelper = new MongoDbHelper(url);

let app = express()
  , http_port = 3008;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

/*=== routes ===*/

SandboxRoutes(app);
HumansRoutes(app, mongoDbHelper)


mongoDbHelper.start((err) => {
  if (err) console.log(err);
  app.listen(http_port);
  console.log("Listening on " + http_port);
});

