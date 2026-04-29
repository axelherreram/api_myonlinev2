const BaseModel = require('./BaseModel');

class Comision extends BaseModel {
  static get tableName() {
    return 'comisiones';
  }

  static get idColumn() {
    return 'comision_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      group: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./GroupComision'),
        join: {
          from: 'comisiones.group_id',
          to: 'groupcomision.group_id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'comisiones.user_id',
          to: 'user.user_id'
        }
      },
      rolComision: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./RolComision'),
        join: {
          from: 'comisiones.rol_comision_id',
          to: 'rolcomision.rol_comision_id'
        }
      }
    };
  }
}

module.exports = Comision;
