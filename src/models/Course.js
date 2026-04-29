const BaseModel = require('./BaseModel');

class Course extends BaseModel {
  static get tableName() {
    return 'course';
  }

  static get idColumn() {
    return 'course_id';
  }
}

module.exports = Course;
