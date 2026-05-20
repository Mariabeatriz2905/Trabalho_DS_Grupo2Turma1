import express from 'express';
import path from 'path';
import { AppDataSource } from './database/dados-locais';
import caratRoutes from './routes/carat.routes';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// Inicializar a Base de Dados
AppDataSource.initialize()
    .then(() => {
        console.log("Base de dados SQLite inicializada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro ao ligar à base de dados:", error);
    });

// Rotas
app.use("/patients", caratRoutes);

app.listen(3000, () => {
    console.log("Servidor a correr com sucesso na porta 3000!");
});

export default app;