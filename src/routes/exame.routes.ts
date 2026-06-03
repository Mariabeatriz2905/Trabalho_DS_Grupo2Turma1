import { Router, Request, Response } from "express";
import { ExameController } from "../controllers/exame.controller";
import { autenticar, autorizar } from "../middleware/auth.middleware";

const routes = Router();
const controller = new ExameController();

routes.get("/utentes/:id/exames", autenticar,
    (req: Request, res: Response) => controller.listar(req, res));

routes.post("/utentes/:id/exames", autenticar, autorizar("medico", "administrador"),
    (req: Request, res: Response) => controller.criar(req, res));

export default routes;

