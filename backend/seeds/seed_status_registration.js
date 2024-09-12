/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('status_registration').del()
  await knex('status_registration').insert([
    { name: 'Pending'},
    { name: 'Approved'},
    { name: 'Rejected'},
  ]);
};
