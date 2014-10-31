import ContentController from './ContentController';
import ContentsController from './ContentsController';

export default (app, mongoDbHelper) => {

  /* Get All Contents */
  app.get("/contents", (req, res) => {
    let contentsCtrl = new ContentsController(mongoDbHelper, req, res);
    contentsCtrl.getAll();
  });

  /* new Request("/contents/find").post({title:"hello"}).then((data) => { console.log(data); }) */
  app.post("/contents/find", (req, res) => {
    let contentsCtrl = new ContentsController(mongoDbHelper, req, res);
    contentsCtrl.find();
  });

  /* Get content by */
  app.get("/contents/:id", (req, res) => {
    let contentCtrl = new ContentController(mongoDbHelper, req, res);
    contentCtrl.get();
  });

  /* Add content */
  app.post("/contents", (req, res) => {
    let contentCtrl = new ContentController(mongoDbHelper, req, res);
    contentCtrl.new();
  });


  /* Update content */
  app.put("/contents/:id", (req, res) => {
    // ie: check with id if exists
    let contentCtrl = new ContentController(mongoDbHelper, req, res);
    contentCtrl.update();
  });

  /* Delete content */
  app.delete("/contents/:id", (req, res) => {
    let contentCtrl = new ContentController(mongoDbHelper, req, res);
    contentCtrl.delete();
  });
}