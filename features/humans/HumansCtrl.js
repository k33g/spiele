/**
 * Created by k33g_org on 26/10/14.
 */

import Controller from '../../core/Controller';
import Humans from './Humans';

class HumansCtrl extends Controller {
  constructor (mongoDbHelper, req, res) {
    this.mongoDbHelper = mongoDbHelper;
    super(req, res)
  }

  getAll () {
    let humans = new Humans(this.mongoDbHelper);

    humans.fetchModels().then((docs) => {
      this.ok(200, humans.toJSON());
    }).catch((err) => {
      this.ko(501, err);
    });
  }

  find () {
    let humans = new Humans(this.mongoDbHelper);
    humans.findModels(this.body()).then((docs)=> {
      this.ok(200, humans.toJSON());
    }).catch((err) => {
      this.ko(501, err);
    });
  }
}

export default HumansCtrl;

