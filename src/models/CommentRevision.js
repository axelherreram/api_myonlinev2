const BaseModel = require('./BaseModel');

class CommentRevision extends BaseModel {
  static get tableName() {
    return 'commentsrevision';
  }

  static get idColumn() {
    return 'commentsRevision_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      assignedReview: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./AssignedReview'),
        join: {
          from: 'commentsrevision.assigned_review_id',
          to: 'assignedreview.assigned_review_id'
        }
      }
    };
  }
}

module.exports = CommentRevision;
