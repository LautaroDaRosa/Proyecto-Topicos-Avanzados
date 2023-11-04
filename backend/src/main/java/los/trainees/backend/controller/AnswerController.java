package los.trainees.backend.controller;

import los.trainees.backend.dto.AnswerDTO;
import los.trainees.backend.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/answer")
public class AnswerController {
    @Autowired
    private AnswerService answerService;

    @PostMapping(path = "/send",produces = "application/json")
    public ResponseEntity<Boolean> saveAnswers(@RequestBody AnswerDTO answerList){
        return ResponseEntity.ok(answerService.saveAnswers(answerList));
    }

}
