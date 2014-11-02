import Collection from '../../../../skeleton/Collection';
import Human from './Human';

class Humans extends Collection {

  constructor (humans) {
    //super(Human,humans-app);
    super({model: Human,url: "/humans", models: humans});
    console.log("humans collection", this.observers)
  }
}

export default Humans;