const BaseModel = require('./BaseModel');

class TaskSubmission extends BaseModel {
  static get tableName() {
    return 'tasksubmissions';
  }

  static get idColumn() {
    return 'submission_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'tasksubmissions.user_id',
          to: 'user.user_id'
        }
      },
      task: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Task'),
        join: {
          from: 'tasksubmissions.task_id',
          to: 'task.task_id'
        }
      }
    };
  }
}

module.exports = TaskSubmission;
