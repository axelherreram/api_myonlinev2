const BaseModel = require('./BaseModel');

class ApprovalThesis extends BaseModel {
  static get tableName() {
    return 'approvalthesis';
  }

  static get idColumn() {
    return 'approval_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      revisionThesis: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./RevisionThesis'),
        join: {
          from: 'approvalthesis.revision_thesis_id',
          to: 'revisionthesis.revision_thesis_id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'approvalthesis.user_id',
          to: 'user.user_id'
        }
      }
    };
  }
}

module.exports = ApprovalThesis;
