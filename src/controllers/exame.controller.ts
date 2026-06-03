import { Request, Response } from "express";
import { ExameService } from "../services/exame.service";

const service = new ExameService();

export class ExameController {

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const utenteId = Number(req.params["id"]);
            const exames = await service.listarPorUtente(utenteId);
            res.json(exames);
        } catch (err: any) {
            res.status(500).json({ erro: err.message });
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const utenteId = Number(req.params["id"]);
            const exame = await service.criar(utenteId, req.body);
            res.status(201).json(exame);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }
}

