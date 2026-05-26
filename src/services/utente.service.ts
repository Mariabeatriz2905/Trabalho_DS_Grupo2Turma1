import { AppDataSource } from "../database/dados-locais";
import { Utente } from "../models/utente.entity";
import { Utilizador } from "../models/utilizador.entity";

export class UtenteService {
    private utenteRepo = AppDataSource.getRepository(Utente);
    private utilizadorRepo = AppDataSource.getRepository(Utilizador);

    async listarTodos(): Promise<Utente[]> {
    return this.utenteRepo.find({ 
        relations: {
            utilizador: true,
            medico: true
        }
    });
}

  async buscarPorId(id: number): Promise<Utente> {
    const utente = await this.utenteRepo.findOne({
        where: { id },
        relations: {
            utilizador: true,
            medico: true,
            avaliacoes: true,
            medicacoes: true,
            sintomas: true
        }
    });
    if (!utente) throw new Error("Utente não encontrado.");
    return utente;
}

    async criar(dados: {
        nome: string;
        email: string;
        password: string;
        nif: string;
        dataNascimento: string;
        contacto?: string;
        medicoId?: number;
    }): Promise<Utente> {
        // Verificar se email já existe
        const emailExiste = await this.utilizadorRepo.findOneBy({ email: dados.email });
        if (emailExiste) throw new Error("Email já registado.");

        // Criar utilizador base
        const utilizador = this.utilizadorRepo.create({
            nome: dados.nome,
            email: dados.email,
            password: dados.password,
            perfil: "utente"
        });
        await this.utilizadorRepo.save(utilizador);

        // Criar utente associado
        const utente = this.utenteRepo.create({
            id_utilizador: utilizador.id,
            utilizador: utilizador,
            nif: dados.nif,
            dataNascimento: dados.dataNascimento,
            contacto: dados.contacto ?? null,
            medico: dados.medicoId ? { id: dados.medicoId } as any : null
        });
        return this.utenteRepo.save(utente);
    }

    async atualizar(id: number, dados: Partial<{ contacto: string; nome: string }>): Promise<Utente> {
        const utente = await this.buscarPorId(id);
        if (dados.contacto) utente.contacto = dados.contacto;
        if (dados.nome) utente.utilizador.nome = dados.nome;
        await this.utilizadorRepo.save(utente.utilizador);
        return this.utenteRepo.save(utente);
    }

    async desativar(id: number): Promise<void> {
        const utente = await this.buscarPorId(id);
        utente.utilizador.estado = false;
        await this.utilizadorRepo.save(utente.utilizador);
    }
}