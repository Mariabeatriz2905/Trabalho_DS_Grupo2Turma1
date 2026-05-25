export interface SubmeterCaratDto {
    respostas: number[];
}

export interface CaratResponseDto {
    id: number;
    data: Date;
    scoreTotal: number;
    interpretacao: string;
    textoRecomendacao: string;
    alertasGerados: number;
}

export interface CaratHistoricoDto {
    id: number;
    data: Date;
    scoreTotal: number;
    interpretacao: string;
}