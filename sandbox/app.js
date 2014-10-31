/**
 * Created by k33g_org on 30/10/14.
 */

class Human extends Backbone.Model {

  constructor (args) {
    idAttribute: "_id";
    this.urlRoot = "/humans";
    super(args)
  }

}

class Humans extends Backbone.Collection {

  constructor (args) {
    this.model = Human;
    this.url = "/humans";
    super(args) /* mandatory */
  }
}

class HumansList extends Backbone.View {

  template () { return `
    <ul>{{#humans}}
      <li>{{firstName}} {{lastName}}</li>
    {{/humans}}</ul>
  `}

  constructor (options) {
    this.el = "humans-list";
    super (options)
    this.collection.on('all', () => { this.render(); })
  }

  render () {
    let rendered = Mustache.render(this.template(), {humans:this.collection.toJSON()});
    this.$el.html(rendered)
  }
}

class HumanForm extends Backbone.View {

  template () { return `
    <hr>
    <form>
      <input id="firstName" placeholder="firstName"/>
      <input id="lastName" placeholder="lastName"/>
      <button>add</button>
    </form>
    <hr>
  `}


  constructor (options) {
    this.el = "human-form";
    super (options)
    this.render();

    this.firstName = this.$el.find("#firstName");
    this.lastName = this.$el.find("#lastName");
    this.button = this.$el.find("button");

    this.button.click((event) => this.click(event));

  }

  click (event) {
    event.preventDefault();

    let human = new Human({
      firstName: this.firstName.val(),
      lastName : this.lastName.val()
    });

    human.save().then((data) => {

      this.collection.fetch()

      this.firstName.val("");
      this.lastName.val("");

    });

  }

  render () {
    let rendered = Mustache.render(this.template());
    this.$el.html(rendered)
  }

}


let humans = new Humans();
let humansList = new HumansList({collection:humans});
let humanForm = new HumanForm({collection:humans})
humans.fetch().then((data) => {});
