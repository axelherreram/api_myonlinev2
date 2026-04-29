/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('year').del();
  await knex('year').insert([
    { year: new Date().getFullYear() }
  ]);
};
