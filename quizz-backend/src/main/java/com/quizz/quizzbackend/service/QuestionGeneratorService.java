package com.quizz.quizzbackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizz.quizzbackend.model.Question;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class QuestionGeneratorService {

    private static final String COHERE_API_URL = "https://api.cohere.com/v1/generate";
    private static final String COHERE_API_KEY = "ydp6XMli7Xj4L7RgNaQ20892J0soE96fMDEZzqEn"; // Replace with actual key

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public QuestionGeneratorService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public List<Question> generateQuestions(String syllabus, Long count) {
        try {
            // Step 1: Prepare API Request
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(COHERE_API_KEY);

            String requestBody = "{"
                    + "\"model\": \"command-r-plus\","
                    + "\"prompt\": \"Generate "+count+" multiple-choice questions based on the syllabus: " + syllabus + " "
                    + "Format as JSON array with fields: questionText, options, correctAnswer.\","
                    + "\"max_tokens\": 500,"  // Increased token limit to prevent truncation
                    + "\"temperature\": 0.7"
                    + "}";

            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    COHERE_API_URL, HttpMethod.POST, request, String.class);

            // Step 2: Extract JSON from API Response
            JsonNode root = objectMapper.readTree(response.getBody());
            String textResponse = root.path("generations").get(0).path("text").asText();

            // Debugging: Print Raw Response
            System.out.println("Raw Text Response: " + textResponse);

            // Step 3: Extract JSON Array using Regex (Handles extra text)
            String jsonQuestions = extractJsonArray(textResponse);

            // Step 4: Convert JSON String to List<Question>
            try {
                List<Question> questions = objectMapper.readValue(jsonQuestions, new TypeReference<List<Question>>() {});
                return questions;
            } catch (JsonProcessingException e) {
//                log.error("Failed to parse JSON response", e);
                throw new RuntimeException("Invalid JSON received", e);
            }
//            return objectMapper.readValue(jsonQuestions, new TypeReference<>() {});

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate questions: " + e.getMessage(), e);
        }
    }

    /**
     * Extracts JSON Array from API response text using Regex.
     */
    private String extractJsonArray(String text) {
        Pattern pattern = Pattern.compile("\\[.*]", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            return matcher.group(); // Extract JSON Array
        } else {
            throw new RuntimeException("No valid JSON array found in API response.");
        }
    }
}
