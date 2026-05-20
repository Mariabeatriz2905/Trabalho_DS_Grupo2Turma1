import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { AvaliacaoCarat } from "./avaliacaoCarat.entity";

@Entity("recomendacoes")
export class Recomendacao {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text" })
    descricao!: string;

    @ManyToOne(() => AvaliacaoCarat, avaliacao => avaliacao.recomendacoes, { onDelete: "CASCADE" })
    avaliacao!: AvaliacaoCarat;
}