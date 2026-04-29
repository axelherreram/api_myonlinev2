const Knex = require('knex');
const knexConfig = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[environment]);

module.exports = knex;