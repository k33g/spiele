/**
 * Created by k33g_org on 26/10/14.
 */

import Controller from '../../core/Controller';
import Human from './Human';

class HumanCtrl extends Controller {

  constructor (mongoDbHelper, req, res) {
    this.mongoDbHelper = mongoDbHelper;
    super(req, res)
  }

  get () {
    let human = new Human(this.mongoDbHelper, { _id : this.param("id") });

    human.addObservers([
      {update: (context) => { console.log("Observer 1:", context); }},
      {update: (context) => { console.log("Observer 2:", context); }}
    ]);

    human.findById().then((data) => {
      this.ok(200, human.fields);
    }).catch((err) => {
      this.ko(501, err);
    });

  }

  new () {
    let human = new Human(this.mongoDbHelper, this.body());

    human.addObserver({ update: (context) => { console.log("Observer:", context); }});

    human.insert().then((data) => {
      this.redirect("/humans/"+human.get("_id"))
    }).catch((err) => {
      this.ko(501, err);
    });
  }

  update () {
    let human = new Human(this.mongoDbHelper, this.body());

    human.addObserver({ update: (context) => { console.log("Observer:", context); }});

    human.update().then((data) => {
      this.ok(200, human.fields);
    }).catch((err) => {
      this.ko(501, err);
    });
  }

  delete () {
    let human = new Human(this.mongoDbHelper, { _id : this.param("id") });

    human.addObserver({ update: (context) => { console.log("Observer:", context); }});

    human.deleteById().then((data) => {
      this.ok(200, human.fields);
    }).catch((err) => {
      this.ko(501, err);
    });

  }

}

export default HumanCtrl;
