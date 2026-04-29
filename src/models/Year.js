const BaseModel = require('./BaseModel');

class Year extends BaseModel {
  static get tableName() {
    return 'year';
  }

  static get idColumn() {
    return 'year_id';
  }
}

module.exports = Year;
