import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";

const routes = Router();
const controller = new AuthController();

routes.post("/login", (req: Request, res: Response) => controller.login(req, res));

export default routes;