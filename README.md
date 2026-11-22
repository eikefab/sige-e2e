# sige-e2e

Testes E2E e de API do SIGE.games com Cypress e Playwright.

## Equipe

* Eike Fabrício da Silva
* Matheus Alexandre Tenório Matta
* Hugo Alexandre dos Santos

## Reflexão

A principal dificuldade foi que a aplicação não tem atributos próprios para teste (como `data-testid`). Por isso, os seletores dependem de textos, classes CSS e da estrutura do HTML, e qualquer mudança visual pode quebrar os testes. Também foi preciso lidar com o tempo da interface: o atraso da busca (*debounce*) fazia o CAT-03 falhar no Cypress, que clica assim que o botão aparece. Isso revelou uma condição de corrida real no catálogo, que contornamos com uma espera explícita. Nos resultados ([RESULTADOS.md](RESULTADOS.md)), os dois frameworks cobriram os 38 cenários e passaram em todos. A diferença ficou na forma de trabalhar: o Playwright foi mais rápido (cerca de 26 s contra 68 s, por rodar em paralelo) e mais rigoroso com seletores ambíguos. O Cypress se destacou na depuração interativa, mostrando o log de cada comando ao lado da aplicação. Concluímos que os dois atendem bem a uma aplicação web como o SIGE: o Cypress favorece quem está aprendendo e depurando, e o Playwright é mais indicado para suítes grandes, execução em vários navegadores e integração contínua.

## Versões

| Ferramenta | Versão |
| ---------- | ------ |
| Node.js | 24.14 |
| npm | 11.11 |
| Docker / Docker Compose | 29.2 / 5.1 |
| Python | 3.12 |
| PostgreSQL (imagem Docker) | 16-alpine |
| Cypress | 16.3.0 (Electron 43) |
| Playwright | 1.65.1 (Chromium 159) |
| TypeScript | 7.0.2 |
| Prettier | 3.10.1 |

## 1. Rodar a aplicação

Clone a aplicação dentro deste repositório (`sige-e2e/`). As pastas `sige-backend/` e `sige-frontend/` já estão no `.gitignore`.

```bash
cd sige-e2e
git clone https://github.com/matheusmatta21/sige-backend
git clone https://github.com/HuugoAlexandre/sige-frontend
```

### Backend (`http://localhost:3000`)

```bash
cd sige-backend
npm install

# Banco de dados
docker compose up -d
echo 'DATABASE_URL="postgresql://postgres:12345678@localhost:5432/sige_game_sales"' > .env

# Carga do Video_Games.csv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python etl.py

# Cliente Prisma e servidor
npx prisma generate
npm run start:dev
```

### Frontend (`http://localhost:5173`)

Em outro terminal:

```bash
cd sige-frontend
npm install
npm run dev
```

## 2. Rodar os testes

Backend e frontend precisam estar no ar.

### Cypress

```bash
cd e2e-cypress
npm install
npm test               # todos os testes, headless (Electron)
npm run cy:open        # modo interativo
npm run test:api       # só os testes de API
npm run evidencias     # roda e salva um screenshot por cenário em ../evidencias/cypress/
npm run format         # formata o código com Prettier
```

### Playwright

```bash
cd e2e-playwright
npm install
npx playwright install chromium
npm test               # todos os testes, headless (Chromium)
npm run test:ui        # modo interativo
npm run test:api       # só os testes de API
npm run report         # relatório HTML da última execução
npm run evidencias     # roda e salva um screenshot por cenário em ../evidencias/playwright/
npm run format         # formata o código com Prettier
```

### Variáveis de ambiente

| Variável | Padrão | Uso |
| -------- | ------ | --- |
| `BASE_URL` | `http://localhost:5173` | Frontend |
| `API_URL` | `http://localhost:3000` | Backend (testes de API) |


