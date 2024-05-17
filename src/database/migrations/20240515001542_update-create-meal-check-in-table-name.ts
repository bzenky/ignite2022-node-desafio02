import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.renameTable('meal-check-in', 'meals')
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.renameTable('meals', 'meal-check-in')
}
