import express from "express";
import { userController } from "./main";

const routes = express.Router();
routes.get("/users/info", userController.getSelfInfo);

// if export default, no need to add {} in import
export default routes;
