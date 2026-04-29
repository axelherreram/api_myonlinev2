const BaseModel = require('./BaseModel');

class TypeTask extends BaseModel {
  static get tableName() {
    return 'typetask';
  }

  static get idColumn() {
    return 'typeTask_id';
  }
}

module.exports = TypeTask;
