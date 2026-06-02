import { AppDataSource } from "../database/dados-locais";
import { Alerta } from "../models/alerta.entity";
import { Utente } from "../models/utente.entity";
import { Medico } from "../models/medico.entity";

export class AlertaService {
    private alertaRepo = AppDataSource.getRepository(Alerta);
    private utenteRepo = AppDataSource.getRepository(Utente);
    private medicoRepo = AppDataSource.getRepository(Medico);

    async listarPorMedico(medicoId: number): Promise<Alerta[]> {
        return this.alertaRepo.find({
            where: { medico: { id: medicoId } },
            relations: { utente: { utilizador: true }, medico: { utilizador: true } },
            order: { data: "DESC" }
        });
    }

    async listarPorUtente(utenteId: number): Promise<Alerta[]> {
        return this.alertaRepo.find({
            where: { utente: { id: utenteId } },
            relations: { utente: { utilizador: true }, medico: { utilizador: true } },
            order: { data: "DESC" }
        });
    }

    async atualizarEstado(id: number, estado: string): Promise<Alerta> {
        const alerta = await this.alertaRepo.findOneBy({ id });
        if (!alerta) throw new Error("Alerta não encontrado.");

        const estadosValidos = ["NOVO", "VISTO", "EM_SEGUIMENTO", "FECHADO"];
        if (!estadosValidos.includes(estado)) {
            throw new Error("Estado inválido. Use: NOVO, VISTO, EM_SEGUIMENTO ou FECHADO.");
        }

        alerta.estado = estado as "NOVO" | "VISTO" | "EM_SEGUIMENTO" | "FECHADO";
        return this.alertaRepo.save(alerta);
    }

    async criarAlerta(dados: {
        utenteId: number;
        medicoId: number;
        tipo: string;
        prioridade: string;
        motivo: string;
    }): Promise<Alerta> {
        const utente = await this.utenteRepo.findOneBy({ id: dados.utenteId });
        if (!utente) throw new Error("Utente não encontrado.");

        const medico = await this.medicoRepo.findOneBy({ id: dados.medicoId });
        if (!medico) throw new Error("Médico não encontrado.");

        const alerta = this.alertaRepo.create({
            utente,
            medico,
            tipo: dados.tipo as any,
            prioridade: dados.prioridade as any,
            estado: "NOVO",
            motivo: dados.motivo
        });
        return this.alertaRepo.save(alerta);
    }
}