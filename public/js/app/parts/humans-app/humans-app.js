/**
 * Created by k33g_org on 02/11/14.
 */

/*=== models ===*/
import Human from './models/Human';
import Humans from './models/Humans';

/*=== display components ===*/
import Message from './views/Message';
import HumansList from './views/HumansList';
import HumanForm from './views/HumanForm';

export default (options) =>  {

  console.log("== Human module ===", options);

  let message = new Message("...");

  let humansCollection = new Humans();

  let humansList = new HumansList(humansCollection);

  let humanForm = new HumanForm(humansCollection, message);

  humansCollection.fetch()

  options.router
    .add("humans", (args) => {
      switch(args[0]) {
        case "remove":
          new Human({_id:args[1]}).delete().then(() => { humansCollection.fetch(); });
          break;
        case "list":
          break;
        default:
        //foo
      }
    })


};







