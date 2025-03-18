# API-DOMROCK-2

<h1 align="center">API 6º Semestre 2025-1 - Desafio Individual</h1>

<p align="center">
  <a href ="#projeto"> Projeto </a>  •
  <a href ="#proposta"> Proposta </a>  • 
  <a href ="#prototipo"> Protótipo </a>  • 
  <a href ="#backlogs"> Backlog do Produto </a> • 
  <a href ="#sprints">Sprints</a> 
  
<br>

<span id="projeto">
  
## :clipboard: O Projeto

> **Status do Projeto: Em andamento** 

- O projeto consiste no desenvolvimento de uma aplicação web baseada em Inteligência Artificial que funciona como um chatbot para auxiliar cuidadores de idosos com Alzheimer, integrando um Modelo de Linguagem de Grande Escala (LLM) com avaliação e aprimoramento por feedback humano. O principal objetivo é oferecer suporte prático na interpretação de informações e na resolução de dúvidas relacionadas ao cuidado desses pacientes, eliminando a necessidade de consultas complexas a artigos científicos ou sistemas técnicos, enquanto permite o retreinamento do LLM para melhorar suas respostas. O chatbot será capaz de responder perguntas específicas sobre sintomas, tratamentos, rotinas de cuidado e tendências de pesquisa, utilizando como base o dataset "Gaborandi/Alzheimer_pubmed_abstracts" do Hugging Face, fornecendo respostas em linguagem natural de forma clara, objetiva e adaptada às necessidades dos cuidadores. A interface web também coletará feedback dos usuários para refinar o desempenho do modelo, garantindo que as respostas sejam cada vez mais úteis e precisas.

<br>

<span id="proposta">
  
## :dart: Proposta

**Requisitos Funcionais**
- RF1: Consulta de Informações Específicas do Alzheimer a partir de Resumos:  
    - Permitir que o cuidador consulte informações específicas sobre Alzheimer (ex.: sintomas, tratamentos, cuidados) extraídas exclusivamente dos resumos do dataset "Gaborandi/Alzheimer_pubmed_abstracts"
- RF2: Análise de Sentimento Quantificada em Tratamentos nos Resumos:  
    - Analisar o sentimento (positivo, negativo, neutro) em resumos do dataset que mencionam tratamentos específicos para Alzheimer e fornecer uma métrica quantitativa.
- RF3: Identificação de Tendências Temporais em Temas de Pesquisa:  
    - Identificar e relatar tendências temporais específicas nos temas de pesquisa sobre Alzheimer (ex.: sintomas, tratamentos, cuidados) com base nos resumos, usando metadados de data (se disponíveis) ou frequência de temas.
- RF4: Recomendações Práticas Baseadas em Resumos para Situações Específicas:  
    - Fornecer recomendações práticas e específicas para situações descritas pelo cuidador, baseadas em intervenções ou estratégias mencionadas nos resumos.
- RF5: Listagem de Recursos Práticos Citados nos Resumos:   
    - Listar recursos específicos (ex.: técnicas, ferramentas, programas) mencionados nos resumos para apoiar os cuidadores, com detalhes extraídos do texto.


<br>
 
**Requisitos Não Funcionais**
- RNF1 - BD Vetorial ChromaDB 
- RNF2 - Modelos LLM: llama3-8b-8192 - LLM de geração de texto, sentence-transformers/all-MiniLM-L6-v2 - LLM para geração de embeddings 
- RNF3 - Framework Langchain 
- RNF4 - Vídeo-tutorial 
- RNF5 - Vue.JS para interface de usuário (chat bot)

<br>

<span id="prototipo">
  
## :bulb: Protótipo

**:link: Clique no link abaixo para visualizar o modelo do projeto.**  
> [Protótipo do Projeto]()

<br>

<span id="backlogs">
  
## 🗓️ Backlog do Produto

<span id="backlog-do-produto">

<br> 

