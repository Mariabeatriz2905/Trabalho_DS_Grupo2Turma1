import { AppDataSource } from "../database/dados-locais";
import { Exame } from "../models/exame.entity";
import { Utente } from "../models/utente.entity";

export class ExameService {
    private exameRepo = AppDataSource.getRepository(Exame);
    private utenteRepo = AppDataSource.getRepository(Utente);

    async listarPorUtente(utenteId: number): Promise<Exame[]> {
        return this.exameRepo.find({
            where: { utente: { id: utenteId } },
            relations: { medico: true }
        });
    }

    async criar(utenteId: number, dados: {
        tipo: string;
        resultado?: string;
        data: string;
    }): Promise<Exame> {
        const utente = await this.utenteRepo.findOneBy({ id: utenteId });
        if (!utente) throw new Error("Utente não encontrado.");

        const exame = this.exameRepo.create({
            utente,
            tipo: dados.tipo,
            resultado: dados.resultado ?? null,
            data: dados.data
        });
        return this.exameRepo.save(exame);
    }
}

