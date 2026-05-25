export interface CreateUtenteDto {
    nome: string;
    email: string;
    password: string;
    nif: string;
    dataNascimento: string;
    contacto?: string;
}

export interface UpdateUtenteDto {
    nome?: string;
    contacto?: string;
}

export interface UtenteResponseDto {
    id: number;
    nome: string;
    email: string;
    nif: string;
    dataNascimento: string;
    contacto: string | null;
    estado: boolean;
    medico: { id: number; nome: string; especialidade: string | null; } | null;
}

export interface UtenteResumoDto {
    id: number;
    nome: string;
    email: string;
    nif: string;
    estado: boolean;
}