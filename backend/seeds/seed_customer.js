/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('customer_registration').del()
  await knex('customer_registration').insert([
    { name:'Mike', email: 'Mike@email.com', phone: '601712132113', national_id:'901111-11-1111', birth_of_date: '1990-11-11', address:'no2, jalan Ampang, 00600 KL', status_id: 1},
    { name:'Dona', email: 'Dona@email.com', phone: '601118844113', national_id:'902222-22-2222', birth_of_date: '1990-11-11', address:'no2, jalan Ampang, 00600 KL', status_id: 1},
    { name:'Jone', email: 'Jone@email.com', phone: '601145645323', national_id:'903333-33-3333', birth_of_date: '1990-11-11', address:'no2, jalan Ampang, 00600 KL', status_id: 1}
  ]);
};
