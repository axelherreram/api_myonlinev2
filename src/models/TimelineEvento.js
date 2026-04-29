const BaseModel = require('./BaseModel');

class TimelineEvento extends BaseModel {
  static get tableName() {
    return 'timelineeventos';
  }

  static get idColumn() {
    return 'evento_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'timelineeventos.user_id',
          to: 'user.user_id'
        }
      },
      task: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Task'),
        join: {
          from: 'timelineeventos.task_id',
          to: 'task.task_id'
        }
      }
    };
  }
}

module.exports = TimelineEvento;
