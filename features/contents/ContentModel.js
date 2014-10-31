import Model from '../../core/Model';

class ContentModel extends Model {
  constructor (mongoDbHelper, fields={}, observers=[]) {
    super(mongoDbHelper, "contents", fields, observers)
  }
}

export default ContentModel;
