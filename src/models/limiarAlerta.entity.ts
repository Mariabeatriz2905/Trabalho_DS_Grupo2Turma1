import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("limiares_alerta")
export class LimiarAlerta {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", unique: true })
    chave!: string;  // ex: "LIMIAR_NAO_CONTROLADO", "LIMIAR_PARCIAL", "LIMIAR_DETERIORACAO"

    @Column({ type: "int" })
    valor!: number;

    @Column({ type: "varchar", nullable: true })
    descricao!: string;
}