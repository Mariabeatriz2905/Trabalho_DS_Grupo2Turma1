import { Request, Response } from "express";
import { LimiarService } from "../services/limiar.service";

export class LimiarController {
    private service = new LimiarService();

    async listar(req: Request, res: Response): Promise<void> {
        const limiares = await this.service.listar();
        res.json(limiares);
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        const { chave } = req.params;
        const { valor } = req.body;
        if (typeof valor !== "number") {
            res.status(400).json({ erro: "O campo 'valor' deve ser um número." });
            return;
        }
        const limiar = await this.service.atualizar(chave as string, valor);
        res.json(limiar);
    }
}