/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('rolcomision').del();
  await knex('rolcomision').insert([
    { rolComisionName: "Presidente" },
    { rolComisionName: "Secretario" },
    { rolComisionName: "Vocal 1" },
    { rolComisionName: "Vocal 2" },
    { rolComisionName: "Vocal 3" }
  ]);
};
