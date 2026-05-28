# PIAC — Plataforma Inteligente de Acompanhamento Clínico

Projeto desenvolvido no âmbito da unidade curricular de **Desenvolvimento de Software** — FMUP/SaudInob 2025/2026.

Sistema de monitorização de doenças respiratórias crónicas (asma e rinite) com questionário CARAT, alertas automáticos e dashboards clínicos.

## Tecnologias

- **Node.js v24** + **Express** — servidor e API REST
- **TypeScript** — linguagem principal
- **TypeORM** — ORM para base de dados
- **SQLite** (better-sqlite3) — base de dados persistente
- **JWT** (jsonwebtoken) — autenticação
- **React 18** (via CDN) — frontend
- **FHIR HL7** — interoperabilidade clínica

## Estrutura do Projeto
src/
├── controllers/       # Recebe pedidos HTTP
├── services/          # Lógica de negócio (motor CARAT, alertas)
├── routes/            # URLs da API
├── models/            # Entidades TypeORM (tabelas BD)
├── database/          # Configuração SQLite
├── middleware/        # Autenticação JWT
├── dtos/              # Contratos de entrada/saída
├── mappers/           # Conversão para FHIR
└── seed.ts            # Dados simulados
public/
├── index.html         # Login
├── utente.html        # Dashboard utente
├── medico.html        # Dashboard médico
└── admin.html         # Painel administrador
contracts/
├── auth.json          # Contrato de autenticação
├── utente.json        # Contrato de utentes
├── medico.json        # Contrato de médicos
├── carat.json         # Contrato do questionário CARAT
└── alerta.json        # Contrato de alertas

## Instalação e Execução

### Pré-requisitos
- Node.js v24 LTS
- npm

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/Mariabeatriz2905/Trabalho_DS_Grupo2Turma1.git
cd Trabalho_DS_Grupo2Turma1

# 2. Instalar dependências
npm install

# 3. Popular a base de dados com dados simulados
npx ts-node src/seed.ts

# 4. Arrancar o servidor
npx ts-node src/app.ts
```

O servidor fica disponível em **http://localhost:3000**

## Credenciais de Teste

| Perfil | Email | Password |
|--------|-------|----------|
| Administrador | admin@piac.pt | admin123 |
| Médico | ana.respiratoria@piac.pt | medico123 |
| Médico | carlos.imuno@piac.pt | medico123 |
| Utente | joao.silva@email.pt | utente123 |
| Utente | maria.fernandes@email.pt | utente123 |
| Utente | pedro.costa@email.pt | utente123 |

## Endpoints da API

### Autenticação
| Método | URL            | Descrição |
|--------|----------------|-----------|
| POST   | `/auth/login`  | Login     |

### Utentes
| Método | URL             | Descrição        | Perfil       |
|--------|-----------------|------------------|--------------|
| GET    | `/utentes`      | Listar utentes   | Admin/Médico |
| POST   | `/utentes`      | Criar utente     | Admin        |
| GET    | `/utentes/:id`  | Ver utente       | Admin/Médico |
| PATCH  | `/utentes/:id`  | Atualizar utente | Admin        |
| DELETE | `/utentes/:id`  | Desativar utente | Admin        |

### Médicos
| Método | URL            | Descrição        | Perfil       |
|--------|----------------|------------------|--------------|
| GET    | `/medicos`     | Listar médicos   | Admin        |
| POST   | `/medicos`     | Criar médico     | Admin        |
| GET    | `/medicos/:id` | Ver médico       | Admin/Médico |
| PATCH  | `/medicos/:id` | Atualizar médico | Admin/Médico |
| DELETE | `/medicos/:id` | Desativar médico | Admin        |

### CARAT
| Método | URL | Descrição | Perfil |
|--------|-----|-----------|--------|
| POST | `/utentes/:id/carat` | Submeter questionário | Utente/Médico/Admin |
| GET | `/utentes/:id/carat` | Histórico CARAT | Autenticado |
| GET | `/carat/:evalId` | Ver avaliação por ID | Autenticado |

### Alertas
| Método | URL | Descrição | Perfil |
|--------|-----|-----------|--------|
| GET | `/medicos/:id/alertas` | Alertas do médico | Médico/Admin |
| GET | `/utentes/:id/alertas` | Alertas do utente | Autenticado |
| PATCH | `/alertas/:id` | Atualizar estado | Médico/Admin |

### Notas Clínicas
| Método | URL | Descrição | Perfil |
|--------|-----|-----------|--------|
| POST | `/utentes/:id/notas` | Criar nota clínica | Médico |
| GET | `/utentes/:id/notas` | Ver notas do utente | Médico |

### Limiares
| Método | URL | Descrição | Perfil |
|--------|-----|-----------|--------|
| GET | `/limiares` | Ver limiares | Admin |
| POST | `/limiares` | Configurar limiares | Admin |

### FHIR
| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/fhir/observations` | Observações FHIR |
| GET | `/fhir/patients/:id` | Paciente FHIR |

## Motor CARAT

O questionário CARAT tem 10 perguntas com respostas de 1 a 3:

| Score | Nível de Controlo |
|-------|------------------|
| ≥ 24 v| Controlado |
| 16–23 | Parcialmente Controlado |
| < 16  |Não Controlado |

### Alertas Automáticos
- **Score baixo** — gerado quando score < 24
- **Deterioração** — gerado quando score baixa ≥ 4 pontos em relação à avaliação anterior

## Dados Simulados

Para resetar e popular a base de dados:

```bash
# Apagar a base de dados atual
del data.db

# Criar nova base de dados com dados simulados
npx ts-node src/seed.ts
```

## Grupo

- Ana Martins (202406218)
- Margarida Dias (202404212)
- Maria Beatriz Pinto (202405126)
- Matilde Pereira (202404476)

**Turma 1 | Grupo 2 | 2025/2026**