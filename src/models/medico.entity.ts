import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Utilizador } from "./utilizador.entity";

@Entity("medicos")
export class Medico {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    cedulaProfissional!: string;

    @Column()
    especialidade!: string;

    // Ligação direta ao Utilizador base
    @OneToOne(() => Utilizador, { onDelete: "CASCADE" })
    @JoinColumn()
    utilizador!: Utilizador;
}