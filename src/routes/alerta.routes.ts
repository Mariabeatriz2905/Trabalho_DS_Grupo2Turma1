import { Router, Request, Response } from "express";
import { AlertaController } from "../controllers/alerta.controller";
import { autenticar, autorizar } from "../middleware/auth.middleware";

const routes = Router();
const controller = new AlertaController();

routes.get("/medicos/:id/alertas", autenticar, autorizar("medico", "administrador"),
    (req: Request, res: Response) => controller.listarPorMedico(req, res));

routes.get("/utentes/:id/alertas", autenticar,
    (req: Request, res: Response) => controller.listarPorUtente(req, res));

routes.patch("/alertas/:id", autenticar, autorizar("medico", "administrador"),
    (req: Request, res: Response) => controller.atualizarEstado(req, res));

routes.post("/alertas", autenticar, autorizar("medico", "administrador"),
    (req: Request, res: Response) => controller.criar(req, res));


    export default routes;