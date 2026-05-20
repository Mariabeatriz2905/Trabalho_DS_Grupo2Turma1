import { DataSource } from "typeorm";
import { Utilizador } from "../models/utilizador.entity";
import { Utente } from "../models/utente.entity";
import { Medico } from "../models/medico.entity";
import { Administrador } from "../models/administrador.entity";
import { AvaliacaoCarat } from "../models/avaliacaoCarat.entity";
import { Alerta } from "../models/alerta.entity";
import { Recomendacao } from "../models/recomendacao.entity";
import { Medicacao } from "../models/medicacao.entity";
import { Sintoma } from "../models/sintoma.entity";
import { Exame } from "../models/exame.entity";
import { NotaClinica } from "../models/notaClinica.entity";
import { RegistoAuditoria } from "../models/registoAuditoria.entity";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "data.db",
    synchronize: true,      // cria/atualiza tabelas automaticamente
    logging: false,
    entities: [
        Utilizador,
        Utente,
        Medico,
        Administrador,
        AvaliacaoCarat,
        Alerta,
        Recomendacao,
        Medicacao,
        Sintoma,
        Exame,
        NotaClinica,
        RegistoAuditoria
    ],
});