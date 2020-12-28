import { UserService } from "../services/UserService";
import { Request, Response } from "express";

export class UserController {
    constructor(private userService: UserService) {}

    getSelfInfo = async (req: Request, res: Response) => {
        const userID = req.session?.["user"].userID;
        const user = await this.userService.getUserInfo(userID);
        res.json({ user });
    };
}