| Rank | Prioridade | User Story                                                                                                                                                                                                                                                                                           | Estimativa (Planning Poker) | Sprint | Requisito do Parceiro |
|------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|--------|-----------------------|
| 1    | Alta       | Como cuidador de um idoso com Alzheimer, quero perguntar ao chatbot sobre sintomas específicos, como "Quais são os sinais iniciais?", e receber respostas claras e baseadas em estudos, para reconhecer a doença cedo e buscar ajuda médica rapidamente.                                           | 3                           | 1      | RF1                   |
| 2    | Alta       | Como cuidador de um idoso com Alzheimer, quero que o chatbot analise resumos sobre um tratamento, como "A donepezila funciona?", e me diga percentuais de sentimentos positivos ou negativos, para decidir com meu médico se vale a pena testar o medicamento.                                      | 5                           | 1      | RF2                   |
| 3    | Alta       | Como cuidador de um idoso com Alzheimer, quero perguntar "O que os estudos recentes dizem sobre cuidados?" e receber uma resposta com tendências específicas, como o aumento de terapias cognitivas, para aplicar as práticas mais atuais no cuidado diário.                                       | 5                           | 1      | RF3                   |
| 4    | Média      | Como cuidador de um idoso com Alzheimer, quero descrever uma situação, como "Meu pai fica agitado à noite", e receber uma recomendação prática extraída dos resumos, como "usar música calma", para lidar com o problema de forma eficaz e imediata.                                              | 8                           | 2      | RF4                   |
| 5    | Média      | Como cuidador de um idoso com Alzheimer, quero perguntar "Quais técnicas ajudam cuidadores?" e receber uma lista numerada de recursos citados nos resumos, como "mindfulness" ou "grupos de apoio", para encontrar suporte prático e reduzir meu estresse.                                        | 5                           | 2      | RF5                   |
| 6    | Média      | Como cuidador de um idoso com Alzheimer, quero que o chatbot processe rapidamente minhas perguntas sobre tratamentos ou cuidados e forneça respostas em menos de 5 segundos, para que eu possa tomar decisões no momento em que preciso, sem atrasos.                                             | 3                           | 2      | RF1, RF4              |
| 7    | Baixa      | Como cuidador de um idoso com Alzheimer, quero acessar o chatbot por uma interface simples no celular, digitando perguntas como "O que fazer quando ele esquece de comer?" e recebendo respostas diretas, para usar a ferramenta facilmente enquanto cuido do meu familiar.                     | 8                           | 3      | RF4                   |
| 8    | Baixa      | Como cuidador de um idoso com Alzheimer, quero que o chatbot me avise se uma pergunta, como "Qual dieta melhora o Alzheimer?", não tem resposta nos resumos, dizendo "Nenhum dado encontrado", para que eu saiba quando buscar outras fontes sem perder tempo.                                 | 2                           | 3      | RF1, RF5              |

---


### Notas

- **Requisitos Funcionais (RFs)**:
  - **RF1**: Consulta de Informações Específicas do Alzheimer a partir de Resumos.
  - **RF2**: Análise de Sentimento Quantificada em Tratamentos nos Resumos.
  - **RF3**: Identificação de Tendências Temporais em Temas de Pesquisa.
  - **RF4**: Recomendações Práticas Baseadas em Resumos para Situações Específicas.
  - **RF5**: Listagem de Recursos Práticos Citados nos Resumos.
- **Estimativas**: Baseadas na complexidade de implementação com o dataset "Gaborandi/Alzheimer_pubmed_abstracts".
- **Sprints**: Organizados para priorizar funcionalidades essenciais (Sprint 1), expansão prática (Sprint 2) e melhorias de usabilidade (Sprint 3).

<br>



<details>
  <summary><strong>:page_facing_up: Estrutura do Código</strong></summary>
<br>  
<span id="gitflow">
  
## :chart_with_upwards_trend: Gitflow
 

  **Introdução ao Gitflow**
    
  O Gitflow é um modelo escalável de gerenciamento de branches para projetos Git. Ele é amplamente utilizado em desenvolvimento de software para gerenciar diferentes linhas de desenvolvimento, tornando os processos de release mais claros e gerenciáveis.
  
  **Branches Principais**
  - **Master:** A branch master armazena o código oficial de release do projeto. Toda nova versão consolidada e testada é mergeada nessa branch e, posteriormente, taggeada com uma versão.
  - **Develop:** A branch develop serve como uma branch de integração para features. Ela contém o estado mais recente das mudanças destinadas à próxima release.
  
  **Branches de Suporte**
  - **Feature:** Branches feature são criadas a partir da branch develop. Cada branch feature é destinada ao desenvolvimento de uma funcionalidade específica ou correções e são mergeadas de volta à develop quando a funcionalidade está completa.
  - **Release:** Branches release são criadas a partir da branch develop. Estas branches são preparações para uma nova release de produção. Permitem ajustes finais e correções de bugs que não são enviadas à branch develop durante esse período. Quando a release está pronta para ser lançada, ela é mergeada em master e develop.
  - **Hotfix:** Branches hotfix são criadas a partir da branch master. São usadas para correções rápidas em releases de produção. Uma vez completadas, elas são mergeadas tanto em master quanto em develop para garantir que as correções sejam integradas em futuras releases.
  
  **Fluxo de Trabalho**
  - **Desenvolvimento de Features:**
  Inicia-se criando uma branch feature a partir de develop.
  Após a conclusão da feature, realiza-se um pull request para a develop.
  - **Preparação de Release:**
  Cria-se uma branch release a partir de develop.
  Realizam-se testes e ajustes necessários.
  Conclui-se mergeando a release em master e também de volta à develop com incremento de versão.
  - **Correções de Hotfix:**
  Identificado um bug em produção, cria-se uma branch hotfix a partir de master.
  Após a correção, o hotfix é mergeado em master e em develop.
  
  **Tags**
  
  Após uma release ser mergeada em master, uma tag de versão é criada para documentar o ponto de release no histórico do projeto.

 <img src="https://github.com/atomofatec/API-DOMROCK/blob/main/img/gitflow.png">

