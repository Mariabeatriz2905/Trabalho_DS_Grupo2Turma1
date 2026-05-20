import { Router, Request, Response } from "express";
import { CaratController } from "../controllers/carat.controller";

const routes = Router();
const controller = new CaratController();

// Usamos uma arrow function completa para garantir que o 'req' e 'res' são passados corretamente
routes.post("/:id/carat", async (req: Request, res: Response) => {
    await controller.criar(req, res);
});

routes.get("/:id/carat", async (req: Request, res: Response) => {
    await controller.listar(req, res);
});

export default routes;