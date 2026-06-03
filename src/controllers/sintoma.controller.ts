import { Request, Response } from "express";
import { SintomaService } from "../services/sintoma.service";

const service = new SintomaService();

export class SintomaController {

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const utenteId = Number(req.params["id"]);
            const sintomas = await service.listarPorUtente(utenteId);
            res.json(sintomas);
        } catch (err: any) {
            res.status(500).json({ erro: err.message });
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const utenteId = Number(req.params["id"]);
            const sintoma = await service.criar(utenteId, req.body);
            res.status(201).json(sintoma);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }
}

