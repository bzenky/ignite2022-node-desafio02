import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meal-check-in', (table) => {
    table.uuid('id').primary();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("user_id").inTable("users").onDelete("CASCADE");
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.boolean('diet_meal').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meal-check-in');
}

