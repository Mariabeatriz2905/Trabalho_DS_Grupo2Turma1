import { Request, Response } from "express";
import { UtenteService } from "../services/utente.services";

const service = new UtenteService();

export class UtenteController {

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const utentes = await service.listarTodos();
            res.json(utentes);
        } catch (err: any) {
            res.status(500).json({ erro: err.message });
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const utente = await service.buscarPorId(Number(req.params["id"]));
            res.json(utente);
        } catch (err: any) {
            res.status(404).json({ erro: err.message });
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const utente = await service.criar(req.body);
            res.status(201).json(utente);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const utente = await service.atualizar(Number(req.params["id"]), req.body);
            res.json(utente);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }

    async desativar(req: Request, res: Response): Promise<void> {
        try {
            await service.desativar(Number(req.params["id"]));
            res.json({ mensagem: "Utente desativado com sucesso." });
        } catch (err: any) {
            res.status(404).json({ erro: err.message });
        }
    }
}