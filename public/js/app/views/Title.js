import View from '../../skeleton/View';
import $q from '../../skeleton/selector';

class Title extends View {

  template (title) {
    return `<h1 style="color:green;">${title}</h1>`;
  }

  constructor (title) {

    super({
      element: $q("#my-title")
    });

    this.title = title;

    // display title
    this.render();
  }

  render () {
    this.html(this.template(this.title));
  }

}

export default Title;