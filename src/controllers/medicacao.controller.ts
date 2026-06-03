import { Request, Response } from "express";
import { MedicacaoService } from "../services/medicacao.service";

const service = new MedicacaoService();

export class MedicacaoController {

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const utenteId = Number(req.params["id"]);
            const medicacoes = await service.listarPorUtente(utenteId);
            res.json(medicacoes);
        } catch (err: any) {
            res.status(500).json({ erro: err.message });
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const utenteId = Number(req.params["id"]);
            const medicacao = await service.criar(utenteId, req.body);
            res.status(201).json(medicacao);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }
}

