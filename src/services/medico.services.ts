import { AppDataSource } from "../database/dados-locais";
import { Medico } from "../models/medico.entity";
import { Utilizador } from "../models/utilizador.entity";

export class MedicoService {
    private medicoRepo = AppDataSource.getRepository(Medico);
    private utilizadorRepo = AppDataSource.getRepository(Utilizador);

    async listarTodos(): Promise<Medico[]> {
        return this.medicoRepo.find({
            relations: {
                utilizador: true,
                utentes: true
            }
        });
    }

    async buscarPorId(id: number): Promise<Medico> {
        const medico = await this.medicoRepo.findOne({
            where: { id },
            relations: {
                utilizador: true,
                utentes: true,
                alertas: true
            }
        });
        if (!medico) throw new Error("Médico não encontrado.");
        return medico;
    }

    async criar(dados: {
        nome: string;
        email: string;
        password: string;
        especialidade?: string;
        contacto?: string;
    }): Promise<Medico> {
        const emailExiste = await this.utilizadorRepo.findOneBy({ email: dados.email });
        if (emailExiste) throw new Error("Email já registado.");

        const utilizador = this.utilizadorRepo.create({
            nome: dados.nome,
            email: dados.email,
            password: dados.password,
            perfil: "medico"
        });
        await this.utilizadorRepo.save(utilizador);

        const medico = this.medicoRepo.create({
            id_utilizador: utilizador.id,
            utilizador: utilizador,
            especialidade: dados.especialidade ?? null,
            contacto: dados.contacto ?? null
        });
        return this.medicoRepo.save(medico);
    }

    async atualizar(id: number, dados: Partial<{ especialidade: string; contacto: string; nome: string }>): Promise<Medico> {
        const medico = await this.buscarPorId(id);
        if (dados.especialidade) medico.especialidade = dados.especialidade;
        if (dados.contacto) medico.contacto = dados.contacto;
        if (dados.nome) medico.utilizador.nome = dados.nome;
        await this.utilizadorRepo.save(medico.utilizador);
        return this.medicoRepo.save(medico);
    }

    async desativar(id: number): Promise<void> {
        const medico = await this.buscarPorId(id);
        medico.utilizador.estado = false;
        await this.utilizadorRepo.save(medico.utilizador);
    }
}
