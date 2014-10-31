import View from '../../skeleton/View';

class MyTitle extends View {

  template (title) {
    return `<h1 style="color:green;">${title}</h1>`;
  }

  constructor (title) {

    super({
      selector: "my-title"
    });

    this.title = title;

    // display title
    this.render();

    console.log(this.attribute("identifiant").value, this.attribute("value").value);
    this.attribute("value").value = "HELLO WORLD"
  }

  render () {
    this.html(this.template(this.title));
  }
}

export default MyTitle;