import { Router, Request, Response } from "express";
import { AlertaController } from "../controllers/alerta.controller";

const routes = Router();
const controller = new AlertaController();

routes.get("/medicos/:id/alertas", (req: Request, res: Response) => controller.listarPorMedico(req, res));
routes.get("/utentes/:id/alertas", (req: Request, res: Response) => controller.listarPorUtente(req, res));
routes.patch("/alertas/:id", (req: Request, res: Response) => controller.atualizarEstado(req, res));

export default routes;