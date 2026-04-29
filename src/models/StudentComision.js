const BaseModel = require('./BaseModel');

class StudentComision extends BaseModel {
  static get tableName() {
    return 'studentcomision';
  }

  static get idColumn() {
    return 'estudiante_comision_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      group: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./GroupComision'),
        join: {
          from: 'studentcomision.group_id',
          to: 'groupcomision.group_id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'studentcomision.user_id',
          to: 'user.user_id'
        }
      }
    };
  }
}

module.exports = StudentComision;
