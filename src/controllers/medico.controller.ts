import { Request, Response } from "express";
import { MedicoService } from "../services/medico.service";

const service = new MedicoService();

export class MedicoController {

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const medicos = await service.listarTodos();
            res.json(medicos);
        } catch (err: any) {
            res.status(500).json({ erro: err.message });
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const medico = await service.buscarPorId(Number(req.params["id"]));
            res.json(medico);
        } catch (err: any) {
            res.status(404).json({ erro: err.message });
        }
    }

    async criar(req: Request, res: Response): Promise<void> {
        try {
            const medico = await service.criar(req.body);
            res.status(201).json(medico);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }

    async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const medico = await service.atualizar(Number(req.params["id"]), req.body);
            res.json(medico);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }

    async desativar(req: Request, res: Response): Promise<void> {
        try {
            await service.desativar(Number(req.params["id"]));
            res.json({ mensagem: "Médico desativado com sucesso." });
        } catch (err: any) {
            res.status(404).json({ erro: err.message });
        }
    }
}
