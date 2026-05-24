import { Router, Request, Response } from "express";
import { CaratController } from "../controllers/carat.controller";

const routes = Router();
const controller = new CaratController();

routes.post("/utentes/:id/carat", async (req: Request, res: Response) => {
    await controller.criar(req, res);
});

routes.get("/utentes/:id/carat", async (req: Request, res: Response) => {
    await controller.listar(req, res);
});

export default routes;