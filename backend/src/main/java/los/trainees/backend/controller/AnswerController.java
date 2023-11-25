package los.trainees.backend.controller;

import los.trainees.backend.dto.AnswerDTO;
import los.trainees.backend.dto.AnswerData;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answer")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PreAuthorize(value = "hasAnyAuthority('PROVIDER', 'PARTNER')")
    @PostMapping(path = "/send", produces = "application/json")
    public ResponseEntity<Boolean> sendAnswers(@RequestBody List<AnswerData> answerDataList) {
        AnswerDTO answerDTO = new AnswerDTO();
        RUser rUser = (RUser) SecurityContextHolder.getContext().getAuthentication().getDetails();
        answerDTO.setUserId(rUser.getUserId());
        answerDTO.setAnswers(answerDataList);
        return ResponseEntity.ok(answerService.saveAnswers(answerDTO));
    }

    @PreAuthorize(value = "hasAnyAuthority('PROVIDER', 'PARTNER')")
    @GetMapping(path = "/answered", produces = "application/json")
    public List<AnswerData> getAnswers() {
        RUser rUser = (RUser) SecurityContextHolder.getContext().getAuthentication().getDetails();
        return answerService.getAnswers(rUser);
    }

}
