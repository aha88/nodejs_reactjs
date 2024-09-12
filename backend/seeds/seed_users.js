const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('users').del();
  
  const users = [
    { id: 1, name: 'aizat', email: 'aizat@email.com', status: 'active',role_id: 1 },
  ];

  for (const user of users) {
    const passwordString = `${user.id}${user.name}${user.email}aizat`;
    const encryptedPassword = await bcrypt.hash(passwordString, 10); // 10 is the salt rounds


    // Insert the user with the encrypted password
    await knex('users').insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: encryptedPassword,  // Store the encrypted password
      status: user.status,
      role_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    });
  }
  
  
};
