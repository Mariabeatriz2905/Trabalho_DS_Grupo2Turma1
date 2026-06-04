import { AppDataSource } from "../database/dados-locais";
import { AvaliacaoCarat } from "../models/avaliacaoCarat.entity";
import { Utente } from "../models/utente.entity";
import { Alerta } from "../models/alerta.entity";

const LIMIAR_NAO_CONTROLADO = 16;
const LIMIAR_PARCIAL = 24;
const LIMIAR_DETERIORACAO = 4;

export class CaratService {
    private caratRepository = AppDataSource.getRepository(AvaliacaoCarat);
    private utenteRepository = AppDataSource.getRepository(Utente);
    private alertaRepository = AppDataSource.getRepository(Alerta);

    async calcularEGuardar(utenteId: number, respostas: number[]): Promise<AvaliacaoCarat> {
        const utente = await this.utenteRepository.findOne({
            where: { id: utenteId },
            relations: { medico: true }
        });
        if (!utente) throw new Error("Utente não encontrado no sistema.");

        const scoreTotal = respostas.reduce((soma, nota) => soma + nota, 0);

        // RF09 — sub-scores: perguntas 1-4 = rinite, 5-10 = asma
    const scoreRinite = respostas.slice(0, 4).reduce((s, n) => s + n, 0);
    const scoreAsma   = respostas.slice(4, 10).reduce((s, n) => s + n, 0);


        let interpretacao = "Controlado";
        let textoRecomendacao = "Continue com o plano de medicação atual. Repita o teste em 4 semanas.";

        if (scoreTotal < LIMIAR_NAO_CONTROLADO) {
            interpretacao = "Não Controlado";
            textoRecomendacao = "ALERTA: Controlo insuficiente! Marque uma consulta de revisão urgentemente.";
        } else if (scoreTotal < LIMIAR_PARCIAL) {
            interpretacao = "Parcialmente Controlado";
            textoRecomendacao = "Atenção: Sintomas ligeiramente instáveis. Reforce as medidas de autocuidado.";
        }

        const novaAvaliacao = this.caratRepository.create({
            utente,
            respostas: respostas.join(","),
            scoreTotal,
            scoreRinite,
            scoreAsma,
            interpretacao,
            textoRecomendacao
        });

        const avaliacaoGuardada = await this.caratRepository.save(novaAvaliacao);
        await this.gerarAlertasAutomaticos(utente, avaliacaoGuardada, scoreTotal);
        return avaliacaoGuardada;
    }
    // Lógica de cálculo e geração de alertas baseada em limiares clínicos
    private async gerarAlertasAutomaticos(
        utente: Utente,
        avaliacao: AvaliacaoCarat,
        scoreAtual: number
    ): Promise<void> {
        const medico = utente.medico ?? null;

        // Alerta por Score Baixo (Doença Não Controlada)
        if (scoreAtual < LIMIAR_NAO_CONTROLADO) {
            await this.alertaRepository.save(this.alertaRepository.create({
                utente, medico, avaliacao,
                tipo: "score_baixo", prioridade: "alta", estado: "NOVO",
                motivo: `Score CARAT de ${scoreAtual} indica doença NÃO CONTROLADA (limiar: ${LIMIAR_NAO_CONTROLADO}). Revisão urgente necessária.`
            }));
        } else if (scoreAtual < LIMIAR_PARCIAL) {
            await this.alertaRepository.save(this.alertaRepository.create({
                utente, medico, avaliacao,
                tipo: "score_baixo", prioridade: "media", estado: "NOVO",
                motivo: `Score CARAT de ${scoreAtual} indica doença PARCIALMENTE CONTROLADA. Recomenda-se revisão terapêutica.`
            }));
        }
        // Alerta por Deterioração (Queda significativa face à avaliação anterior)
        const todasAvaliacoes = await this.caratRepository.find({
            where: { utente: { id: utente.id } },
            order: { data: "DESC" },
            take: 2
        });
        const avaliacaoAnterior = todasAvaliacoes[1] ?? null;

        if (avaliacaoAnterior) {
            const queda = avaliacaoAnterior.scoreTotal - scoreAtual;
            if (queda >= LIMIAR_DETERIORACAO) {
                await this.alertaRepository.save(this.alertaRepository.create({
                    utente, medico, avaliacao,
                    tipo: "deterioracao",
                    prioridade: queda >= 8 ? "critica" : "alta",
                    estado: "NOVO",
                    motivo: `Deterioração clínica: score baixou ${queda} pontos (de ${avaliacaoAnterior.scoreTotal} para ${scoreAtual}).`
                }));
            }
        }
    }

    async listarPorUtente(utenteId: number): Promise<AvaliacaoCarat[]> {
        return this.caratRepository.find({
         where: { utente: { id: utenteId } },
         relations: { utente: true },
         order: { data: "DESC" }
        });
    }

    async buscarPorId(id: number): Promise<AvaliacaoCarat> {
        const avaliacao = await this.caratRepository.findOne({
            where: { id },
            relations: { utente: true }
        });
        if (!avaliacao) throw new Error("Avaliação CARAT não encontrada.");
        return avaliacao;
    }
}