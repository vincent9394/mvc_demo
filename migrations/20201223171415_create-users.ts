import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("user_types", (table) => {
        table.increments();
        table.string("type").notNullable();
        table.timestamps(false, true);
    });
    await knex.schema.createTable("users", (table) => {
        table.increments();
        table.string("display_name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.integer("user_types_id").unsigned().notNullable();
        table.foreign("user_types_id").references("user_types.id");
        table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
    await knex.schema.dropTable("user_types");
}
