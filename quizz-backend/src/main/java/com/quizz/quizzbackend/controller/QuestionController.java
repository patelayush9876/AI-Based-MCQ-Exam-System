package com.quizz.quizzbackend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class QuestionController {

    @Value("${google.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://generativelanguage.googleapis.com")
            .build();

    @PostMapping("/ask")
    public Mono<Map<String, Object>> askAI(@RequestBody Map<String, String> request) {
        String prompt = request.get("question");

        // Build the Gemini-compatible request body (removed the 'data' field)
        Map<String, Object> textPart = new HashMap<>();
        textPart.put("text", prompt);  // Use 'text' only

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(textPart));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));

        // Send POST request to Gemini API
        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/models/gemini-1.5-pro:generateContent")
                        .queryParam("key", apiKey)
                        .build())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(errorBody -> {
                                    System.out.println("Error Body: " + errorBody); // Use proper logging in production
                                    return Mono.error(new RuntimeException("API Error: " + errorBody));
                                }))
                .bodyToMono(new ParameterizedTypeReference<>() {});
    }
}
