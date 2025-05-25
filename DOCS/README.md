# API-DOMROCK-2

<h1 align="center">API 6º Semestre 2025-1 - Desafio Individual</h1>

<p align="center">
  <a href ="#projeto"> Projeto </a>  •
  <a href ="#proposta"> Proposta </a>  • 
  <a href ="#backlogs"> Backlog do Produto </a> • 
  <a href ="#sprints">Sprints</a> • 
  <a href ="#evolucao">Evolução da Interfaces</a>
<br>

<span id="projeto">
  
## :clipboard: O Projeto

> **Status do Projeto: Em andamento** 

- O projeto consiste no desenvolvimento de uma aplicação web baseada em Inteligência Artificial que atua como um chatbot especializado no apoio a cuidadores de idosos com Alzheimer.

Cuidadores de pacientes com Alzheimer enfrentam, diariamente, desafios emocionais e práticos: lidar com comportamentos imprevisíveis, manter rotinas adequadas, interpretar sintomas e acompanhar tratamentos em constante evolução. Além disso, muitos cuidadores não têm formação técnica específica e se sentem sobrecarregados pela dificuldade de encontrar informações claras, rápidas e confiáveis, especialmente em meio a fontes complexas como artigos científicos.

Motivado por essa realidade, o projeto Alois Chat propõe integrar um Modelo de Linguagem de Grande Escala (LLM) a uma interface web intuitiva, com avaliação contínua por feedback humano. A solução busca oferecer respostas práticas, claras e adaptadas ao dia a dia dos cuidadores, eliminando a necessidade de pesquisas extensas e tornando o suporte técnico acessível a qualquer momento.

O chatbot será capaz de responder perguntas específicas sobre sintomas, tratamentos, rotinas de cuidado e tendências de pesquisa, utilizando como base o dataset “Gaborandi/Alzheimer_pubmed_abstracts” do Hugging Face. A interface coleta avaliações dos usuários para refinar e melhorar constantemente o desempenho do modelo, garantindo que as respostas evoluam de acordo com as necessidades reais dos cuidadores.

O Alois Chat é, portanto, mais do que uma ferramenta de consulta: é um companheiro de suporte para quem dedica sua vida ao cuidado de quem mais precisa.

<br>

<span id="proposta">
  
## :dart: Proposta

**Requisitos Funcionais**

- RF1: Consulta de Informações Básicas do Alzheimer a partir de Resumos:  
    - Permitir que o cuidador consulte informações básicas sobre Alzheimer (ex.: sintomas, tratamentos, cuidados) extraídas exclusivamente dos resumos do dataset "Gaborandi/Alzheimer_pubmed_abstracts".
- RF2: Recomendações práticas para situações cotidianas com o idoso:
    - Fornecer orientações práticas para auxiliar cuidadores em desafios diários no cuidado de idosos com Alzheimer.
- RF3: Identificação de estratégias e tratamentos com baixa eficácia relatada nos estudos:  
    - Mapear e informar estratégias ou tratamentos que apresentaram baixa eficácia nos resumos analisados, alertando os cuidadores.
- RF4: Tradução de termos técnicos encontrados nos resumos para linguagem simples:   
    - Traduzir expressões técnicas e científicas presentes nos resumos para uma linguagem simples e acessível aos cuidadores.
- RF5: Listagem de ferramentas e abordagens mencionadas nos resumos que possam ajudar cuidadores:  
    - Identificar e listar técnicas, ferramentas e abordagens que possam apoiar o trabalho dos cuidadores.


<br>
 
**Requisitos Não Funcionais**
- RNF1 - BD Vetorial ChromaDB 
- RNF2 - Modelos LLM: llama3-8b-8192 - LLM de geração de texto, sentence-transformers/all-MiniLM-L6-v2 - LLM para geração de embeddings 
- RNF3 - Framework Langchain 
- RNF4 - Vídeo-tutorial 
- RNF5 - React.js para interface de usuário (chat bot)


<br>

<span id="backlogs">
  
## 🗓️ Backlog do Produto

<span id="backlog-do-produto">

<br> 


