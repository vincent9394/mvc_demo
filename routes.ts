import express from "express";
import { userController } from "./main";
import { isLoggedInAPI } from "./guards";

const routes = express.Router();
routes.get("/users/info", isLoggedInAPI, userController.getSelfInfo);
routes.post("/users/login", userController.login);
routes.post("/users", userController.register);

// if export default, no need to add {} in import
export default routes;
