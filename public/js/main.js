/* --- main ---*/
import Router from 'js/skeleton/Router';
import Observer from 'js/skeleton/Observer';
import Part from 'js/skeleton/Part';


let router = new Router();
router
  .add("/", (args) => { console.log("=== Home ==="); })
  .add("hello", (args) => { console.log(args); });

router.listen();

let helloPart = new Part({url:"js/app/parts/hello/hello", selector:"hello"});
let headerAppPart = new Part({url:"js/app/parts/header-app/header-app", selector:"header-app"});

let humansAppPart = new Part({
  url: "js/app/parts/humans-app/humans-app",
  selector: "humans-app",
  observers: [
    new Observer({ onMessage: (context) => {
      console.log("From Observer of humansAppPart", context)
    }})
  ]
});


helloPart.load({message:"Hello"}).then(() => {

});

headerAppPart.load({message:"Header"}).then(() => {

});

/* Router injection */
humansAppPart.load({router: router}).then(() => {
  console.log("humansAppPart loaded")
});











