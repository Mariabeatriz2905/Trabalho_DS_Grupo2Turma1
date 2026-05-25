import { Router, Request, Response } from "express";
import { MedicoController } from "../controllers/medico.controller";
import { autenticar, autorizar } from "../middleware/auth.middleware";

const routes = Router();
const controller = new MedicoController();

routes.get("/", autenticar, autorizar("administrador"), (req: Request, res: Response) =>
    controller.listar(req, res));

routes.get("/:id", autenticar, autorizar("medico", "administrador"), (req: Request, res: Response) =>
    controller.buscarPorId(req, res));

routes.post("/", autenticar, autorizar("administrador"), (req: Request, res: Response) =>
    controller.criar(req, res));

routes.put("/:id", autenticar, autorizar("medico", "administrador"), (req: Request, res: Response) =>
    controller.atualizar(req, res));

routes.delete("/:id", autenticar, autorizar("administrador"), (req: Request, res: Response) =>
    controller.desativar(req, res));

export default routes;