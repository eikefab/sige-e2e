# Resultados - SIGE.games

Execução dos 38 testes do [CENARIOS.md](CENARIOS.md) em 24/11/2026.

## Execução final

| Grupo | Testes | Cypress | Playwright |
| ----- | -----: | ------- | ---------- |
| NAV - Navegação | 3 | 3 ✔ | 3 ✔ |
| OVR - Visão Geral | 2 | 2 ✔ | 2 ✔ |
| FIL - Filtros globais | 5 | 5 ✔ | 5 ✔ |
| BUS - Busca geral | 4 | 4 ✔ | 4 ✔ |
| CAT - Catálogo | 4 | 4 ✔ | 4 ✔ |
| DET - Detalhe do jogo | 3 | 3 ✔ | 3 ✔ |
| RNK - Rankings | 2 | 2 ✔ | 2 ✔ |
| MAP - Mapa de vendas | 2 | 2 ✔ | 2 ✔ |
| DRL - Painel de detalhamento | 3 | 3 ✔ | 3 ✔ |
| REL - Relatórios | 4 | 4 ✔ | 4 ✔ |
| API | 4 | 4 ✔ | 4 ✔ |
| MCK - Simulação de rede | 2 | 2 ✔ | 2 ✔ |
| **Total** | **38** | **38 ✔** | **38 ✔** |

## Tempo de execução

| | Cypress | Playwright |
| - | ------: | ---------: |
| Testes | 46 s | 26 s |
| Total (com inicialização) | 68 s | 26 s |
| Paralelismo | specs em série | 6 workers |

Antes desta execução, as duas suítes rodaram 3 vezes seguidas com os testes na versão final, e todas deram 38/38.

## Falhas encontradas durante o desenvolvimento

### CAT-03 - paginação do catálogo (Cypress)

- **Sintoma:** falhou em 4 de 5 execuções no Cypress. No Playwright, passou em todas.
- **Causa:** em `sige-frontend/src/pages/JogoCatalogPage.tsx`, o *debounce* da busca chama `setPage(1)` 200 ms depois que a página abre, mesmo sem nada digitado. Um clique em “Próxima” antes disso é desfeito. O Cypress clica assim que o botão aparece e cai nessa janela.
- **Classificação:** defeito da aplicação (condição de corrida). Um usuário rápido também é afetado.
- **Contorno no teste:** os dois frameworks esperam 300 ms antes de clicar.

### DET-01 - valor de vendas duplicado (Playwright)

- **Sintoma:** o Playwright falhou com *strict mode violation*, porque o texto `82,53 M un.` aparece em dois lugares da página.
- **Causa:** seletor ambíguo no teste. O Cypress (`cy.contains`) usou o primeiro elemento sem avisar.
- **Correção:** a asserção passou a apontar para o destaque “vendidas no mundo” nos dois frameworks.

### API-01 a API-04 - configuração (Cypress)

- **Sintoma:** a spec não carregava (`Cypress.env is not a function`).
- **Causa:** no Cypress 16, `Cypress.env()` foi substituído por `Cypress.expose()`.
- **Correção:** a variável passou para a chave `expose` do `cypress.config.ts`.
