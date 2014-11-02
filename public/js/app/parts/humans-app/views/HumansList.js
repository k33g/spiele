import View from '../../../../skeleton/View';
import Observer from '../../../../skeleton/Observer';

class HumansList extends View {

  template (humans) {return `
      <ul>${
      humans.map(
        (human) => `
        <li>
          <b>${human._id}</b> - ${human.firstName}, ${human.lastName} <a href="/#/humans/remove/${human._id}">Remove</a>
        </li>
        `
      ).join("")
      }</ul>
  `;}

  constructor (humansCollection) {

    super({
      selector : "humans-list",
      collection : humansCollection
    });

    new Observer({onMessage:(context) => {
      context.event == "fetched" ? this.render() : null;
    }}).observe(humansCollection)

  }

  render () {
    this.html(this.template(this.collection));
  }

}

export default HumansList;