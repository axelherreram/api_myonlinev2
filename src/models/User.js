const BaseModel = require('./BaseModel');

class User extends BaseModel {
  static get tableName() {
    return 'user';
  }

  static get idColumn() {
    return 'user_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      sede: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Sede'),
        join: {
          from: 'user.sede_id',
          to: 'sede.sede_id'
        }
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Role'),
        join: {
          from: 'user.rol_id',
          to: 'roles.rol_id'
        }
      },
      year: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Year'),
        join: {
          from: 'user.year_id',
          to: 'year.year_id'
        }
      }
    };
  }
}

module.exports = User;
