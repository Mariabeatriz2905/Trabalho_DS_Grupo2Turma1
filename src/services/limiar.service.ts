import { AppDataSource } from "../database/dados-locais";
import { LimiarAlerta } from "../models/limiarAlerta.entity";

export class LimiarService {
    private repo = AppDataSource.getRepository(LimiarAlerta);

    async listar(): Promise<LimiarAlerta[]> {
        return this.repo.find();
    }

    async atualizar(chave: string, valor: number): Promise<LimiarAlerta> {
        let limiar = await this.repo.findOneBy({ chave });
        if (!limiar) {
            limiar = this.repo.create({ chave, valor });
        } else {
            limiar.valor = valor;
        }
        return this.repo.save(limiar);
    }

    async buscarValor(chave: string, valorPadrao: number): Promise<number> {
        const limiar = await this.repo.findOneBy({ chave });
        return limiar?.valor ?? valorPadrao;
    }
}