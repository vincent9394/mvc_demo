import Knex from "knex";
import tables from "./tables";
import { User } from "./models";

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
}
