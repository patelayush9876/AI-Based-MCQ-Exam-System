package com.quizz.quizzbackend.controller;

import com.quizz.quizzbackend.dto.FacultyReport;
import com.quizz.quizzbackend.dto.QuizSubmissionRequest;
import com.quizz.quizzbackend.dto.StudentReport;
import com.quizz.quizzbackend.model.Report;
import com.quizz.quizzbackend.repo.ReportRepository;
import com.quizz.quizzbackend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private ReportService reportService;

    @PostMapping("/submit-quiz")
    public ResponseEntity<?> submitQuiz(@RequestBody Map<String, Object> quizData) {
        Long quizId = Long.parseLong(quizData.get("quizId").toString());
        String studentUsername = quizData.get("studentUsername").toString();
        int marks = (int) quizData.get("marks");
        Report report = new Report();
        report.setQuizId(quizId);
        report.setStudentUsername(studentUsername);
        report.setScore(marks);
        reportRepository.save(report);
        return ResponseEntity.ok("Quiz submitted successfully");
    }

    @GetMapping("{studentUsername}/studentreport")
    public List<StudentReport> getSReports(@PathVariable String studentUsername) {
        return reportService.getStudentReport(studentUsername);
    }

    @GetMapping("{facultyUsername}/facultyreport")
    public List<FacultyReport> getFReports(@PathVariable String facultyUsername) {
        return reportService.getFacultyReport(facultyUsername);
    }

    @PostMapping("/submit")
    public ResponseEntity<Report> submitQuiz(@RequestBody QuizSubmissionRequest submissionRequest) {
        Report result = reportService.evaluateQuiz(submissionRequest);
        return ResponseEntity.ok(result);
    }

}
