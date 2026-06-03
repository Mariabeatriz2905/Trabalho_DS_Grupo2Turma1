import { Router, Request, Response } from "express";
import { MedicacaoController } from "../controllers/medicacao.controller";
import { autenticar, autorizar } from "../middleware/auth.middleware";

const routes = Router();
const controller = new MedicacaoController();

routes.get("/utentes/:id/medicacao", autenticar,
    (req: Request, res: Response) => controller.listar(req, res));

routes.post("/utentes/:id/medicacao", autenticar, autorizar("medico", "administrador"),
    (req: Request, res: Response) => controller.criar(req, res));

export default routes;

