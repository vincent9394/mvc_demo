import * as Knex from "knex";
import { hashPassword } from "../hash";
import { USER_TYPES_IDS } from "../utils/variables";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_types").del();
    await knex("users").del();

    // Inserts seed entries
    const [adminID, normalID] = await knex("user_types")
        .insert([
            { id: USER_TYPES_IDS.ADMIN, type: "admin" },
            { id: USER_TYPES_IDS.NORMAL, type: "normal" },
        ])
        .returning("id");

    await knex("users").insert([
        {
            display_name: "jason",
            email: "jason@tecky.io",
            password: await hashPassword("1234"),
            user_types_id: adminID,
        },
        {
            display_name: "peter",
            email: "peter@tecky.io",
            password: await hashPassword("1234"),
            user_types_id: normalID,
        },
    ]);
}
