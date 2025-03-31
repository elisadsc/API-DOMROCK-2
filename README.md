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

- O projeto consiste no desenvolvimento de uma aplicação web baseada em Inteligência Artificial que funciona como um chatbot para auxiliar cuidadores de idosos com Alzheimer, integrando um Modelo de Linguagem de Grande Escala (LLM) com avaliação e aprimoramento por feedback humano. O principal objetivo é oferecer suporte prático na interpretação de informações e na resolução de dúvidas relacionadas ao cuidado desses pacientes, eliminando a necessidade de consultas complexas a artigos científicos ou sistemas técnicos, enquanto permite o retreinamento do LLM para melhorar suas respostas.  O chatbot é capaz de responder perguntas básicas sobre sintomas, tratamentos e rotinas de cuidado, utilizando como base o dataset "Gaborandi/Alzheimer_pubmed_abstracts" do Hugging Face. A interface também permite que o modelo seja atualizado com base no feedback dos cuidadores, refinando progressivamente as respostas oferecidas.


<br>

<span id="proposta">
  
## :dart: Proposta

**Requisitos Funcionais**
- RF1: Consulta de informações básicas sobre sintomas, diagnóstico e cuidados com Alzheimer:  
    - Permitir que o cuidador pergunte sobre aspectos como sinais iniciais, diferenças entre Alzheimer e outras demências, ou abordagens gerais de cuidado, com base exclusivamente nos resumos do dataset.
- RF2: Recomendações práticas para situações cotidianas com o idoso:
    - Fornecer respostas práticas e orientações extraídas dos resumos para problemas comuns como agitação noturna, recusa alimentar ou esquecimento de tarefas, utilizando estratégias mencionadas nos artigos.
- RF3: Identificação de estratégias e tratamentos com baixa eficácia relatada nos estudos  
    - Permitir que o cuidador descubra o que os estudos apontam como ineficaz ou sem benefício claro, com base em resumos que mencionam limitações ou resultados negativos.
- RF4: Tradução de termos técnicos encontrados nos resumos para linguagem simples:  
    - Traduzir expressões técnicas como “declínio cognitivo leve” ou “intervenções não farmacológicas” para termos mais acessíveis, facilitando o entendimento pelo cuidador.
- RF5: Listagem de ferramentas e abordagens mencionadas nos resumos que possam ajudar cuidadores:   
    - Listar recursos e práticas úteis como “mindfulness”, “estimulação cognitiva” ou “grupos de apoio” quando citados nos resumos, com explicações curtas baseadas no conteúdo.


<br>
 
**Requisitos Não Funcionais**
- RNF1: Utilizar ChromaDB como banco vetorial persistente.
- RNF2: Utilizar os modelos Falcon RW 1B para geração de texto e all-distilroberta-v1 para geração de embeddings.
- RNF3: Utilizar bibliotecas Python (Transformers, ChromaDB, Deep Translator).
- RNF4: Fornecer vídeo-tutorial de uso do chatbot.
- RNF5: Desenvolver a interface em Vue.js.


<br>

<span id="prototipo">

## :bulb: Protótipo

> Em construção — o protótipo será disponibilizado em breve.

</span>

<br>

<span id="backlogs">
  
## 🗓️ Backlog do Produto

| Rank | Prioridade | User Story                                                                                                                                                                                                                                                                                           | Estimativa | Sprint | Requisito |
|------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|--------|-----------|
| 1    | Alta       | Como cuidador de uma pessoa com Alzheimer, quero perguntar sobre sintomas ou cuidados e receber uma resposta clara e baseada em estudos.                                                                                                                     | 3          | 1      | RF1        |
| 2    | Alta       | Como cuidador, quero saber quais medicamentos aparecem nos estudos, para entender melhor o que pode ser discutido com o médico.                                                                                                                                                                     | 5          | 2      | RF2        |
| 3    | Alta       | Como cuidador, quero descrever uma situação como “a pessoa fica agitada à noite” e receber sugestões práticas com base em estudos, para lidar melhor com esses momentos.                                                                                                                           | 8          | 2      | RF3        |
| 4    | Média      | Como cuidador, quero entender palavras difíceis como “intervenção não farmacológica”, para compreender os estudos com mais facilidade.                                                                                                                                                               | 3          | 3      | RF4        |
| 5    | Média      | Como cuidador, quero saber o que os estudos dizem que não funciona, para evitar estratégias ineficazes.                                                                                                                                                                                              | 5          | 3      | RF5        |
| 6    | Média      | Como cuidador, quero receber ideias de atividades cognitivas que ajudam a manter a pessoa ativa mentalmente, conforme citado nos estudos.                                                                                                                                                           | 5          | 3      | RF6        |

<br>
<details>

<summary><strong>:page_facing_up: Notas </strong></summary>

- **Estimativas**: Baseadas na complexidade de implementação com o dataset [Gaborandi/Alzheimer_pubmed_abstracts](https://huggingface.co/datasets/Gaborandi/Alzheimer_pubmed_abstracts).
- **Sprints**: Organizados para priorizar funcionalidades essenciais (Sprint 1), recomendações práticas e explicações úteis (Sprint 2), e expansão do suporte ao cuidador com sugestões e simplificação da linguagem (Sprint 3).

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

<span id="sprints">
  
## :rocket: Entrega das Sprints

<details>
  <summary><strong> Sprint 1 </strong></summary>

  ## :dart: MVP
  Foram entregues nessa sprint: 

- Desenvolvimento do modelo de busca semântica com embeddings
- Integração com ChromaDB
- Conexão do LLM Falcon RW 1B
- Entrega do requisito **RF1**: Fornecer respostas sobre sintomas e cuidados

  <br>


## :dart: US + Critérios de Aceitação (Sprint 1)

### **USER STORY 1**
- **Descrição:** Como cuidador de uma pessoa com Alzheimer, quero perguntar ao chatbot sobre sintomas e diagnósticos iniciais, como "Quais são os sinais de Alzheimer antes do diagnóstico?", para compreender melhor a doença.
- **Critérios de Aceitação:**
  - O chatbot deve permitir que o usuário insira perguntas abertas relacionadas a sintomas e diagnóstico inicial da doença de Alzheimer.
  - As respostas devem ser baseadas exclusivamente no conteúdo dos resumos científicos do dataset [Gaborandi/Alzheimer_pubmed_abstracts](https://huggingface.co/datasets/Gaborandi/Alzheimer_pubmed_abstracts).
  - O sistema deve utilizar busca vetorial com embeddings para encontrar os trechos mais relevantes nos resumos e gerar a resposta baseada neles.
 

  <br>
  
## :dart: Entrega
  
[🔗 Acessar o vídeo da Sprint Review no YouTube](https://youtu.be/qZERufqjOgI?si=ScSG-aIZUcdZSYIp)
  
<br>


<br>

## :computer: Como rodar o projeto localmente

<details>
  
  <summary><strong>:page_facing_up: Acesse o passo a passo </strong></summary>
  
<br>  
<span id="código">
  
 
**1. Clone o repositório:**
```bash
git clone https://github.com/elisadsc/API-DOMROCK-2.git
```

**2. Crie o ambiente virtual e ative:**
```bash
python -m venv venv
venv\\Scripts\\activate  # Windows
```

**3. Instale as dependências:**
```bash
pip install -r requirements.txt
```

**4. Rode o script de construção do banco vetorial:**
```bash
python build_vector_db.py
```

**5. Rode o chatbot:**
```bash
python ask_bot.py
```

> O modelo responderá perguntas com base no dataset carregado e traduzirá termos para linguagem simples, se necessário.

</details>


<br>

</details>

<br>
