import Human from '../models/Human';

import View from '../../skeleton/View';
import $q from '../../skeleton/selector';

class HumanForm extends View {

  template () {
    return `
      <hr>
      <form>
        <input id="firstName" placeholder="firstName"/>
        <input id="lastName" placeholder="lastName"/>
        <button>add</button>
      </form>
      <hr>
    `;
  }

  constructor (humansCollection, message) {

    super({
      collection: humansCollection,
      element: $q("#human-form")
    });

    this.addObserver(message)

    // display form
    this.render();

    let button = this.element.find("button");

    this.firstName = this.element.find("#firstName");
    this.lastName = this.element.find("#lastName");

    button.addEventListener("click", (event) => this.click(event), false);

    this.element.addEventListener("keyup", (event) =>
      this.notifyObservers({ event:"message", value:this.firstName.value + " " +this.lastName.value })
    );

  }



  click (event) {
    event.preventDefault();

    let human = new Human({
      firstName: this.firstName.value,
      lastName : this.lastName.value
    });

    human.save().then((data) => {

      this.collection.fetch()

      this.firstName.value = "";
      this.lastName.value = "";

    });

  }

  render () {
    this.html(this.template());
  }

}

export default HumanForm;