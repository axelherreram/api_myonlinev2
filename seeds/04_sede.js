/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sede').del();
  
  const sedes = [
    "Amatitlán", 
    "Boca del Monte", 
    "Chinautla", 
    "La Florida, Zona 19", 
    "El Naranjo, Mixco",
    "Guastatoya", 
    "Sanarate", 
    "Chiquimula", 
    "Escuintla", 
    "Quetzaltenango"
  ];

  await knex('sede').insert(sedes.map(sede => ({ nameSede: sede })));
};