| Rank | Prioridade | User Story                                                                                                                                                                                                                                                                                           | Estimativa (Planning Poker) | Sprint | Requisito do Parceiro |
|------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|--------|-----------------------|
| 1    | Alta       | Como cuidador de um idoso com Alzheimer, quero perguntar ao chatbot sobre sintomas específicos, como "Quais são os sinais iniciais?", e receber respostas claras e baseadas em estudos, para reconhecer a doença cedo e buscar ajuda médica rapidamente.                                           | 3                           | 1      | RF1                   |
| 2    | Alta       | Como cuidador de um idoso com Alzheimer, quero descrever uma situação, como "Como posso ajudar um idoso com Alzheimer a se alimentar melhor no dia a dia?", e receber uma recomendação prática, para lidar com o problema de forma eficaz e imediata.                         | 5                           | 2      | RF2                   |
| 3    | Alta       | Como cuidador de um idoso com Alzheimer, quero saber quais tratamentos têm baixa eficácia, para evitar opções ineficazes ao cuidar do meu familiar.                                                                                                                                                  | 5                           | 3      | RF3                   |
| 4    | Média      | Como cuidador de um idoso com Alzheimer, quero entender termos técnicos como "inibidor de acetilcolinesterase" em linguagem simples, para compreender melhor as orientações médicas e pesquisas que leio.                                                                                            | 8                           | 3      | RF4                   |
| 5    | Média      | Como cuidador de um idoso com Alzheimer, quero visualizar uma lista de técnicas, ferramentas e abordagens, para apoiar meu trabalho diário de forma mais eficiente e prática.                                                                                    | 5                           | 2      | RF5                   |


<br>

### Notas

- **Requisitos Funcionais (RFs)**:
  - **RF1**: Consulta de Informações Básicas do Alzheimer a partir de Resumos.  
  - **RF2**: Recomendações práticas para situações cotidianas com o idoso.
  - **RF3**: Identificação de estratégias e tratamentos com baixa eficácia relatada nos estudos.
  - **RF4**: Tradução de termos técnicos encontrados nos resumos para linguagem simples.
  - **RF5**: Listagem de ferramentas e abordagens mencionadas nos resumos que possam ajudar cuidadores.
- **Estimativas**: Baseadas na complexidade de implementação com o dataset "Gaborandi/Alzheimer_pubmed_abstracts".
- **Sprints**: Organizados para priorizar funcionalidades essenciais (Sprint 1), expansão prática (Sprint 2) e melhorias de usabilidade (Sprint 3).

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

Nesta seção estão documentadas todas as entregas realizadas ao longo das sprints do projeto. Cada sprint contém o detalhamento do MVP entregue, as user stories abordadas, seus respectivos critérios de aceitação e o link para o vídeo demonstrativo da funcionalidade implementada.
O objetivo é evidenciar a evolução contínua do chatbot, focado no suporte prático e humanizado a cuidadores de idosos com Alzheimer, garantindo a rastreabilidade e a transparência do desenvolvimento.

<br>
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

</details>
<br>

<br>

<details> <summary><strong> Sprint 2 </strong></summary>

  ## :dart: MVP
  Nesta sprint (2), o foco foi aprimorar a experiência do usuário cuidador, adicionando uma interface de chatbot mais amigável, funcionalidade de avaliação humana das respostas (RF1) e novas capacidades de suporte prático com base em situações cotidianas (RF2) e  recursos úteis (RF5), melhorando ainda mais a aplicabilidade real do projeto.

<br>

 ## :dart: US + Critérios de Aceitação (Sprint 2)

  **USER STORY 4**
  - **Descrição:**  Como cuidador de um idoso com Alzheimer, quero perguntar sobre situações específicas do dia a dia, como "Como posso ajudar um idoso com Alzheimer a se alimentar melhor no dia a dia?", e receber recomendações práticas que eu possa aplicar rapidamente, sem precisar interpretar estudos científicos.
  - **Critérios de Aceitação:**
    - O chatbot deve identificar a situação descrita pelo cuidador e gerar pelo menos duas recomendações práticas extraídas de estratégias de resumos ou informações complementares.
    - As respostas devem ser diretas, com no máximo 3-4 frases por recomendação.
    - A linguagem deve ser simples, evitando termos técnicos e científicos, facilitando o entendimento pelo público cuidador.

<br>

  **USER STORY 5**
  - **Descrição:**  Como cuidador de um idoso com Alzheimer, quero que o chatbot me indique ferramentas, programas ou abordagens que possam me ajudar no dia a dia, para otimizar o cuidado e reduzir o estresse.
  - **Critérios de Aceitação:**
    - O chatbot deve listar recursos (ex.: técnicas, aplicativos, atividades cognitivas) citados nos resumos do dataset ou nas recomendações práticas.
    - Cada recurso listado deve vir acompanhado de uma breve explicação de como ele pode ajudar o cuidador ou o idoso.
    - O sistema deve apresentar pelo menos 3 opções relevantes para cada consulta, sempre que possível.

