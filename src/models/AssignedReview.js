const BaseModel = require('./BaseModel');

class AssignedReview extends BaseModel {
  static get tableName() {
    return 'assignedreview';
  }

  static get idColumn() {
    return 'assigned_review_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      revisionThesis: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./RevisionThesis'),
        join: {
          from: 'assignedreview.revision_thesis_id',
          to: 'revisionthesis.revision_thesis_id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'assignedreview.user_id',
          to: 'user.user_id'
        }
      }
    };
  }
}

module.exports = AssignedReview;
