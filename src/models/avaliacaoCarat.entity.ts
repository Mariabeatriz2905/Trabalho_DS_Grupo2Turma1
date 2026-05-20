import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Utente } from "./utente.entity";

@Entity("avaliacoes_carat")
export class AvaliacaoCarat {

    @PrimaryGeneratedColumn()
    id!: number;

    // Esta é a propriedade que estava em falta e causava o erro no Utente!
    @ManyToOne(() => Utente, (utente) => utente.avaliacoes, { onDelete: "CASCADE" })
    utente!: Utente;

    @Column({ type: "varchar" })
    respostasString!: string; // Guarda as respostas separadas por vírgulas, ex: "3,2,1,3"

    @Column({ type: "int" })
    scoreTotal!: number;

    @Column({ type: "varchar" })
    nivelControlo!: string; // 'Controlado', 'Parcialmente Controlado' ou 'Não Controlado'

    @Column({ type: "text", nullable: true })
    recomendacoes!: string;

    @CreateDateColumn()
    data!: Date; // Regista automaticamente o dia e hora da submissão
}