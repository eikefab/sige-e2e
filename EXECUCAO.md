# Execução - SIGE.games

Evidências da execução de cada cenário do [CENARIOS.md](CENARIOS.md), capturadas ao final de cada teste.

- **Cypress:** captura do runner (aplicação + log de comandos e asserções).
- **Playwright:** captura da página ao final do cenário; nos testes de API, registro da requisição e da resposta.

Gerado com `npm run evidencias` em `e2e-cypress/` e em `e2e-playwright/`. As imagens ficam em [evidencias/](evidencias/).

## Navegação

### NAV-01 - Abrir a Visão Geral e verificar KPIs e contador de títulos

| Cypress | Playwright |
| ------- | ---------- |
| ![NAV-01 Cypress](evidencias/cypress/NAV-01.png) | ![NAV-01 Playwright](evidencias/playwright/NAV-01.png) |

### NAV-02 - Percorrer todas as páginas pelo menu

| Cypress | Playwright |
| ------- | ---------- |
| ![NAV-02 Cypress](evidencias/cypress/NAV-02.png) | ![NAV-02 Playwright](evidencias/playwright/NAV-02.png) |

### NAV-03 - Acessar `/jogo/999999`

| Cypress | Playwright |
| ------- | ---------- |
| ![NAV-03 Cypress](evidencias/cypress/NAV-03.png) | ![NAV-03 Playwright](evidencias/playwright/NAV-03.png) |

## Visão Geral

### OVR-01 - Comparar os KPIs exibidos com a resposta da API

| Cypress | Playwright |
| ------- | ---------- |
| ![OVR-01 Cypress](evidencias/cypress/OVR-01.png) | ![OVR-01 Playwright](evidencias/playwright/OVR-01.png) |

### OVR-02 - Clicar em uma região e fechar o painel com Esc

| Cypress | Playwright |
| ------- | ---------- |
| ![OVR-02 Cypress](evidencias/cypress/OVR-02.png) | ![OVR-02 Playwright](evidencias/playwright/OVR-02.png) |

## Filtros globais

### FIL-01 - Filtrar por publicadora

| Cypress | Playwright |
| ------- | ---------- |
| ![FIL-01 Cypress](evidencias/cypress/FIL-01.png) | ![FIL-01 Playwright](evidencias/playwright/FIL-01.png) |

### FIL-02 - Limpar filtros

| Cypress | Playwright |
| ------- | ---------- |
| ![FIL-02 Cypress](evidencias/cypress/FIL-02.png) | ![FIL-02 Playwright](evidencias/playwright/FIL-02.png) |

### FIL-03 - Recarregar a página com filtro aplicado

| Cypress | Playwright |
| ------- | ---------- |
| ![FIL-03 Cypress](evidencias/cypress/FIL-03.png) | ![FIL-03 Playwright](evidencias/playwright/FIL-03.png) |

### FIL-04 - Combinar filtros sem resultado

| Cypress | Playwright |
| ------- | ---------- |
| ![FIL-04 Cypress](evidencias/cypress/FIL-04.png) | ![FIL-04 Playwright](evidencias/playwright/FIL-04.png) |

### FIL-05 - Ajustar o ano pelo teclado no slider

| Cypress | Playwright |
| ------- | ---------- |
| ![FIL-05 Cypress](evidencias/cypress/FIL-05.png) | ![FIL-05 Playwright](evidencias/playwright/FIL-05.png) |

## Busca geral

### BUS-01 - Buscar um jogo e abrir o resultado

| Cypress | Playwright |
| ------- | ---------- |
| ![BUS-01 Cypress](evidencias/cypress/BUS-01.png) | ![BUS-01 Playwright](evidencias/playwright/BUS-01.png) |

### BUS-02 - Buscar uma publicadora e aplicá-la como filtro

| Cypress | Playwright |
| ------- | ---------- |
| ![BUS-02 Cypress](evidencias/cypress/BUS-02.png) | ![BUS-02 Playwright](evidencias/playwright/BUS-02.png) |

### BUS-03 - Buscar um termo inexistente

| Cypress | Playwright |
| ------- | ---------- |
| ![BUS-03 Cypress](evidencias/cypress/BUS-03.png) | ![BUS-03 Playwright](evidencias/playwright/BUS-03.png) |

### BUS-04 - Digitar apenas 1 caractere

| Cypress | Playwright |
| ------- | ---------- |
| ![BUS-04 Cypress](evidencias/cypress/BUS-04.png) | ![BUS-04 Playwright](evidencias/playwright/BUS-04.png) |

## Catálogo

### CAT-01 - Abrir o catálogo

| Cypress | Playwright |
| ------- | ---------- |
| ![CAT-01 Cypress](evidencias/cypress/CAT-01.png) | ![CAT-01 Playwright](evidencias/playwright/CAT-01.png) |

### CAT-02 - Filtrar por nome

| Cypress | Playwright |
| ------- | ---------- |
| ![CAT-02 Cypress](evidencias/cypress/CAT-02.png) | ![CAT-02 Playwright](evidencias/playwright/CAT-02.png) |

### CAT-03 - Avançar de página

| Cypress | Playwright |
| ------- | ---------- |
| ![CAT-03 Cypress](evidencias/cypress/CAT-03.png) | ![CAT-03 Playwright](evidencias/playwright/CAT-03.png) |

### CAT-04 - Clicar em um card

