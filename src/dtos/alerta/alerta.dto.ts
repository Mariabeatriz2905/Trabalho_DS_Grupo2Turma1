export interface AlertaResponseDto {
    id: number;
    tipo: string;
    prioridade: string;
    estado: string;
    motivo: string;
    data: Date;
    utente: { id: number; nome: string; };
    medico: { id: number; nome: string; } | null;
}

export interface AtualizarAlertaDto {
    estado: "NOVO" | "VISTO" | "EM_SEGUIMENTO" | "FECHADO";
}