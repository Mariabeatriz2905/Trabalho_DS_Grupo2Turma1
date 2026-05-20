import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Utilizador } from "./utilizador.entity";
import { Utente } from "./utente.entity";
import { Alerta } from "./alerta.entity";
import { NotaClinica } from "./notaClinica.entity";
import { Exame } from "./exame.entity";

@Entity("medicos")
export class Medico {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    id_utilizador!: number;

    @Column({ nullable: true, type: "varchar" })
    especialidade!: string | null;

    @Column({ nullable: true, type: "varchar" })
    contacto!: string | null;

    @ManyToOne(() => Utilizador)
    @JoinColumn({ name: "id_utilizador" })
    utilizador!: Utilizador;

    @OneToMany(() => Utente, utente => utente.medico)
    utentes!: Utente[];

    @OneToMany(() => Alerta, alerta => alerta.medico)
    alertas!: Alerta[];

    @OneToMany(() => NotaClinica, nota => nota.medico)
    notasClinicas!: NotaClinica[];

    @OneToMany(() => Exame, exame => exame.medico)
    exames!: Exame[];
}