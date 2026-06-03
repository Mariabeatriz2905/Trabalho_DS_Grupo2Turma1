import { Router, Request, Response } from "express";
import { SintomaController } from "../controllers/sintoma.controller";
import { autenticar, autorizar } from "../middleware/auth.middleware";

const routes = Router();
const controller = new SintomaController();

routes.get("/utentes/:id/sintomas", autenticar,
    (req: Request, res: Response) => controller.listar(req, res));

routes.post("/utentes/:id/sintomas", autenticar, autorizar("utente", "medico", "administrador"),
    (req: Request, res: Response) => controller.criar(req, res));

export default routes;

