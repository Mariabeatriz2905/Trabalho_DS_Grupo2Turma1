import { Router, Request, Response } from "express";
import { LimiarController } from "../controllers/limiar.controller";
import { autenticar, autorizar } from "../middleware/auth.middleware";

const routes = Router();
const controller = new LimiarController();

routes.get("/", autenticar, autorizar("administrador"),
    (req: Request, res: Response) => controller.listar(req, res));

routes.patch("/:chave", autenticar, autorizar("administrador"),
    (req: Request, res: Response) => controller.atualizar(req, res));

export default routes;