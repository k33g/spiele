import Human from 'js/app/models/Human';
import Humans from 'js/app/models/Humans';

import MyTitle from 'js/app/views/MyTitle';
import Message from 'js/app/views/Message';

import HumansList from 'js/app/views/HumansList';
import HumanForm from 'js/app/views/HumanForm';
import $q from 'js/skeleton/selector';
import Request from 'js/skeleton/Request';
import Router from 'js/skeleton/Router';

import Observer from 'js/skeleton/Observer';

window.$q = $q;
window.Request = Request;


new MyTitle("POC: ECMAScript 6 + MongoDB");

let message = new Message("...");

let humansCollection = new Humans();

let humansList = new HumansList(humansCollection);

let humanForm = new HumanForm(humansCollection, message);

humansCollection.fetch();

let router = new Router({
  removeHuman: (id) => {
    new Human({_id:id}).delete().then(() => { humansCollection.fetch(); });

    /* change url after delete */
  }
});

router
  .add("humans", (args) => {
    switch(args[0]) {
      case "remove":
        router.removeHuman(args[1]);
        break;
      case "list":
        break;
      default:
      //foo
    }
  });

router.listen()


/*
new Observer({onMessage: (context) => {

  console.log(context)
  $q("message").innerHTML = JSON.stringify(context);

}}).observe(humansCollection)
*/






