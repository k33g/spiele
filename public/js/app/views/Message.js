import View from '../../skeleton/View';
import $q from '../../skeleton/selector';

class Message extends View {

  template (message) {
    return `<h2 style="color:red;">${message}</h2>`;
  }

  constructor (message) {

    super({
      element: $q("#my-message")
    });

    this.message = message;

    // display message
    this.render();

  }

  render () {
    this.html(this.template(this.message));
  }

  update (context) {
    if (context.event == "message") {
      this.message = context.value;
      this.render();
    }
  }

}

export default Message;