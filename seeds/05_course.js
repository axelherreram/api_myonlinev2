/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('course').del();
  await knex('course').insert([
    { courseName: "Proyecto De Graduación I" },
    { courseName: "Proyecto De Graduación II" }
  ]);
};
