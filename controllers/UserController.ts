import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { checkPassword } from "../hash";

export class UserController {
    constructor(private userService: UserService) {}

    getSelfInfo = async (req: Request, res: Response) => {
        try {
            const userID = req.session?.["user"].id;
            const user = await this.userService.getUserInfo(userID);
            if (user) {
                const { password, ...others } = user;
                res.json({ user: others });
                return;
            }
            res.json({ message: "cannot found user" }); // impossible
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    };

    // functionName = async (req: Request, res: Response) => {
    //     try {

    //     } catch (err) {
    //         console.error(err.message);
    //         res.status(500).json({ message: "internal server error" });
    //     }
    // };
    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            // Step 0: check if email / password empty
            //
            //

            // Step 1: get User by Email
            const user = await this.userService.getUserByEmail(email);

            // Step 2: check if User exist, if not exist, collect skin
            if (!user) {
                res.status(400).json({
                    message: "incorrect username or password",
                });
                return;
            }

            // Step 3: if user exist, check password
            if (await checkPassword(password, user.password)) {
                // password match
                if (req.session) {
                    req.session["user"] = {
                        id: user.id,
                    };
                }
                // return res.redirect("/home.html"); // localhost:8080/home.html
                res.json({ message: "success" });
            } else {
                // password does not match, collect skin again
                res.status(400).json({
                    message: "incorrect username or password",
                });
                return;
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    };

    register = async (req: Request, res: Response) => {
        try {
            console.log("this is register route");
            // step 1: get all info from req.body
            const { display_name, email, password } = req.body;

            // step 2: check if user exists
            const user = await this.userService.getUserByEmail(email);
            if (user) {
                res.status(400).json({
                    message: "duplicated user",
                });
                return;
            }

            // step 3: call create user function in userService
            const userID = await this.userService.createUser(
                display_name,
                email,
                password
            );

            // step 4: config session, (yau login)
            if (req.session) {
                req.session["user"] = {
                    id: userID,
                };
            }
            // return res.redirect("/home.html");

            // step 4: return success message (if mo login)
            res.json({ message: "create user success", user_id: userID });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    };
}
