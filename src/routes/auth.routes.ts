import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";

const routes = Router();
const controller = new AuthController();

routes.post("/login", (req: Request, res: Response) => controller.login(req, res));

routes.post("/recuperar-password", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ erro: "Email obrigatório." });
    res.json({ mensagem: `Email de recuperação enviado para ${email} (simulado).` });
});

export default routes;