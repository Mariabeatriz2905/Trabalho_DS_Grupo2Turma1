import { Request, Response } from "express";
import { CaratService } from "../services/carat.service";

export class CaratController {
    private service = new CaratService();

async criar(req: Request, res: Response): Promise<void> {
    try {
        const utenteId = Number(req.params["id"]);
        const { respostas } = req.body;

        if (!respostas || !Array.isArray(respostas)) {
            res.status(400).json({ erro: "Campo 'respostas' é obrigatório e deve ser um array." });
            return;
        }

        const avaliacao = await this.service.calcularEGuardar(utenteId, respostas);
        res.status(201).json(avaliacao);
    } catch (err: any) {
        res.status(400).json({ erro: err.message });
    }
}

async listar(req: Request, res: Response): Promise<void> {
    try {
        const utenteId = Number(req.params["id"]);
        const avaliacoes = await this.service.listarPorUtente(utenteId);
        res.json(avaliacoes);
    } catch (err: any) {
        res.status(500).json({ erro: err.message });
    }
}
}