import { AppDataSource } from "../database/dados-locais";
import { NotaClinica } from "../models/notaClinica.entity";
import { Utente } from "../models/utente.entity";
import { Medico } from "../models/medico.entity";

export class NotaClinicaService {
    private repo = AppDataSource.getRepository(NotaClinica);

    async listarPorUtente(utenteId: number): Promise<NotaClinica[]> {
        return this.repo.find({
            where: { utente: { id: utenteId } },
            relations: { medico: true },
            order: { dataNota: "DESC" }
        });
    }

    async criar(utenteId: number, medicoId: number, descricao: string): Promise<NotaClinica> {
        const utente = await AppDataSource.getRepository(Utente).findOneBy({ id: utenteId });
        if (!utente) throw new Error("Utente não encontrado.");

        const medico = await AppDataSource.getRepository(Medico).findOneBy({ id: medicoId });
        if (!medico) throw new Error("Médico não encontrado.");

        const nota = this.repo.create({ utente, medico, descricao });
        return this.repo.save(nota);
    }
}