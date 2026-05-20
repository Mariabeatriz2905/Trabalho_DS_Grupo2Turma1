import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Utente } from "./utente.entity";

@Entity("sintomas")
export class Sintoma {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Utente, utente => utente.sintomas, { onDelete: "CASCADE" })
    utente!: Utente;

    @Column({ type: "text" })
    descricao!: string;

    @Column({ type: "date" })
    dataAparecimento!: string;

    @Column({ nullable: true, type: "date" })
    dataDesaparecimento!: string | null;

    @Column({ type: "int", default: 1 })
    intensidade!: number;
}