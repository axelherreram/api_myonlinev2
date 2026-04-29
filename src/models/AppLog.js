const BaseModel = require('./BaseModel');

class AppLog extends BaseModel {
  static get tableName() {
    return 'applog';
  }

  static get idColumn() {
    return 'log_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'applog.user_id',
          to: 'user.user_id'
        }
      },
      sede: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Sede'),
        join: {
          from: 'applog.sede_id',
          to: 'sede.sede_id'
        }
      }
    };
  }
}

module.exports = AppLog;
