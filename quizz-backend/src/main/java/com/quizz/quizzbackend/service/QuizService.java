package com.quizz.quizzbackend.service;

import com.quizz.quizzbackend.dto.QuizSubmissionRequest;
import com.quizz.quizzbackend.model.Question;
import com.quizz.quizzbackend.model.Quiz;
import com.quizz.quizzbackend.model.Report;
import com.quizz.quizzbackend.model.User;
import com.quizz.quizzbackend.repo.QuestionRepository;
import com.quizz.quizzbackend.repo.QuizRepository;
import com.quizz.quizzbackend.repo.ReportRepository;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private ReportRepository reportRepository;

    public void processQuizFile(String quizName, Integer duration, User faculty, MultipartFile file) throws Exception {
        InputStream inputStream = file.getInputStream();
        XWPFDocument document = new XWPFDocument(inputStream);

        List<Question> questions = new ArrayList<>();
        Question currentQuestion = null;

        for (XWPFParagraph paragraph : document.getParagraphs()) {
            String text = paragraph.getText().trim();
            if (text.startsWith("Q:")) { // Identifies a question
                if (currentQuestion != null) {
                    questions.add(currentQuestion); // Save the previous question
                }
                currentQuestion = new Question();
                currentQuestion.setQuestionText(text.substring(2).trim());
            } else if (text.startsWith("A:") || text.startsWith("B:") || text.startsWith("C:") || text.startsWith("D:")) {
                if (currentQuestion != null) {
                    currentQuestion.addOption(text.trim());
                }
            } else if (text.startsWith("Answer:")) { // Identifies the correct answer
                if (currentQuestion != null) {
                    currentQuestion.setCorrectAnswer(text.substring(7).trim());
                }
            }
        }

        // Add the last question
        if (currentQuestion != null) {
            questions.add(currentQuestion);
        }

        // Save all questions to the database
        Quiz quiz = new Quiz();
        quiz.setName(quizName);
        quiz.setDuration(duration);
        quiz.setQuestions(questions);
        quiz.setFaculty(faculty);
        quizRepository.save(quiz);
    }

    public List<Quiz> getAssignedQuizzes(String username){
        List<Report> reports = reportRepository.findByStudentUsername(username);
        List<Quiz> quizzes = quizRepository.findQuizzesByStudentUsername(username);

        Set<Long> reportQuizIds = reports.stream()
                .map(Report::getQuizId)
                .collect(Collectors.toSet());

        return quizzes.stream()
                .filter(q -> !reportQuizIds.contains(q.getId()))
                .collect(Collectors.toList());
    }

}
