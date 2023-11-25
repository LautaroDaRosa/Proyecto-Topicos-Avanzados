package los.trainees.backend.service;

import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import los.trainees.backend.dto.ListQuestionIdDTO;
import los.trainees.backend.entity.Question;
import los.trainees.backend.enums.EEmailType;
import los.trainees.backend.repository.IAnswerRepository;
import los.trainees.backend.repository.IQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Log4j2
public class QuestionService {

    @Autowired
    private IQuestionRepository questionRepository;

    @Autowired
    private IAnswerRepository answerRepository;

    @Autowired
    private EmailService emailService;

    @Value("${invite.emailUrl}")
    private String emailUrl;

    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    @Transactional
    public List<Question> createQuestions(List<Question> questionList) {
        List<Question> finalQuestions = new ArrayList<>();
        for (Question question : questionList) {
            if (Objects.nonNull(question.getQuestionId())) {
                Optional<Question> actualQuestionOptional = questionRepository.findById(question.getQuestionId());
                Question actualQuestion = actualQuestionOptional.get();
                if (areQuestionsDifferent(question, actualQuestion)) {
                    finalQuestions.add(question.toBuilder().categoryQuestion(actualQuestion.getCategoryQuestion()).build());
                }
            } else {
                finalQuestions.add(question);
            }
        }
        if (!finalQuestions.isEmpty()) {
            emailService.sendEmailList(answerRepository.findAllEmailsDistinct(), EEmailType.NOTIFICATION, emailUrl + "/login");
            answerRepository.deleteAnswersByQuestionIdList(finalQuestions.stream().map(Question::getQuestionId).toList());
            return questionRepository.saveAll(finalQuestions);
        }
        return finalQuestions;
    }

    private Boolean areQuestionsDifferent(Question newQuestion, Question actualQuestion) {
        return newQuestion.getTypeQuestion() != actualQuestion.getTypeQuestion() || !newQuestion.getText().contentEquals(actualQuestion.getText());
    }

    @Transactional
    public boolean deleteQuestions(ListQuestionIdDTO listQuestionIdDTO) {
        try {
            answerRepository.deleteAnswersByQuestionIdList(listQuestionIdDTO.getListQuestionId());
            questionRepository.deleteAllById(listQuestionIdDTO.getListQuestionId());
        } catch (Exception e) {
            log.error("Error deleting Questions", e);
            return false;
        }
        return true;
    }
}
