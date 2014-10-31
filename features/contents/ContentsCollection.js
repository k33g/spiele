import Collection from '../../core/Collection';
import ContentModel from './ContentModel';

class ContentsCollection extends Collection {
  constructor (mongoDbHelper, models=[], observers=[]) {
    super(mongoDbHelper, "contents", Human, models, observers);
  }
}

export default ContentsCollection;