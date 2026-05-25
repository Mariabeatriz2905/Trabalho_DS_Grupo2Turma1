export interface CreateMedicoDto {
    nome: string;
    email: string;
    password: string;
    especialidade?: string;
    contacto?: string;
}

export interface UpdateMedicoDto {
    nome?: string;
    especialidade?: string;
    contacto?: string;
}

export interface MedicoResponseDto {
    id: number;
    nome: string;
    email: string;
    especialidade: string | null;
    contacto: string | null;
    estado: boolean;
    totalUtentes: number;
}

export interface MedicoResumoDto {
    id: number;
    nome: string;
    especialidade: string | null;
}