| Cypress | Playwright |
| ------- | ---------- |
| ![CAT-04 Cypress](evidencias/cypress/CAT-04.png) | ![CAT-04 Playwright](evidencias/playwright/CAT-04.png) |

## Detalhe do jogo

### DET-01 - Abrir a ficha de um jogo

| Cypress | Playwright |
| ------- | ---------- |
| ![DET-01 Cypress](evidencias/cypress/DET-01.png) | ![DET-01 Playwright](evidencias/playwright/DET-01.png) |

### DET-02 - Trocar de plataforma pelo chip

| Cypress | Playwright |
| ------- | ---------- |
| ![DET-02 Cypress](evidencias/cypress/DET-02.png) | ![DET-02 Playwright](evidencias/playwright/DET-02.png) |

### DET-03 - Voltar ao catálogo

| Cypress | Playwright |
| ------- | ---------- |
| ![DET-03 Cypress](evidencias/cypress/DET-03.png) | ![DET-03 Playwright](evidencias/playwright/DET-03.png) |

## Rankings

### RNK-01 - Alternar dimensão e Top N

| Cypress | Playwright |
| ------- | ---------- |
| ![RNK-01 Cypress](evidencias/cypress/RNK-01.png) | ![RNK-01 Playwright](evidencias/playwright/RNK-01.png) |

### RNK-02 - Clicar na tabela de publicadoras

| Cypress | Playwright |
| ------- | ---------- |
| ![RNK-02 Cypress](evidencias/cypress/RNK-02.png) | ![RNK-02 Playwright](evidencias/playwright/RNK-02.png) |

## Mapa de vendas

### MAP-01 - Abrir o mapa

| Cypress | Playwright |
| ------- | ---------- |
| ![MAP-01 Cypress](evidencias/cypress/MAP-01.png) | ![MAP-01 Playwright](evidencias/playwright/MAP-01.png) |

### MAP-02 - Clicar em uma célula do heatmap

| Cypress | Playwright |
| ------- | ---------- |
| ![MAP-02 Cypress](evidencias/cypress/MAP-02.png) | ![MAP-02 Playwright](evidencias/playwright/MAP-02.png) |

## Painel de detalhamento

### DRL-01 - Ordenar pela coluna JOGO

| Cypress | Playwright |
| ------- | ---------- |
| ![DRL-01 Cypress](evidencias/cypress/DRL-01.png) | ![DRL-01 Playwright](evidencias/playwright/DRL-01.png) |

### DRL-02 - Paginar no painel

| Cypress | Playwright |
| ------- | ---------- |
| ![DRL-02 Cypress](evidencias/cypress/DRL-02.png) | ![DRL-02 Playwright](evidencias/playwright/DRL-02.png) |

### DRL-03 - Clicar em um jogo do painel

| Cypress | Playwright |
| ------- | ---------- |
| ![DRL-03 Cypress](evidencias/cypress/DRL-03.png) | ![DRL-03 Playwright](evidencias/playwright/DRL-03.png) |

## Relatórios

### REL-01 - Editar o título

| Cypress | Playwright |
| ------- | ---------- |
| ![REL-01 Cypress](evidencias/cypress/REL-01.png) | ![REL-01 Playwright](evidencias/playwright/REL-01.png) |

### REL-02 - Ligar e desligar seções

| Cypress | Playwright |
| ------- | ---------- |
| ![REL-02 Cypress](evidencias/cypress/REL-02.png) | ![REL-02 Playwright](evidencias/playwright/REL-02.png) |

### REL-03 - Exportar CSV

| Cypress | Playwright |
| ------- | ---------- |
| ![REL-03 Cypress](evidencias/cypress/REL-03.png) | ![REL-03 Playwright](evidencias/playwright/REL-03.png) |

### REL-04 - Exportar PDF

| Cypress | Playwright |
| ------- | ---------- |
| ![REL-04 Cypress](evidencias/cypress/REL-04.png) | ![REL-04 Playwright](evidencias/playwright/REL-04.png) |

## API

### API-01 - `GET /games` com paginação

| Cypress | Playwright |
| ------- | ---------- |
| ![API-01 Cypress](evidencias/cypress/API-01.png) | ![API-01 Playwright](evidencias/playwright/API-01.png) |

### API-02 - `GET /games/999999`

| Cypress | Playwright |
| ------- | ---------- |
| ![API-02 Cypress](evidencias/cypress/API-02.png) | ![API-02 Playwright](evidencias/playwright/API-02.png) |

### API-03 - Parâmetros inválidos

| Cypress | Playwright |
| ------- | ---------- |
| ![API-03 Cypress](evidencias/cypress/API-03.png) | ![API-03 Playwright](evidencias/playwright/API-03.png) |

### API-04 - `GET /games/export`

| Cypress | Playwright |
| ------- | ---------- |
| ![API-04 Cypress](evidencias/cypress/API-04.png) | ![API-04 Playwright](evidencias/playwright/API-04.png) |

## Simulação de rede

### MCK-01 - Simular erro 500 na API

| Cypress | Playwright |
| ------- | ---------- |
| ![MCK-01 Cypress](evidencias/cypress/MCK-01.png) | ![MCK-01 Playwright](evidencias/playwright/MCK-01.png) |

### MCK-02 - Simular a resposta do catálogo

| Cypress | Playwright |
| ------- | ---------- |
| ![MCK-02 Cypress](evidencias/cypress/MCK-02.png) | ![MCK-02 Playwright](evidencias/playwright/MCK-02.png) |