<br>

  **USER STORY 6**
  - **Descrição:**  Como cuidador de um idoso com Alzheimer, quero poder avaliar qual resposta do chatbot me ajudou mais, para que o sistema aprenda com o feedback e melhore ainda mais suas futuras respostas.
  - **Critérios de Aceitação:**
    - Após receber múltiplas respostas, o usuário deve poder selecionar a melhor resposta entre elas.
    - Após a escolha, uma tela de avaliação deve ser exibida solicitando a nota em uma escala de 1 a 5 em critérios como clareza, coerência, utilidade e uma justificativa textual obrigatória.
    - O feedback deve ser registrado no backend de forma associada à resposta avaliada, permitindo o uso posterior para melhoria de modelos.

<br>
:dart: Entrega
Clique aqui e assista ao vídeo da entrega no YouTube

[Clique aqui e assista ao vídeo da entrega no YouTube](https://youtu.be/mRtRL11poxQ?si=MsxFYiafiERNwKNg)

<br>
</details>
<br>

<br>

<details> <summary><strong> Sprint 3 </strong></summary>

  ## :dart: MVP
  Nesta Sprint (3), o foco esteve na melhoria da experiência do usuário cuidador, por meio da implementação de uma interface de chatbot mais intuitiva e profissional. Foram entregues as funcionalidades de avaliação humana das respostas geradas pelo modelo, além da implementação da identificação de tratamentos com baixa eficácia para Alzheimer (RF3) e da tradução de termos técnicos para linguagem simples (RF4). As entregas seguiram o backlog do produto e atenderam aos critérios de aceite definidos, garantindo usabilidade e valor agregado à solução.
<br>

 ## :dart: US + Critérios de Aceitação (Sprint 3)

 **USER STORY 7**  
- **Descrição:** Como cuidador de um idoso com Alzheimer, quero saber quais tratamentos têm baixa eficácia, para evitar opções ineficazes ao cuidar do meu familiar.  
- **Critérios de Aceitação:**
  - O chatbot deve ser capaz de identificar o tema relacionado a tratamentos de baixa eficácia quando solicitado pelo usuário.
  - As respostas devem ser baseadas em informações confiáveis, com explicações claras sobre por que determinado tratamento é considerado de baixa eficácia.
  - As respostas devem conter no máximo 4 parágrafos e evitar linguagem técnica sempre que possível, priorizando a compreensão do cuidador.


<br>

 **USER STORY 8**  
- **Descrição:** Como cuidador de um idoso com Alzheimer, quero entender termos técnicos como "inibidor de acetilcolinesterase" em linguagem simples, para compreender melhor as orientações médicas.  
- **Critérios de Aceitação:**
  - O chatbot deve reconhecer automaticamente a presença de termos técnicos médicos na pergunta do usuário.
  - A explicação deve ser feita em linguagem leiga, utilizando analogias ou comparações simples sempre que possível.
  - A resposta deve ser objetiva e conter, no máximo, 4 parágrafos curtos.

<br>
 
  **USER STORY 9**  
  - **Descrição:** Como cuidador de um idoso com Alzheimer, quero acessar o histórico das minhas perguntas e respostas anteriores no chatbot, para poder revisar informações importantes sempre que precisar.  
  - **Critérios de Aceitação:**
    - O sistema deve armazenar cada interação realizada pelo usuário, incluindo perguntas, respostas e data/hora.
    - Deve ser possível editar o nome dos chats para facilitar minha busca.
    - Deve ser possível apagar o chat e limpar o histórico da conversa selecionada.


<br>
:dart: Entrega
Clique aqui e assista ao vídeo da entrega no YouTube

[Clique aqui e assista ao vídeo da entrega no YouTube](https://youtu.be/r9r6y0vos2k)

<br>
</details>
<br>

<br>
<span id="evolucao">
  
## :clipboard: Evolução da Interface do Projeto

Sprint 1:  
> Estruturação inicial do backend, definição da arquitetura do projeto e criação do fluxo básico de envio de perguntas e respostas.

![Chatbot funcionando](https://github.com/elisadsc/API-DOMROCK-2/blob/main/IMG/1gif.gif?raw=true)

<br>

Sprint 2: 
> Implementação da interface do chatbot, conexão com modelos de linguagem via API e exibição de múltiplas respostas para escolha do cuidador.

![Chatbot funcionando](https://github.com/elisadsc/API-DOMROCK-2/blob/main/IMG/2gif.gif?raw=true)

<br>

Sprint 3:  
> Adição da interface de avaliação de respostas com critérios qualitativos, integração completa com banco de dados e foco na experiência do usuário cuidador.

![Chatbot funcionando](https://github.com/elisadsc/API-DOMROCK-2/blob/main/IMG/3gif.gif?raw=true)

<br>
