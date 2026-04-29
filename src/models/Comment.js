const BaseModel = require('./BaseModel');

class Comment extends BaseModel {
  static get tableName() {
    return 'comments';
  }

  static get idColumn() {
    return 'comment_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'comments.user_id',
          to: 'user.user_id'
        }
      },
      task: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Task'),
        join: {
          from: 'comments.task_id',
          to: 'task.task_id'
        }
      },
      versions: {
        relation: Model.HasManyRelation,
        modelClass: require('./CommentVersion'),
        join: {
          from: 'comments.comment_id',
          to: 'commentversion.comment_id'
        }
      }
    };
  }
}

module.exports = Comment;
