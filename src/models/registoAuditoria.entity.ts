import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Utilizador } from "./utilizador.entity";

@Entity("registos_auditoria")
export class RegistoAuditoria {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Utilizador, utilizador => utilizador.registosAuditoria)
    utilizador!: Utilizador;

    @Column({ type: "varchar" })
    acao!: string;

    @Column({ type: "text", nullable: true })
    detalhes!: string | null;

    @CreateDateColumn()
    data!: Date;
}
