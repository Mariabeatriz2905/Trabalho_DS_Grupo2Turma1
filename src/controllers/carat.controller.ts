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
            if (respostas.length !== 10) {
                res.status(400).json({ erro: "O questionário CARAT requer exatamente 10 respostas." });
                return;
            }
            const invalidas = respostas.some((r: any) => typeof r !== "number" || r < 0 || r > 3);
            if (invalidas) {
                    res.status(400).json({ erro: "Cada resposta deve ser um número entre 0 e 3." });
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

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const evalId = Number(req.params["evalId"]);
            const avaliacao = await this.service.buscarPorId(evalId);
            res.json(avaliacao);
        } catch (err: any) {
            res.status(404).json({ erro: err.message });
        }
    }
}