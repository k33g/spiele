import Controller from '../../core/Controller';
import ContentModel from './ContentModel';

class ContentController extends Controller {

  constructor (mongoDbHelper, req, res) {
    this.mongoDbHelper = mongoDbHelper;
    super(req, res)
  }

  get () {
    let content = new ContentModel(this.mongoDbHelper, { _id : this.param("id") });

    content.findById().then((data) => {
      this.ok(200, content.fields);
    }).catch((err) => {
      this.ko(501, err);
    });

  }

  new () {
    let content = new ContentModel(this.mongoDbHelper, this.body());

    content.insert().then((data) => {
      this.redirect("/contents/"+content.get("_id"))
    }).catch((err) => {
      this.ko(501, err);
    });
  }

  update () {
    let content = new ContentModel(this.mongoDbHelper, this.body());

    content.update().then((data) => {
      this.ok(200, content.fields);
    }).catch((err) => {
      this.ko(501, err);
    });
  }

  delete () {
    let content = new ContentModel(this.mongoDbHelper, { _id : this.param("id") });

    content.deleteById().then((data) => {
      this.ok(200, content.fields);
    }).catch((err) => {
      this.ko(501, err);
    });

  }

}

export default ContentController;
