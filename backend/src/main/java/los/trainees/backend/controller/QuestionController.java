package los.trainees.backend.controller;

import los.trainees.backend.dto.ListQuestionIdDTO;
import los.trainees.backend.dto.QuestionDTO;
import los.trainees.backend.entity.Question;
import los.trainees.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PreAuthorize(value = "hasAnyAuthority('ADMIN','PROVIDER')")
    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Question>> getQuestion() {
        return ResponseEntity.ok(questionService.getQuestions());
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN')")
    @PostMapping(produces = "application/json")
    public ResponseEntity<List<Question>> createQuestion(@RequestBody List<QuestionDTO> listQuestionData) {
        return ResponseEntity.ok(questionService.createQuestions(listQuestionData));
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN')")
    @PutMapping(produces = "application/json")
    public ResponseEntity<List<Question>> modifyQuestion(@RequestBody List<QuestionDTO> listQuestionData) {
        return ResponseEntity.ok(questionService.modifyQuestions(listQuestionData));
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN')")
    @DeleteMapping(produces = "application/json")
    public ResponseEntity<Boolean> deleteQuestion(@RequestBody ListQuestionIdDTO listQuestionIdDTO) {
        return ResponseEntity.ok(questionService.deleteQuestions(listQuestionIdDTO));
    }
}
