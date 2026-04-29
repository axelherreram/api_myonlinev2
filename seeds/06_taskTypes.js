/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('typetask').del();
  await knex('typetask').insert([
    { name: "Entrega de propuesta" },
    { name: "Entrega de capitulo" }
  ]);
};
