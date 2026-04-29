const BaseModel = require('./BaseModel');

class CourseSedeAssignment extends BaseModel {
  static get tableName() {
    return 'coursesedeassignment';
  }

  static get idColumn() {
    return 'asigCourse_id';
  }
  static get relationMappings() {
    const Model = require('objection').Model;
    return {
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Course'),
        join: {
          from: 'coursesedeassignment.course_id',
          to: 'course.course_id'
        }
      },
      sede: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Sede'),
        join: {
          from: 'coursesedeassignment.sede_id',
          to: 'sede.sede_id'
        }
      },
      year: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Year'),
        join: {
          from: 'coursesedeassignment.year_id',
          to: 'year.year_id'
        }
      }
    };
  }
}

module.exports = CourseSedeAssignment;
