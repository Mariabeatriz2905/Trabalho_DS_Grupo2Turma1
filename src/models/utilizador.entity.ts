import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { RegistoAuditoria } from "./registoAuditoria.entity";

@Entity("utilizadores")
export class Utilizador {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: true })
    estado!: boolean;        // true = ativo, false = bloqueado/desativado

    @Column({ type: "varchar", default: "utente" })
    perfil!: "utente" | "medico" | "administrador";

    @Column({ nullable: true, type: "datetime" })
    ultimoAcesso!: Date | null;

    @OneToMany(() => RegistoAuditoria, registo => registo.utilizador)
    registosAuditoria!: RegistoAuditoria[];
}
