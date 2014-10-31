import Controller from '../../core/Controller';
import ContentsCollection from './ContentsCollection';

class ContentsController extends Controller {
  constructor (mongoDbHelper, req, res) {
    this.mongoDbHelper = mongoDbHelper;
    super(req, res)
  }

  getAll () {
    let contents = new ContentsCollection(this.mongoDbHelper);

    contents.fetchModels().then((docs) => {
      this.ok(200, contents.toJSON());
    }).catch((err) => {
      this.ko(501, err);
    });
  }

  find () {
    let contents = new ContentsCollection(this.mongoDbHelper);
    contents.findModels(this.body()).then((docs)=> {
      this.ok(200, contents.toJSON());
    }).catch((err) => {
      this.ko(501, err);
    });
  }
}

export default ContentsController;