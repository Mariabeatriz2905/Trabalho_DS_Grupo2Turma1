import { Router, Request, Response } from "express";
import { CaratController } from "../controllers/carat.controller";
import { autenticar, autorizar } from "../middleware/auth.middleware";

const routes = Router();
const controller = new CaratController();

routes.post("/utentes/:id/carat", autenticar, autorizar("utente", "medico", "administrador"),
    async (req: Request, res: Response) => { await controller.criar(req, res); });

routes.get("/utentes/:id/carat", autenticar,
    async (req: Request, res: Response) => { await controller.listar(req, res); });

routes.get("/carat/:evalId", autenticar,
    async (req: Request, res: Response) => { await controller.buscarPorId(req, res); });

export default routes;