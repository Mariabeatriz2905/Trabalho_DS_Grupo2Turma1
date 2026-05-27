import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { Utente } from "./utente.entity";
import { Recomendacao } from "./recomendacao.entity";
import { Alerta } from "./alerta.entity";

@Entity("avaliacoes_carat")
export class AvaliacaoCarat {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Utente, utente => utente.avaliacoes, { onDelete: "CASCADE" })
    utente!: Utente;

    @CreateDateColumn()
    data!: Date;

    @Column({ type: "varchar" })
    respostas!: string;
    
    @Column({ type: "int" })
    scoreTotal!: number;

    @Column({ type: "int", nullable: true })
    scoreRinite!: number;
    
    @Column({ type: "int", nullable: true })
    scoreAsma!: number;
    
    @Column({ type: "varchar" })
    interpretacao!: string;
    
    @Column({ type: "text", nullable: true })
    observacoesClinicas!: string;

    @Column({ type: "text", nullable: true })
    textoRecomendacao!: string;

    @OneToMany(() => Recomendacao, rec => rec.avaliacao, { cascade: true })
    recomendacoes!: Recomendacao[];

    @OneToMany(() => Alerta, alerta => alerta.avaliacao, { cascade: true })
    alertasGerados!: Alerta[];

}