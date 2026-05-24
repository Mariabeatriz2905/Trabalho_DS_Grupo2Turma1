import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ erro: "Email e password são obrigatórios." });
                return;
            }

            const resultado = await service.login(email, password);
            res.json(resultado);
        } catch (err: any) {
            res.status(401).json({ erro: err.message });
        }
    }
}