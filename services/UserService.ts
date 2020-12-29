import Knex from "knex";
import tables from "./tables";
import { User } from "./models";
import { hashPassword } from "../hash";
import { USER_TYPES_IDS } from "../utils/variables";

export class UserService {
    constructor(private knex: Knex) {}

    async getUserInfo(userID: number) {
        // const userQuery = this.knex(tables.USERS).where("id", userID);
        // console.log(userQuery.toSQL());
        const user = await this.knex<User>(tables.USERS)
            .where("id", userID)
            .first();
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.knex<User>(tables.USERS)
            .where("email", email)
            .first();
        return user;
    }

    async createUser(displayName: string, email: string, password: string) {
        const hashedPassword = await hashPassword(password);
        const [userID] = await this.knex(tables.USERS)
            .insert({
                display_name: displayName,
                email,
                password: hashedPassword,
                user_types_id: USER_TYPES_IDS.NORMAL,
            })
            .returning("id");
        return userID;
    }
}
