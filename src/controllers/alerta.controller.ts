import { Request, Response } from "express";
import { AlertaService } from "../services/alerta.service";

const service = new AlertaService();

export class AlertaController {

    async listarPorMedico(req: Request, res: Response): Promise<void> {
        try {
            const medicoId = Number(req.params["id"]);
            const alertas = await service.listarPorMedico(medicoId);
            res.json(alertas);
        } catch (err: any) {
            res.status(500).json({ erro: err.message });
        }
    }

    async listarPorUtente(req: Request, res: Response): Promise<void> {
        try {
            const utenteId = Number(req.params["id"]);
            const alertas = await service.listarPorUtente(utenteId);
            res.json(alertas);
        } catch (err: any) {
            res.status(500).json({ erro: err.message });
        }
    }

    async atualizarEstado(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params["id"]);
            const { estado } = req.body;
            if (!estado) {
                res.status(400).json({ erro: "Campo 'estado' é obrigatório." });
                return;
            }
            const alerta = await service.atualizarEstado(id, estado);
            res.json(alerta);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }
}