<br>

</details>

<br>

<details>

<summary><strong>:page_facing_up: DoR </strong></summary>

## :white_check_mark: (Definition of Ready - DoR)
<br>

**Para que uma tarefa seja considerada pronta para ser desenvolvida, ela deve atender aos seguintes critérios:**
  
1. Documentação Completa:
   - Requisitos funcionais e não-funcionais devem estar documentados e acessíveis. 
   - Especificações técnicas e de design devem estar detalhadas. 
2. História de Usuário Validada: 
   - Cada tarefa deve estar vinculada a uma história de usuário específica (exemplo: backlog do produto), com a descrição do problema que resolve e o benefício para o usuário final. 
3. Dependências Identificadas: 
   - Todas as dependências com outras tarefas, ferramentas ou recursos devem estar mapeadas e resolvidas. 
4. Design e Layout Definidos: 
   - Para tarefas relacionadas à interface, o design deve estar aprovado e disponível. 
5. Alinhamento com a Sprint: 
   - A tarefa deve estar dentro do escopo da sprint e estar de acordo com as prioridades estabelecidas (urgente, alta, normal, baixa). 
6. Estimativa de Tempo: 
   - A tarefa deve ter uma estimativa de tempo de desenvolvimento e testes definida pela equipe. 
</details>

<br>
   



<br>

<span id="sprints">
  
## :rocket: Entrega das Sprints

Ferramenta usada para gestão: https://www.atlassian.com/br/software/jira

<details>
  <summary><strong> Sprint 1 </strong></summary>

  ## :dart: MVP
  Nesta sprint (1), focamos em entregar o MVP do nosso chatbot, permitindo consultas diretas sobre informações, sentimentos e tendências relacionadas ao Alzheimer, extraídas dos resumos da base de dados do Hugging Face.
  [Clique aqui e acesse a base de dados usada](https://huggingface.co/datasets/Gaborandi/Alzheimer_pubmed_abstracts)

  <br>

  ## :dart: US + Critérios de Aceitação (Sprint 1)

  **USER STORY 1**
  - **Descrição:** Como cuidador de um idoso com Alzheimer, quero perguntar ao chatbot sobre sintomas específicos, como "Quais são os sinais iniciais?", e receber respostas claras e baseadas em estudos, para reconhecer a doença cedo e buscar ajuda médica rapidamente.
  - **Critérios de Aceitação:**
    - O chatbot deve identificar e extrair informações relevantes sobre sintomas de Alzheimer a partir dos resumos do dataset "Gaborandi/Alzheimer_pubmed_abstracts" com base na pergunta do usuário.
    - As respostas devem ser claras, limitadas a 2-3 frases, e citar diretamente trechos ou ideias dos resumos, sem adicionar informações externas.
    - A precisão das respostas deve ser superior a 95%, verificada em um conjunto de teste com 20 perguntas sobre sintomas.

  <br>

  **USER STORY 2**
  - **Descrição:** Como cuidador de um idoso com Alzheimer, quero que o chatbot analise resumos sobre um tratamento, como "A donepezila funciona?", e me diga percentuais de sentimentos positivos ou negativos, para decidir com meu médico se vale a pena testar o medicamento.
  - **Critérios de Aceitação:**
    - O chatbot deve filtrar resumos do dataset que mencionem o tratamento especificado (ex.: "donepezila") e aplicar um modelo de análise de sentimento (ex.: BERT) para classificar como positivo, negativo ou neutro.
    - A resposta deve incluir percentuais exatos (ex.: "70% positivo, 20% neutro, 10% negativo") calculados com base nos resumos encontrados, sem inferências externas.
    - O tempo de processamento da análise deve ser inferior a 5 segundos por pergunta, garantindo rapidez na entrega da informação.

  <br>

  **USER STORY 3**
  - **Descrição:** Como cuidador de um idoso com Alzheimer, quero perguntar "O que os estudos recentes dizem sobre cuidados?" e receber uma resposta com tendências específicas, como o aumento de terapias cognitivas, para aplicar as práticas mais atuais no cuidado diário.
  - **Critérios de Aceitação:**
    - O chatbot deve identificar temas de cuidado (ex.: "terapias cognitivas", "manejo comportamental") nos resumos do dataset e agrupá-los por frequência ou, se disponível, por ano nos metadados.
    - A resposta deve destacar uma tendência específica (ex.: "40% dos resumos recentes focam em terapias cognitivas") com base nos dados processados, sem suposições além do dataset.
    - A precisão da identificação de tendências deve ser de pelo menos 90%, testada contra uma amostra manual de 50 resumos.


  <br>
  
  ## :dart: Entrega
  [Clique aqui e assista ao vídeo da entrega no YouTube](https://www.youtube.com/watch?v=dKhNMwNdgP8&t=16s)

  Review Chatbot: 
  https://github.com/user-attachments/assets/2e83f628-fa21-4108-9493-0c18388f0e2a

  
<br>
