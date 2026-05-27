import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { AppDataSource } from './database/dados-locais';
import utenteRoutes from './routes/utente.routes';
import medicoRoutes from './routes/medico.routes';
import caratRoutes from './routes/carat.routes';
import alertaRoutes from './routes/alerta.routes';
import authRoutes from './routes/auth.routes';
import fhirRoutes from './routes/fhir.routes';
import limiarRoutes from './routes/limiar.routes';
import notaClinicaRoutes from './routes/notaClinica.routes';


const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// Rotas públicas (sem autenticação)
app.use('/auth', authRoutes);

// Rotas protegidas
app.use('/utentes', utenteRoutes);
app.use('/medicos', medicoRoutes);
app.use('/', caratRoutes);
app.use('/', alertaRoutes);
app.use('/fhir', fhirRoutes);
app.use('/limiares', limiarRoutes);
app.use('/', notaClinicaRoutes);


AppDataSource.initialize()
    .then(() => {
        console.log("Base de dados ligada com sucesso!");
        app.listen(3000, () => console.log("Servidor PIAC a correr em http://localhost:3000"));
    })
    .catch((err) => {
        console.error("Erro ao ligar à base de dados:", err);
    });

export default app;