const BaseModel = require('./BaseModel');

class GroupComision extends BaseModel {
  static get tableName() {
    return 'groupcomision';
  }

  static get idColumn() {
    return 'group_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      year: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Year'),
        join: {
          from: 'groupcomision.year_id',
          to: 'year.year_id'
        }
      },
      sede: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Sede'),
        join: {
          from: 'groupcomision.sede_id',
          to: 'sede.sede_id'
        }
      }
    };
  }
}

module.exports = GroupComision;
