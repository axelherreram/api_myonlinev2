const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class BaseModel extends Model {
  // Add common logic here
}

module.exports = BaseModel;