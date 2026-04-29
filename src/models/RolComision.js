const BaseModel = require('./BaseModel');

class RolComision extends BaseModel {
  static get tableName() {
    return 'rolcomision';
  }

  static get idColumn() {
    return 'rol_comision_id';
  }
}

module.exports = RolComision;
