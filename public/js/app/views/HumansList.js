
import View from '../../skeleton/View';
import $q from '../../skeleton/selector';

class HumansList extends View {


  template (humans) {
    return `
      <ul>${
      humans.models.map(
        (human) => `<li>${human.id()} - ${human.get("firstName")}, ${human.get("lastName")}</li>`
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

    this.listen(humansCollection, (context) => {
      if (context.event == "fetched") {
        this.render();
      }
    })

  }


  render () {
    this.html(this.template(this.collection));
  }

}

export default HumansList;