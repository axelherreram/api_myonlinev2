const BaseModel = require('./BaseModel');

class RevisionThesis extends BaseModel {
  static get tableName() {
    return 'revisionthesis';
  }

  static get idColumn() {
    return 'revision_thesis_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'revisionthesis.user_id',
          to: 'user.user_id'
        }
      },
      sede: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Sede'),
        join: {
          from: 'revisionthesis.sede_id',
          to: 'sede.sede_id'
        }
      }
    };
  }
}

module.exports = RevisionThesis;
