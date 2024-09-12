/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('customer_registration', function(table) {
        table.integer('status_id').unsigned().references('id').inTable('status_registration').onDelete('CASCADE').after('birth_of_date');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('customer_registration', function(table) {
        table.dropColumn('status_id');
    });
};
