const BaseModel = require('./BaseModel');

class CommentVersion extends BaseModel {
  static get tableName() {
    return 'commentversion';
  }

  static get idColumn() {
    return 'commentVersion_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      comment: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Comment'),
        join: {
          from: 'commentversion.comment_id',
          to: 'comments.comment_id'
        }
      }
    };
  }
}

module.exports = CommentVersion;
