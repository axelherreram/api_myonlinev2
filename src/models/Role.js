const BaseModel = require('./BaseModel');

class Role extends BaseModel {
  static get tableName() {
    return 'roles';
  }

  static get idColumn() {
    return 'rol_id';
  }
}

module.exports = Role;
