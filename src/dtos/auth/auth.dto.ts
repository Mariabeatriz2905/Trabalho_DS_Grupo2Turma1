export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    token: string;
    utilizador: {
        id: number;
        nome: string;
        email: string;
        perfil: string;
    };
}