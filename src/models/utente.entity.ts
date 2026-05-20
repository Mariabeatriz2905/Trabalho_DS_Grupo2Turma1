import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Utilizador } from "./utilizador.entity";
import { AvaliacaoCarat } from "./avaliacaoCarat.entity";

@Entity("utentes")
export class Utente {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true, length: 9 })
    nus!: string; // Número de Utente de Saúde (9 dígitos)

    @Column({ type: "date" })
    dataNascimento!: Date;

    @Column({ type: "varchar" })
    genero!: "masculino" | "feminino" | "outro";

    @Column({ nullable: true })
    telefone!: string;

    // Ligação direta ao Utilizador base
    @OneToOne(() => Utilizador, { onDelete: "CASCADE" })
    @JoinColumn()
    utilizador!: Utilizador;

    // Histórico de questionários CARAT que este utente realizou
    @OneToMany(() => AvaliacaoCarat, (avaliacao) => avaliacao.utente)
    avaliacoes!: AvaliacaoCarat[];
}