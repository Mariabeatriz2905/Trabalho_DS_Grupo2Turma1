import { AppDataSource } from "../database/dados-locais";
import { Sintoma } from "../models/sintoma.entity";
import { Utente } from "../models/utente.entity";

export class SintomaService {
    private sintomaRepo = AppDataSource.getRepository(Sintoma);
    private utenteRepo = AppDataSource.getRepository(Utente);

    async listarPorUtente(utenteId: number): Promise<Sintoma[]> {
        return this.sintomaRepo.find({
            where: { utente: { id: utenteId } },
            order: { dataAparecimento: "DESC" }
        });
    }

    async criar(utenteId: number, dados: {
        descricao: string;
        dataAparecimento: string;
        dataDesaparecimento?: string;
        intensidade: number;
    }): Promise<Sintoma> {
        const utente = await this.utenteRepo.findOneBy({ id: utenteId });
        if (!utente) throw new Error("Utente não encontrado.");

        if (dados.intensidade < 1 || dados.intensidade > 5) {
            throw new Error("Intensidade deve ser entre 1 e 5.");
        }

        const sintoma = this.sintomaRepo.create({
            utente,
            descricao: dados.descricao,
            dataAparecimento: dados.dataAparecimento,
            dataDesaparecimento: dados.dataDesaparecimento ?? null,
            intensidade: dados.intensidade
        });
        return this.sintomaRepo.save(sintoma);
    }
}

