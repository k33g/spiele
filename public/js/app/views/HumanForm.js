import Human from '../models/Human';
import View from '../../skeleton/View';
import Observer from '../../skeleton/Observer';


class HumanForm extends View {

  template () {return `
      <hr>
      <form>
        <input class="firstName" placeholder="firstName"/>
        <input class="lastName" placeholder="lastName"/>
        <textarea rows="10" cols="50" class="history"></textarea>
        <button>add</button>
      </form>
      <hr>
  `;}

  constructor (humansCollection, message) {

    super({
      collection: humansCollection,
      selector: "human-form" // ref. to this.element
    });

    new Observer({onMessage: (context) => {

      if (context.event == "message") {
        message.text = context.value;
        message.render();
      }

    }}).observe(this)

    // display form
    this.render();

    this.button = this.find("button");
    this.firstName = this.find(".firstName");
    this.lastName = this.find(".lastName");
    this.history = this.find(".history")

    this.button.on("click")((event) => this.click(event));

    this.on("keyup")((event) =>
      this.notifyObservers({
        event:"message",
        value:`${this.firstName.value} ${this.lastName.value}`
      })
    );
  }

  click (event) {
    event.preventDefault();

    let human = new Human({
      firstName: this.firstName.value,
      lastName : this.lastName.value,
      history : this.history.value
    });

    human.save().then((data) => {

      this.collection.fetch().then(() => {
        this.firstName.value = "";
        this.lastName.value = "";
        this.history.value = "";
      })

    });

  }

  render () {
    this.html(this.template());
  }

}

export default HumanForm;

