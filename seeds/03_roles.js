/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del();
  await knex('roles').insert([
    { name: "Estudiante" },
    { name: "Catedrático" },
    { name: "Administrador" },
    { name: "Coordinador Sede" },
    { name: "Coordinador general" },
    { name: "Coordinador de tesis" },
    { name: "Revisor" }
  ]);
};
