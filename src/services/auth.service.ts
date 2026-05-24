import { AppDataSource } from "../database/dados-locais";
import { Utilizador } from "../models/utilizador.entity";
import jwt from "jsonwebtoken";

const JWT_SECRET = "piac_secret_2026";

export class AuthService {
    private utilizadorRepo = AppDataSource.getRepository(Utilizador);

    async login(email: string, password: string): Promise<{ token: string; utilizador: object }> {
        //Verificar se o utilizador existe
        const utilizador = await this.utilizadorRepo.findOneBy({ email });
        if (!utilizador) throw new Error("Email ou password incorretos.");

        // Verificar password
        if (utilizador.password !== password) throw new Error("Email ou password incorretos.");

        // Verificar se a conta está ativa
        if (!utilizador.estado) throw new Error("Conta desativada. Contacte o administrador.");

        // Atualizar último acesso
        utilizador.ultimoAcesso = new Date();
        await this.utilizadorRepo.save(utilizador);

        // 5. Gerar token
        const token = jwt.sign(
            { id: utilizador.id, email: utilizador.email, perfil: utilizador.perfil },
            JWT_SECRET,
            { expiresIn: "8h" }
        );

        return {
            token,
            utilizador: {
                id: utilizador.id,
                nome: utilizador.nome,
                email: utilizador.email,
                perfil: utilizador.perfil
            }
        };
    }
}