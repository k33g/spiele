//import Human from 'js/app/models/Human';
import Humans from 'js/app/models/Humans';

import Title from 'js/app/views/Title';
import Message from 'js/app/views/Message';

import HumansList from 'js/app/views/HumansList';
import HumanForm from 'js/app/views/HumanForm';


//import $q from 'js/skeleton/selector';
//import Request from 'js/skeleton/Request';

new Title("POC: ECMAScript 6 + MongoDB");

let message = new Message("...");

let humansCollection = new Humans();

let humansList = new HumansList(humansCollection);

let humanForm = new HumanForm(humansCollection, message);

humansCollection.fetch();







