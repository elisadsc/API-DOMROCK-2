package com.alzheimerchatbot.service;

import com.alzheimerchatbot.model.Abstract;
import com.alzheimerchatbot.repository.AbstractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatService {

    @Autowired
    private AbstractRepository abstractRepository;

    @Autowired
    private RestTemplate restTemplate;

    private static final String LLM_API_URL = "https://api.x.ai/v1/chat/completions";
    private static final String API_KEY = "xai-gZWMiA9VRavX0rVZ2F4mnofFgq0H5zolTwgKn1SfBgWLpWDy2xMdYuuks6UZiKh2gauM9pG9GcUsuzkv";
    private static final String LIBRE_TRANSLATE_URL = "https://libretranslate.de/translate";

    public String queryInformation(String prompt) {
        // Traduzir o prompt de português para inglês
        String promptInEnglish = translateText(prompt, "pt", "en");

        // Buscar resumos relevantes
        var abstracts = abstractRepository.findAll();
        String context = abstracts.stream()
                .filter(a -> a.getContent().toLowerCase().contains(promptInEnglish.toLowerCase()))
                .limit(5)
                .map(Abstract::getContent)
                .reduce("", (a, b) -> a + "\n" + b);

        if (context.isEmpty()) {
            context = "Nenhum resumo relevante encontrado para o prompt.";
        }

        // Montar o corpo da requisição para o Grok
        String requestBody = String.format(
                "{\"messages\": [" +
                "{\"role\": \"system\", \"content\": \"You are an assistant providing information about Alzheimer’s based on abstracts.\"}," +
                "{\"role\": \"user\", \"content\": \"Based on the following abstracts:\\n\\n%s\\n\\nAnswer: %s\"}" +
                "], \"model\": \"grok-2-latest\", \"stream\": false, \"temperature\": 0}",
                context.replace("\"", "\\\""), promptInEnglish.replace("\"", "\\\""));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + API_KEY);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        try {
            String response = restTemplate.postForObject(LLM_API_URL, request, String.class);
            // Extrair o conteúdo da resposta do Grok
            String content = response.split("\"content\":\"")[1].split("\",\"")[0].replace("\\n", "\n");
            // Traduzir a resposta de inglês para português
            return translateText(content, "en", "pt");
        } catch (Exception e) {
            return translateText("Desculpe, não consegui obter uma resposta do Grok: " + e.getMessage(), "en", "pt");
        }
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