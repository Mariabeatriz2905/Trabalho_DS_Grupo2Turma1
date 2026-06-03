import { AppDataSource } from "../database/dados-locais";
import { Medicacao } from "../models/medicacao.entity";
import { Utente } from "../models/utente.entity";

export class MedicacaoService {
    private medicacaoRepo = AppDataSource.getRepository(Medicacao);
    private utenteRepo = AppDataSource.getRepository(Utente);

    async listarPorUtente(utenteId: number): Promise<Medicacao[]> {
        return this.medicacaoRepo.find({
            where: { utente: { id: utenteId } }
        });
    }

    async criar(utenteId: number, dados: {
        nome: string;
        dose?: string;
        periodo?: string;
    }): Promise<Medicacao> {
        const utente = await this.utenteRepo.findOneBy({ id: utenteId });
        if (!utente) throw new Error("Utente não encontrado.");

        const medicacao = this.medicacaoRepo.create({
            utente,
            nome: dados.nome,
            dose: dados.dose ?? null,
            periodo: dados.periodo ?? null
        });
        return this.medicacaoRepo.save(medicacao);
    }
}

