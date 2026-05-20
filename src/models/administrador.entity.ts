import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Utilizador } from "./utilizador.entity";

@Entity("administradores")
export class Administrador {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    id_utilizador!: number;

    @ManyToOne(() => Utilizador)
    @JoinColumn({ name: "id_utilizador" })
    utilizador!: Utilizador;
}