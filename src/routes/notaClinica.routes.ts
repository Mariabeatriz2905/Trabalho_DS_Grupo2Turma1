import { Router, Request, Response } from "express";
import { NotaClinicaController } from "../controllers/notaClinica.controller";
import { autenticar, autorizar } from "../middleware/auth.middleware";

const routes = Router();
const controller = new NotaClinicaController();

// GET /utentes/:utenteId/notas — médico e admin veem as notas
routes.get("/utentes/:utenteId/notas", autenticar, autorizar("medico", "administrador"),
    (req: Request, res: Response) => controller.listar(req, res));

// POST /medicos/:medicoId/utentes/:utenteId/notas — só o médico cria
routes.post("/medicos/:medicoId/utentes/:utenteId/notas", autenticar, autorizar("medico"),
    (req: Request, res: Response) => controller.criar(req, res));

export default routes;