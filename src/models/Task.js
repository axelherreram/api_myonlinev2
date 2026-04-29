const BaseModel = require('./BaseModel');

class Task extends BaseModel {
  static get tableName() {
    return 'task';
  }

  static get idColumn() {
    return 'task_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      asigCourse: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./CourseSedeAssignment'),
        join: {
          from: 'task.asigCourse_id',
          to: 'coursesedeassignment.asigCourse_id'
        }
      },
      typeTask: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./TypeTask'),
        join: {
          from: 'task.typeTask_id',
          to: 'typetask.typeTask_id'
        }
      }
    };
  }
}

module.exports = Task;
