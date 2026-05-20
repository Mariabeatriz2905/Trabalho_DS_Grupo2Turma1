import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Utente } from "./utente.entity";
import { Medico } from "./medico.entity";

@Entity("exames")
export class Exame {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Utente, utente => utente.exames, { onDelete: "CASCADE" })
    utente!: Utente;

    @ManyToOne(() => Medico, medico => medico.exames, { nullable: true })
    medico!: Medico | null;

    @Column()
    tipo!: string;

    @Column({ nullable: true, type: "text" })
    resultado!: string | null;

    @Column({ type: "date" })
    data!: string;
}