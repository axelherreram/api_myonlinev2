const BaseModel = require('./BaseModel');

class CourseAssignment extends BaseModel {
  static get tableName() {
    return 'courseassignment';
  }

  static get idColumn() {
    return 'courseAssignment_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'courseassignment.student_id',
          to: 'user.user_id'
        }
      },
      asigCourse: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./CourseSedeAssignment'),
        join: {
          from: 'courseassignment.asigCourse_id',
          to: 'coursesedeassignment.asigCourse_id'
        }
      }
    };
  }
}

module.exports = CourseAssignment;
