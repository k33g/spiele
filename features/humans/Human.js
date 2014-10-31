import Model from '../../core/Model';

class Human extends Model {
  constructor (mongoDbHelper, fields={}, observers=[]) {
    super(mongoDbHelper, "humans", fields, observers)
  }
}

export default Human;
