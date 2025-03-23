package com.alzheimerchatbot.controller;

import com.alzheimerchatbot.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/ask")
    public String ask(@RequestBody String prompt) {
        if (prompt == null || prompt.trim().isEmpty()) {
            return "Por favor, envie uma pergunta válida.";
        }
        return chatService.queryInformation(prompt);
    }
}