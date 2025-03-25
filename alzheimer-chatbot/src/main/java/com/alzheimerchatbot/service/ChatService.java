package com.alzheimerchatbot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String LIBRE_TRANSLATE_URL = "http://localhost:5000/translate";
    private List<Article> articles = new ArrayList<>();

    // Classe interna para representar um artigo
    private static class Article {
        String pubmedId;
        String title;
        String abstractText;

        Article(String pubmedId, String title, String abstractText) {
            this.pubmedId = pubmedId;
            this.title = title;
            this.abstractText = abstractText;
        }
    }

    public ChatService() {
        // Carregar o arquivo CSV ao iniciar o serviço
        loadKnowledgeBase();
    }

    private void loadKnowledgeBase() {
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(
                        getClass().getResourceAsStream("/alzheimers.csv")))) {
            String line;
            boolean firstLine = true;
            while ((line = br.readLine()) != null) {
                if (firstLine) {
                    firstLine = false; // Pular o cabeçalho
                    continue;
                }
                String[] data = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1); // Regex para lidar com vírgulas dentro de aspas
                if (data.length >= 3) {
                    String pubmedId = data[0].trim();
                    String title = data[1].trim().replaceAll("^\"|\"$", ""); // Remover aspas
                    String abstractText = data[2].trim().replaceAll("^\"|\"$", ""); // Remover aspas
                    articles.add(new Article(pubmedId, title, abstractText));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            articles.add(new Article("error", "Erro", "Sorry, I couldn't load the information."));
        }
    }

    public String getAnswer(String question) {
        // Traduzir a pergunta de português para inglês
        String questionInEnglish = translateText(question, "pt", "en");

        // Buscar a resposta nos abstracts (em inglês)
        questionInEnglish = questionInEnglish.toLowerCase();
        String bestAnswer = "Sorry, I don't know the answer to that question.";
        for (Article article : articles) {
            if (article.abstractText.toLowerCase().contains(questionInEnglish)) {
                bestAnswer = article.abstractText;
                break;
            }
        }

        // Traduzir a resposta de inglês para português
        return translateText(bestAnswer, "en", "pt");
    }

    private String translateText(String text, String sourceLang, String targetLang) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String escapedText = text.replace("\"", "\\\"");
        String requestBody = String.format("{\"q\": \"%s\", \"source\": \"%s\", \"target\": \"%s\"}", 
                escapedText, sourceLang, targetLang);
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        try {
            String response = restTemplate.postForObject(LIBRE_TRANSLATE_URL, request, String.class);
            if (response != null && response.contains("\"translatedText\":")) {
                return response.split("\"translatedText\":\"")[1].split("\"")[0];
            }
            return text;
        } catch (Exception e) {
            System.err.println("Erro ao traduzir com LibreTranslate: " + e.getMessage());
            return text;
        }
    }
}