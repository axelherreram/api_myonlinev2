const BaseModel = require('./BaseModel');

class Sede extends BaseModel {
  static get tableName() {
    return 'sede';
  }

  static get idColumn() {
    return 'sede_id';
  }
}

module.exports = Sede;
