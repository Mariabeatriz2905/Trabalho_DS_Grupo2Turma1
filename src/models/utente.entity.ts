import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Utilizador } from "./utilizador.entity";
import { Medico } from "./medico.entity";
import { AvaliacaoCarat } from "./avaliacaoCarat.entity";
import { Alerta } from "./alerta.entity";
import { Medicacao } from "./medicacao.entity";
import { Sintoma } from "./sintoma.entity";
import { Exame } from "./exame.entity";
import { NotaClinica } from "./notaClinica.entity";

@Entity("utentes")
export class Utente {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    id_utilizador!: number;

    @Column({ unique: true })
    nif!: string;

    @Column({ nullable: true, type: "varchar" })
    contacto!: string | null;

    @Column({ type: "date" })
    dataNascimento!: string;

    @ManyToOne(() => Utilizador)
    @JoinColumn({ name: "id_utilizador" })
    utilizador!: Utilizador;

    @ManyToOne(() => Medico, medico => medico.utentes, { nullable: true })
    medico!: Medico | null;

    @OneToMany(() => AvaliacaoCarat, avaliacao => avaliacao.utente, { cascade: true })
    avaliacoes!: AvaliacaoCarat[];

    @OneToMany(() => Alerta, alerta => alerta.utente, { cascade: true })
    alertas!: Alerta[];

    @OneToMany(() => Medicacao, med => med.utente, { cascade: true })
    medicacoes!: Medicacao[];

    @OneToMany(() => Sintoma, sintoma => sintoma.utente, { cascade: true })
    sintomas!: Sintoma[];

    @OneToMany(() => Exame, exame => exame.utente, { cascade: true })
    exames!: Exame[];

    @OneToMany(() => NotaClinica, nota => nota.utente, { cascade: true })
    notasClinicas!: NotaClinica[];
}