
import View from '../../skeleton/View';
import $q from '../../skeleton/selector';

class HumansList extends View {


  oldTemplate (humans) {
    return `
      <ul>${
      humans.models.map(
        (human) => `<li>${human.id()} - ${human.get("firstName")}, ${human.get("lastName")}</li>`
      ).join("")
      }</ul>
    `;
  }

  template (humans) {
    return `
      <ul>${
      humans.models.map(
        (human) => `<li><b>${human._id}</b> - ${human.firstName}, ${human.lastName}</li>`
      ).join("")
      }</ul>
    `;
  }

  constructor (humansCollection) {

    super({
      collection: humansCollection,
      element: $q("#humans-list")
    });

    // display list when collection is loaded (when fetch is called)
    humansCollection.addObserver(this)

  }
  // i've got an update method I'm an observer too
  update (context) {
    if (context.event == "fetched") {
      this.render();
    }
  }


  render () {
    this.html(this.template(this.collection));
  }

}

export default HumansList;