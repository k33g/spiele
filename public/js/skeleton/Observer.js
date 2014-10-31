/**
 * Created by k33g_org on 31/10/14.
 */

class Observer {

  constructor (options = { onMessage: (context) => { console.log(context);} }) {
    Object.assign(this, options);
  }

  update (context) {
    this.onMessage(context)
  }

  observe (observable) {
    observable.addObserver(this);
  }

}

export default Observer

/*
TODO: observerAbilities
 */
