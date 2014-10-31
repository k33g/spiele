import Collection from '../../core/Collection';
import Human from './Human';

class Humans extends Collection {
  constructor (mongoDbHelper, models=[], observers=[]) {
    super(mongoDbHelper, "humans", Human, models, observers);
  }
}

export default Humans;