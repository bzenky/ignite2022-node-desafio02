import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meal-check-in', (table) => {
    table.uuid('id').primary();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("user_id").inTable("users").onDelete("CASCADE");
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.boolean('diet_meal').notNullable();
    table.date('meal_time').notNullable();
    table.timestamps(true, true);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meal-check-in');
}

