import { AppDataSource } from "../database/dados-locais";
import { AvaliacaoCarat } from "../models/avaliacaoCarat.entity";
import { Utente } from "../models/utente.entity";

export class CaratService {
    private caratRepository = AppDataSource.getRepository(AvaliacaoCarat);
    private utenteRepository = AppDataSource.getRepository(Utente);

    // Método para calcular a pontuação e guardar na base de dados
    async calcularEGuardar(utenteId: number, respostas: number[]): Promise<AvaliacaoCarat> {
        // 1. Validar se o utente existe no sistema
        const utente = await this.utenteRepository.findOneBy({ id: utenteId });
        if (!utente) {
            throw new Error("Utente não encontrado no sistema.");
        }

        if (!respostas || respostas.length === 0) {
            throw new Error("As respostas ao questionário não podem estar vazias.");
        }

        // 2. Calcular a pontuação total (soma simples das respostas)
        const scoreTotal = respostas.reduce((soma, nota) => soma + nota, 0);

        // 3. Definir o nível de controlo e recomendações clínicas
        let nivelControlo = "Controlado";
        let recomendacoes = "Continue com o plano de medicação atual. Repita o teste em 4 semanas.";

        if (scoreTotal < 16) {
            nivelControlo = "Não Controlado";
            recomendacoes = "ALERTA: Controlo insuficiente! Marque uma consulta de revisão urgentemente.";
        } else if (scoreTotal >= 16 && scoreTotal < 24) {
            nivelControlo = "Parcialmente Controlado";
            recomendacoes = "Atenção: Sintomas ligeiramente instáveis. Reforce as medidas de autocuidado.";
        }

        // 4. Criar o registo e associar ao utente
        const novaAvaliacao = new AvaliacaoCarat();
        novaAvaliacao.utente = utente;
        novaAvaliacao.respostasString = respostas.join(","); // Guarda ex: "3,2,3,1"
        novaAvaliacao.scoreTotal = scoreTotal;
        novaAvaliacao.nivelControlo = nivelControlo;
        novaAvaliacao.textoRecomendacao = recomendacoes;

        // 5. Guardar permanentemente no SQLite
        return await this.caratRepository.save(novaAvaliacao);
    }

    // Método para listar todas as avaliações passadas de um utente específico
    async listarPorUtente(utenteId: number): Promise<AvaliacaoCarat[]> {
        return await this.caratRepository.find({
            where: { utente: { id: utenteId } },
            order: { data: "DESC" } // Mostra as mais recentes primeiro
        });
    }
}