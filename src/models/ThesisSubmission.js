const BaseModel = require('./BaseModel');

class ThesisSubmission extends BaseModel {
  static get tableName() {
    return 'thesissubmissions';
  }

  static get idColumn() {
    return 'thesisSubmissions_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'thesissubmissions.user_id',
          to: 'user.user_id'
        }
      },
      task: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Task'),
        join: {
          from: 'thesissubmissions.task_id',
          to: 'task.task_id'
        }
      }
    };
  }
}

module.exports = ThesisSubmission;
