import { AppDataSource } from './database/dados-locais';
import utenteRoutes from './routes/utente.routes';
import express from 'express';
import path from 'path';
import medicoRoutes from './routes/medico.routes';
import caratRoutes from './routes/carat.routes';
import alertaRoutes from './routes/alerta.routes';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Base de dados ligada com sucesso!");

        app.use('/utentes', utenteRoutes);
        app.use('/medicos', medicoRoutes);
        app.use('/', caratRoutes);
        app.use('/', alertaRoutes);

        app.listen(3000, () => console.log("Servidor a correr na porta 3000"));
    })
    .catch((err) => {
        console.error("Erro ao ligar à base de dados:", err);
    });

export default app;