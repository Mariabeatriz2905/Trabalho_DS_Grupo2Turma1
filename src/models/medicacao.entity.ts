import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Utente } from "./utente.entity";

@Entity("medicacoes")
export class Medicacao {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Utente, utente => utente.medicacoes, { onDelete: "CASCADE" })
    utente!: Utente;

    @Column()
    nome!: string;

    @Column({ nullable: true, type: "varchar" })
    dose!: string | null;

    @Column({ nullable: true, type: "varchar" })
    periodo!: string | null;
}