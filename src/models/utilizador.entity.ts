import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
    estado!: boolean;

    @Column({ type: "varchar", default: "utente" })
    perfil!: "utente" | "medico" | "administrador";

    @Column({ nullable: true, type: "simple-json" })
    ultimoAcesso!: Date | null;
}