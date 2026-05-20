import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Utilizador } from "./utilizador.entity";

@Entity("administradores")
export class Administrador {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: "Geral" })
    departamento!: string;

    // Ligação direta ao Utilizador base
    @OneToOne(() => Utilizador, { onDelete: "CASCADE" })
    @JoinColumn()
    utilizador!: Utilizador;
}