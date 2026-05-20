import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Utente } from "./utente.entity";
import { Medico } from "./medico.entity";

@Entity("notas_clinicas")
export class NotaClinica {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Utente, utente => utente.notasClinicas, { onDelete: "CASCADE" })
    utente!: Utente;

    @ManyToOne(() => Medico, medico => medico.notasClinicas)
    medico!: Medico;

    @Column({ type: "text" })
    descricao!: string;

    @CreateDateColumn()
    dataNota!: Date;
}