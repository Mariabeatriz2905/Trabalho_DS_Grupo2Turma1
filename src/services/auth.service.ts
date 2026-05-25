import { AppDataSource } from "../database/dados-locais";
import { Utilizador } from "../models/utilizador.entity";
import { Utente } from "../models/utente.entity";
import { Medico } from "../models/medico.entity";
import jwt from "jsonwebtoken";

const JWT_SECRET = "piac_secret_2026";

export class AuthService {
    private utilizadorRepo = AppDataSource.getRepository(Utilizador);

    async login(email: string, password: string): Promise<{ token: string; utilizador: object }> {
        const utilizador = await this.utilizadorRepo.findOneBy({ email });
        if (!utilizador) throw new Error("Email ou password incorretos.");

        if (utilizador.password !== password) throw new Error("Email ou password incorretos.");

        if (!utilizador.estado) throw new Error("Conta desativada. Contacte o administrador.");

        utilizador.ultimoAcesso = new Date();
        await this.utilizadorRepo.save(utilizador);

        const token = jwt.sign(
            { id: utilizador.id, email: utilizador.email, perfil: utilizador.perfil },
            JWT_SECRET,
            { expiresIn: "8h" }
        );

        // Buscar o id do utente/médico associado ao utilizador
        let perfilId: number | null = null;
        if (utilizador.perfil === "utente") {
            const utente = await AppDataSource.getRepository(Utente)
                .findOneBy({ id_utilizador: utilizador.id });
            perfilId = utente?.id ?? null;
        } else if (utilizador.perfil === "medico") {
            const medico = await AppDataSource.getRepository(Medico)
                .findOneBy({ id_utilizador: utilizador.id });
            perfilId = medico?.id ?? null;
        }

        return {
            token,
            utilizador: {
                id: utilizador.id,
                nome: utilizador.nome,
                email: utilizador.email,
                perfil: utilizador.perfil,
                perfilId
            }
        };
    }
}