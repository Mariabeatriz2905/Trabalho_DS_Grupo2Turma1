export interface SubmeterCaratDto {
    respostas: number[];
}

export interface CaratResponseDto {
    id: number;
    data: Date;
    scoreTotal: number;
    scoreRinite: number;
    scoreAsma: number;
    interpretacao: string;
    textoRecomendacao: string;
    alertasGerados: number;
    utente: { id: number; nif: string };
}

export interface CaratHistoricoDto {
    id: number;
    data: Date;
    scoreTotal: number;
    scoreRinite: number;
    scoreAsma: number;
    interpretacao: string;
}