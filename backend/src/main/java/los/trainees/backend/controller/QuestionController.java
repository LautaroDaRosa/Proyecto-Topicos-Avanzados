package los.trainees.backend.controller;

import los.trainees.backend.dto.AnswerDTO;
import los.trainees.backend.dto.AnswerData;
import los.trainees.backend.dto.QuestionData;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.Question;
import los.trainees.backend.service.AnswerService;
import los.trainees.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PreAuthorize(value = "hasAnyAuthority('ADMIN')")
    @PostMapping(produces = "application/json")
    public ResponseEntity<Question> createQuestion(@RequestBody QuestionData questionData) {
        //RUser rUser = (RUser) SecurityContextHolder.getContext().getAuthentication().getDetails();
        return ResponseEntity.ok(questionService.createQuestion(questionData));
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN')")
    @PutMapping(produces = "application/json")
    public ResponseEntity<Question> modifyQuestion(@RequestBody QuestionData questionData) {
        //RUser rUser = (RUser) SecurityContextHolder.getContext().getAuthentication().getDetails();
        return ResponseEntity.ok(questionService.modifyQuestion(questionData));
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN')")
    @DeleteMapping(produces = "application/json")
    public ResponseEntity<Question> deleteQuestion(@RequestParam Long questionId) {
        //RUser rUser = (RUser) SecurityContextHolder.getContext().getAuthentication().getDetails();
        return ResponseEntity.ok(questionService.deleteQuestion(questionId));
    }
}
