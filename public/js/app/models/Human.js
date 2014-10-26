import Model from '../../skeleton/Model';

class Human  extends Model {
  constructor (fields = { firstName:"John", lastName:"Doe"  }) {
    //superclass's constructor invocation
    //super(fields);
    super(fields, "/humans");
  }

  get _id () { return this.get("_id"); }

  get firstName () { return this.get("firstName"); }
  set firstName (value) { this.set("firstName", value); return this; }

  get lastName () { return this.get("lastName"); }
  set lastName (value) { this.set("lastName", value); return this; }
}

export default Human;
