import View from '../../skeleton/View';

class Message extends View {

  template (message) {
    return `<h2 style="color:red;">${message}</h2>`;
  }

  constructor (text) {

    super({
      selector: "my-message"
    });

    this.text = text;

    // display message
    this.render();
  }

  render () {
    this.html(this.template(this.text));
  }

}

export default Message;