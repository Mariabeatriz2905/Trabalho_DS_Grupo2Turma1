import { Request, Response } from "express";
import { NotaClinicaService } from "../services/notaClinica.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class NotaClinicaController {
    private service = new NotaClinicaService();

    async listar(req: Request, res: Response): Promise<void> {
        const utenteId = Number(req.params["utenteId"]);
        const notas = await this.service.listarPorUtente(utenteId);
        res.json(notas);
    }

    async criar(req: AuthRequest, res: Response): Promise<void> {
        const utenteId = Number(req.params["utenteId"]);
        const { descricao } = req.body;
        const medicoId = Number(req.params["medicoId"]);

        if (!descricao) {
            res.status(400).json({ erro: "O campo 'descricao' é obrigatório." });
            return;
        }

        const nota = await this.service.criar(utenteId, medicoId, descricao);
        res.status(201).json(nota);
    }
}