const BaseModel = require('./BaseModel');

class Notification extends BaseModel {
  static get tableName() {
    return 'notification';
  }

  static get idColumn() {
    return 'notification_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'notification.student_id',
          to: 'user.user_id'
        }
      },
      task: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Task'),
        join: {
          from: 'notification.task_id',
          to: 'task.task_id'
        }
      }
    };
  }
}

module.exports = Notification;
