package com.quizz.quizzbackend.service;

import com.quizz.quizzbackend.dto.FacultyReport;
import com.quizz.quizzbackend.dto.QuizSubmissionRequest;
import com.quizz.quizzbackend.dto.StudentReport;
import com.quizz.quizzbackend.model.Question;
import com.quizz.quizzbackend.model.Quiz;
import com.quizz.quizzbackend.model.Report;
import com.quizz.quizzbackend.model.User;
import com.quizz.quizzbackend.repo.QuizRepository;
import com.quizz.quizzbackend.repo.ReportRepository;
import com.quizz.quizzbackend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private UserRepository userRepository;

    public Report evaluateQuiz(QuizSubmissionRequest submissionRequest) {
        Quiz quiz = quizRepository.findById(submissionRequest.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        int score = 0;
        int totalQuestions = quiz.getQuestions().size();

        for (Question question : quiz.getQuestions()) {
            String correctAnswer = question.getCorrectAnswer();
            String studentAnswer = (submissionRequest.getAnswers().get(question.getId())).substring(0, 1);
//            System.out.println("Student Answer :"+ studentAnswer);
            if (correctAnswer.equalsIgnoreCase(studentAnswer)) {
                score++;
            }
        }

        Report result = new Report();
        result.setStudentUsername(submissionRequest.getStudentUsername());
        result.setQuizId(submissionRequest.getQuizId());
        result.setScore(score);
        result.setTotal(totalQuestions);

        reportRepository.save(result);

        return result;
    }

    public List<StudentReport> getStudentReport(String studentUsername){
        List<Report> reports = reportRepository.findByStudentUsername(studentUsername);
        List<StudentReport> studentReports = new ArrayList<StudentReport>();
        for (Report r : reports){
            Quiz quiz = quizRepository.findById(r.getQuizId()).get();
            studentReports.add(StudentReport.builder()
                    .quizId(r.getQuizId())
                    .quizName(quiz.getName())
                    .assignedBy(quiz.getFaculty().getName())
                    .total(r.getTotal())
                    .obtained(r.getScore())
                    .grade(calcGrade(r.getTotal(), r.getScore()))
                    .build());
        }
        return studentReports;
    }
    public List<FacultyReport> getFacultyReport(String facultyUsername){
        Optional<User> user = userRepository.findByUsername(facultyUsername);
        List<Quiz> quizzes = quizRepository.findByFaculty(user.get());
        List<FacultyReport> facultyReports = new ArrayList<FacultyReport>();
        for (Quiz r : quizzes){
            Report report = reportRepository.findByQuizId(r.getId());
            facultyReports.add(FacultyReport.builder()
                    .quizId(report.getQuizId())
                    .studentName(userRepository.findByUsername(report.getStudentUsername()).get().getName())
                    .studentId(report.getStudentUsername())
                    .total(report.getTotal())
                    .obtained(report.getScore())
                    .grade(calcGrade(report.getTotal(), report.getScore()))
                    .build());
        }
        return facultyReports;
    }

    private Character calcGrade(Integer total, Integer score) {
        double percentage = (score * 100.0) / total;
        return (percentage >= 90) ? 'A' :
                (percentage >= 75) ? 'B' :
                        (percentage >= 50) ? 'C' : 'F';
    }

}
