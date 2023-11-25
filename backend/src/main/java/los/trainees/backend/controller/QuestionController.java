package los.trainees.backend.controller;

import los.trainees.backend.dto.ListQuestionIdDTO;
import los.trainees.backend.dto.QuestionDTO;
import los.trainees.backend.entity.Question;
import los.trainees.backend.mapper.QuestionMapper;
import los.trainees.backend.service.QuestionService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    private final QuestionMapper questionMapper = Mappers.getMapper(QuestionMapper.class);

    @PreAuthorize(value = "hasAnyAuthority('ADMIN','PROVIDER','PARTNER')")
    @GetMapping
    public List<Question> getQuestion() {
        return questionService.getQuestions();
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN')")
    @PostMapping
    public List<Question> createQuestion(@RequestBody List<QuestionDTO> listQuestionData) {
        return questionService.createQuestions(questionMapper.toEntityList(listQuestionData));
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN')")
    @DeleteMapping
    public Boolean deleteQuestion(@RequestBody ListQuestionIdDTO listQuestionIdDTO) {
        return questionService.deleteQuestions(listQuestionIdDTO);
    }
}
