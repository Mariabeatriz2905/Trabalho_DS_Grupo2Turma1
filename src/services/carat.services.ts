import { AppDataSource } from "../database/dados-locais";
import { AvaliacaoCarat } from "../models/avaliacaoCarat.entity";
import { Utente } from "../models/utente.entity";

export class CaratService {
    private caratRepository = AppDataSource.getRepository(AvaliacaoCarat);
    private utenteRepository = AppDataSource.getRepository(Utente);

    async calcularEGuardar(utenteId: number, respostas: number[]): Promise<AvaliacaoCarat> {
        const utente = await this.utenteRepository.findOneBy({ id: utenteId });
        if (!utente) {
            throw new Error("Utente não encontrado no sistema.");
        }

        if (!respostas || respostas.length === 0) {
            throw new Error("As respostas ao questionário não podem estar vazias.");
        }

        const scoreTotal = respostas.reduce((soma, nota) => soma + nota, 0);

        let interpretacao = "Controlado";
        let textoRecomendacao = "Continue com o plano de medicação atual. Repita o teste em 4 semanas.";

        if (scoreTotal < 16) {
            interpretacao = "Não Controlado";
            textoRecomendacao = "ALERTA: Controlo insuficiente! Marque uma consulta de revisão urgentemente.";
        } else if (scoreTotal >= 16 && scoreTotal < 24) {
            interpretacao = "Parcialmente Controlado";
            textoRecomendacao = "Atenção: Sintomas ligeiramente instáveis. Reforce as medidas de autocuidado.";
        }

        const novaAvaliacao = new AvaliacaoCarat();
        novaAvaliacao.utente = utente;
        novaAvaliacao.respostas = respostas.join(",");
        novaAvaliacao.scoreTotal = scoreTotal;
        novaAvaliacao.interpretacao = interpretacao;
        novaAvaliacao.textoRecomendacao = textoRecomendacao;

        return await this.caratRepository.save(novaAvaliacao);
    }

    async listarPorUtente(utenteId: number): Promise<AvaliacaoCarat[]> {
        return await this.caratRepository.find({
            where: { utente: { id: utenteId } },
            order: { data: "DESC" }
        });
    }
}