# Cenários de Teste - SIGE.games

Testes executados igualmente em Cypress (`e2e-cypress/`) e Playwright (`e2e-playwright/`).

## Navegação

| ID | Teste | Motivação |
| -- | ----- | --------- |
| NAV-01 | Abrir a Visão Geral e verificar KPIs e contador de títulos | Garantir que a tela inicial carrega dados da API |
| NAV-02 | Percorrer todas as páginas pelo menu | Validar rotas e indicação do link ativo |
| NAV-03 | Acessar `/jogo/999999` | Verificar o tratamento de jogo inexistente |

## Visão Geral

| ID | Teste | Motivação |
| -- | ----- | --------- |
| OVR-01 | Comparar os KPIs exibidos com a resposta da API | Garantir que os valores mostrados são os retornados, com a formatação correta |
| OVR-02 | Clicar em uma região e fechar o painel com Esc | Validar a abertura do detalhamento e seu fechamento por teclado |

## Filtros globais

| ID | Teste | Motivação |
| -- | ----- | --------- |
| FIL-01 | Filtrar por publicadora | Verificar que o filtro chega à API e altera a contagem |
| FIL-02 | Limpar filtros | Garantir o retorno ao estado inicial |
| FIL-03 | Recarregar a página com filtro aplicado | Validar a persistência dos filtros na sessão |
| FIL-04 | Combinar filtros sem resultado | Verificar a exibição do estado vazio |
| FIL-05 | Ajustar o ano pelo teclado no slider | Validar acessibilidade do slider e o envio do período à API |

## Busca geral

| ID | Teste | Motivação |
| -- | ----- | --------- |
| BUS-01 | Buscar um jogo e abrir o resultado | Validar o fluxo principal de busca |
| BUS-02 | Buscar uma publicadora e aplicá-la como filtro | Validar a integração da busca com os filtros |
| BUS-03 | Buscar um termo inexistente | Verificar a mensagem de nenhum resultado |
| BUS-04 | Digitar apenas 1 caractere | Garantir que não há requisição abaixo do mínimo de 2 caracteres |

## Catálogo

| ID | Teste | Motivação |
| -- | ----- | --------- |
| CAT-01 | Abrir o catálogo | Verificar a quantidade de cards por página e a ordenação por vendas |
| CAT-02 | Filtrar por nome | Validar o filtro textual |
| CAT-03 | Avançar de página | Validar a paginação e o estado dos botões |
| CAT-04 | Clicar em um card | Validar a navegação para o detalhe |

## Detalhe do jogo

| ID | Teste | Motivação |
| -- | ----- | --------- |
| DET-01 | Abrir a ficha de um jogo | Verificar os dados e painéis exibidos |
| DET-02 | Trocar de plataforma pelo chip | Validar a navegação entre versões do mesmo título |
| DET-03 | Voltar ao catálogo | Validar o link de retorno |

## Rankings

| ID | Teste | Motivação |
| -- | ----- | --------- |
| RNK-01 | Alternar dimensão e Top N | Verificar que a seleção altera a consulta e o gráfico |
| RNK-02 | Clicar na tabela de publicadoras | Validar a tabela e o detalhamento por publicadora |

## Mapa de vendas

| ID | Teste | Motivação |
| -- | ----- | --------- |
| MAP-01 | Abrir o mapa | Verificar a ordem das regiões, o total global e a renderização do mapa |
| MAP-02 | Clicar em uma célula do heatmap | Validar o detalhamento por gênero e região |

## Painel de detalhamento

| ID | Teste | Motivação |
| -- | ----- | --------- |
| DRL-01 | Ordenar pela coluna JOGO | Validar a ordenação crescente e decrescente |
| DRL-02 | Paginar no painel | Validar a paginação dentro do painel |
| DRL-03 | Clicar em um jogo do painel | Validar a navegação e o fechamento do painel |

## Relatórios

| ID | Teste | Motivação |
| -- | ----- | --------- |
| REL-01 | Editar o título | Verificar a atualização da pré-visualização |
| REL-02 | Ligar e desligar seções | Verificar que a pré-visualização respeita as seções escolhidas |
| REL-03 | Exportar CSV | Validar o download e o conteúdo do arquivo |
| REL-04 | Exportar PDF | Validar o download de um PDF válido |

## API

| ID | Teste | Motivação |
| -- | ----- | --------- |
| API-01 | `GET /games` com paginação | Validar paginação, total e ordenação |
| API-02 | `GET /games/999999` | Verificar o retorno 404 |
| API-03 | Parâmetros inválidos | Verificar a validação com retorno 400 |
| API-04 | `GET /games/export` | Validar cabeçalhos e conteúdo do CSV |

## Simulação de rede

| ID | Teste | Motivação |
| -- | ----- | --------- |
| MCK-01 | Simular erro 500 na API | Verificar o aviso de falha exibido ao usuário |
| MCK-02 | Simular a resposta do catálogo | Validar a renderização independente do banco |
