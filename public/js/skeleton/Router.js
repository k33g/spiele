
class Router {

  constructor (options={}) {
    Object.assign(this, options);
    this.routes = new Map();
    this.routes.set("/",(args)=>{});
  }

  add (uri, action) {
    this.routes.set(uri, action);
    return this;
  }

  match (uri) { //using hash

    // remove #/ from uri
    uri = uri.replace("#\/","");

    // ie: http://localhost:3006/#/hello/bob/morane
    // becomes /hello/bob/morane

    // to split uri with "/" and keep only no empty items
    let uriParts = uri.split("/").filter((part)=>part.length>0);

    // ie: ["hello", "bob", "morane"]

    // key to search -> "hello"
    let route = uriParts[0];
    // parameters to pass to the method -> ["bob", "morane"]
    let params = uriParts.slice(1);

    // het method
    let method = this.routes.get(route);

    // run method
    if (method) {
      method(params)
    } else {
      this.routes.get("/")(params)
    }
  }

  listen () {
    // when router is listening
    // check url at first time (first load) (useful to bookmark functionality)
    this.match(window.location.hash);

    /* subscribe to onpopstate */
    window.onpopstate = (event) => {
      this.match(window.location.hash);
    };
  }

}

export default Router