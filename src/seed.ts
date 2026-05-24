import 'reflect-metadata';
import { AppDataSource } from './database/dados-locais';
import { Utilizador } from './models/utilizador.entity';
import { Utente } from './models/utente.entity';
import { Medico } from './models/medico.entity';
import { Administrador } from './models/administrador.entity';
import { AvaliacaoCarat } from './models/avaliacaoCarat.entity';
import { Alerta } from './models/alerta.entity';
import { Medicacao } from './models/medicacao.entity';
import { Sintoma } from './models/sintoma.entity';

async function seed() {
    await AppDataSource.initialize();
    console.log("Base de dados ligada. A popular com dados simulados...");

    // ADMINISTRADOR
    const utilizadorAdmin = AppDataSource.getRepository(Utilizador).create({
        nome: "Admin PIAC",
        email: "admin@piac.pt",
        password: "admin123",
        perfil: "administrador",
        estado: true
    });
    await AppDataSource.getRepository(Utilizador).save(utilizadorAdmin);

    const admin = AppDataSource.getRepository(Administrador).create({
        id_utilizador: utilizadorAdmin.id,
        utilizador: utilizadorAdmin
    });
    await AppDataSource.getRepository(Administrador).save(admin);

    // MÉDICOS
    const utilizadorMedico1 = AppDataSource.getRepository(Utilizador).create({
        nome: "Dra. Ana Respiratória",
        email: "ana.respiratoria@piac.pt",
        password: "medico123",
        perfil: "medico",
        estado: true
    });
    await AppDataSource.getRepository(Utilizador).save(utilizadorMedico1);

    const medico1 = AppDataSource.getRepository(Medico).create({
        id_utilizador: utilizadorMedico1.id,
        utilizador: utilizadorMedico1,
        especialidade: "Pneumologia",
        contacto: "961000001"
    });
    await AppDataSource.getRepository(Medico).save(medico1);

    const utilizadorMedico2 = AppDataSource.getRepository(Utilizador).create({
        nome: "Dr. Carlos Imunoalergologia",
        email: "carlos.imuno@piac.pt",
        password: "medico123",
        perfil: "medico",
        estado: true
    });
    await AppDataSource.getRepository(Utilizador).save(utilizadorMedico2);

    const medico2 = AppDataSource.getRepository(Medico).create({
        id_utilizador: utilizadorMedico2.id,
        utilizador: utilizadorMedico2,
        especialidade: "Imunoalergologia",
        contacto: "961000002"
    });
    await AppDataSource.getRepository(Medico).save(medico2);

    // ===== UTENTES =====
    const utilizadorUtente1 = AppDataSource.getRepository(Utilizador).create({
        nome: "João Silva",
        email: "joao.silva@email.pt",
        password: "utente123",
        perfil: "utente",
        estado: true
    });
    await AppDataSource.getRepository(Utilizador).save(utilizadorUtente1);

    const utente1 = AppDataSource.getRepository(Utente).create({
        id_utilizador: utilizadorUtente1.id,
        utilizador: utilizadorUtente1,
        nif: "111111111",
        dataNascimento: "1985-03-15",
        contacto: "912000001",
        medico: medico1
    });
    await AppDataSource.getRepository(Utente).save(utente1);

    const utilizadorUtente2 = AppDataSource.getRepository(Utilizador).create({
        nome: "Maria Fernandes",
        email: "maria.fernandes@email.pt",
        password: "utente123",
        perfil: "utente",
        estado: true
    });
    await AppDataSource.getRepository(Utilizador).save(utilizadorUtente2);

    const utente2 = AppDataSource.getRepository(Utente).create({
        id_utilizador: utilizadorUtente2.id,
        utilizador: utilizadorUtente2,
        nif: "222222222",
        dataNascimento: "1992-07-22",
        contacto: "912000002",
        medico: medico1
    });
    await AppDataSource.getRepository(Utente).save(utente2);

    const utilizadorUtente3 = AppDataSource.getRepository(Utilizador).create({
        nome: "Pedro Costa",
        email: "pedro.costa@email.pt",
        password: "utente123",
        perfil: "utente",
        estado: true
    });
    await AppDataSource.getRepository(Utilizador).save(utilizadorUtente3);

    const utente3 = AppDataSource.getRepository(Utente).create({
        id_utilizador: utilizadorUtente3.id,
        utilizador: utilizadorUtente3,
        nif: "333333333",
        dataNascimento: "2001-11-05",
        contacto: "912000003",
        medico: medico2
    });
    await AppDataSource.getRepository(Utente).save(utente3);

    // ===== AVALIAÇÕES CARAT =====
    const avaliacao1 = AppDataSource.getRepository(AvaliacaoCarat).create({
        utente: utente1,
        respostas: "3,2,3,1,2,3,2,3,2,1",
        scoreTotal: 22,
        interpretacao: "Parcialmente Controlado",
        textoRecomendacao: "Atenção: Sintomas ligeiramente instáveis. Reforce as medidas de autocuidado."
    });
    await AppDataSource.getRepository(AvaliacaoCarat).save(avaliacao1);

    const avaliacao2 = AppDataSource.getRepository(AvaliacaoCarat).create({
        utente: utente1,
        respostas: "1,1,2,1,1,2,1,2,1,1",
        scoreTotal: 13,
        interpretacao: "Não Controlado",
        textoRecomendacao: "ALERTA: Controlo insuficiente! Marque uma consulta de revisão urgentemente."
    });
    await AppDataSource.getRepository(AvaliacaoCarat).save(avaliacao2);

    const avaliacao3 = AppDataSource.getRepository(AvaliacaoCarat).create({
        utente: utente2,
        respostas: "3,3,3,3,3,3,3,3,3,3",
        scoreTotal: 30,
        interpretacao: "Controlado",
        textoRecomendacao: "Continue com o plano de medicação atual. Repita o teste em 4 semanas."
    });
    await AppDataSource.getRepository(AvaliacaoCarat).save(avaliacao3);

    //  ALERTAS 
    const alerta1 = AppDataSource.getRepository(Alerta).create({
        utente: utente1,
        medico: medico1,
        tipo: "score_baixo",
        prioridade: "alta",
        estado: "NOVO",
        motivo: "Score CARAT de 13 — controlo insuficiente detectado."
    });
    await AppDataSource.getRepository(Alerta).save(alerta1);

    const alerta2 = AppDataSource.getRepository(Alerta).create({
        utente: utente1,
        medico: medico1,
        tipo: "deterioracao",
        prioridade: "critica",
        estado: "NOVO",
        motivo: "Deterioração de 9 pontos em relação à avaliação anterior."
    });
    await AppDataSource.getRepository(Alerta).save(alerta2);

    // MEDICAMENTOS
    const med1 = AppDataSource.getRepository(Medicacao).create({
        utente: utente1,
        nome: "Budesonida",
        dose: "200mcg",
        periodo: "2x dia"
    });
    await AppDataSource.getRepository(Medicacao).save(med1);

    const med2 = AppDataSource.getRepository(Medicacao).create({
        utente: utente2,
        nome: "Salbutamol",
        dose: "100mcg",
        periodo: "em SOS"
    });
    await AppDataSource.getRepository(Medicacao).save(med2);

    // SINTOMAS
    const sint1 = AppDataSource.getRepository(Sintoma).create({
        utente: utente1,
        descricao: "Pieira noturna frequente",
        dataAparecimento: "2026-04-01",
        intensidade: 4
    });
    await AppDataSource.getRepository(Sintoma).save(sint1);

    const sint2 = AppDataSource.getRepository(Sintoma).create({
        utente: utente2,
        descricao: "Espirros matinais",
        dataAparecimento: "2026-03-15",
        intensidade: 2
    });
    await AppDataSource.getRepository(Sintoma).save(sint2);

    console.log("Dados simulados inseridos com sucesso!");
    process.exit(0);
}

seed().catch((err) => {
    console.error("Erro ao popular a base de dados:", err);
    process.exit(1);
});