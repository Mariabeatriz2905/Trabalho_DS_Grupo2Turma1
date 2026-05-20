import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Utente } from "./utente.entity";
import { Medico } from "./medico.entity";
import { AvaliacaoCarat } from "./avaliacaoCarat.entity";

@Entity("alertas")
export class Alerta {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Utente, utente => utente.alertas, { onDelete: "CASCADE" })
    utente!: Utente;

    @ManyToOne(() => Medico, medico => medico.alertas, { nullable: true })
    medico!: Medico | null;

    @ManyToOne(() => AvaliacaoCarat, { nullable: true })
    avaliacao!: AvaliacaoCarat | null;

    @Column({ type: "varchar" })
    tipo!: "score_baixo" | "deterioracao" | "revisao_terapeutica" | "indicacao_exames";

    @Column({ type: "varchar", default: "media" })
    prioridade!: "baixa" | "media" | "alta" | "critica";

    @Column({ type: "varchar", default: "NOVO" })
    estado!: "NOVO" | "VISTO" | "EM_SEGUIMENTO" | "FECHADO";

    @Column({ type: "text" })
    motivo!: string;

    @CreateDateColumn()
    data!: Date;
}