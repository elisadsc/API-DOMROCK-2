package com.alzheimerchatbot;

import com.alzheimerchatbot.service.ChatService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Scanner;

@SpringBootApplication
public class AlzheimerChatbotApplication {

    public static void main(String[] args) {
        SpringApplication.run(AlzheimerChatbotApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ChatService chatService) {
        return args -> {
            Scanner scanner = new Scanner(System.in);
            System.out.println("Bem-vindo ao Alzheimer Chatbot! Digite sua pergunta (ou 'sair' para encerrar):");

            while (true) {
                System.out.print("> ");
                String question = scanner.nextLine();

                if (question.equalsIgnoreCase("sair")) {
                    System.out.println("Encerrando o chatbot. Até logo!");
                    break;
                }

                String answer = chatService.getAnswer(question);
                System.out.println("Resposta: " + answer);
            }

            scanner.close();
        };
    }
}