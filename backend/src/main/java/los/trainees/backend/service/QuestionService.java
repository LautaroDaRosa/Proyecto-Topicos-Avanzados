package los.trainees.backend.service;

import lombok.SneakyThrows;
import los.trainees.backend.dto.AnswerDTO;
import los.trainees.backend.dto.AnswerData;
import los.trainees.backend.dto.QuestionData;
import los.trainees.backend.entity.Answer;
import los.trainees.backend.entity.AnswerId;
import los.trainees.backend.entity.Provider;
import los.trainees.backend.entity.Question;
import los.trainees.backend.enums.ETypeQuestion;
import los.trainees.backend.repository.IAnswerRepository;
import los.trainees.backend.repository.IProviderRepository;
import los.trainees.backend.repository.IQuestionRepository;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private IQuestionRepository questionRepository;

    public Question createQuestion(QuestionData questionData) {
        Question question = new Question();
        setQuestion(questionData, question);

        return question;
    }

    @SneakyThrows
    public Question modifyQuestion(QuestionData questionData) {
        Optional<Question> questionOpt = questionRepository.getQuestionByQuestionId(questionData.getQuestionId());

        if (questionOpt.isEmpty()) {
            throw new Exception("No existe esa pregunta");
        }

        Question question = questionOpt.get();

        setQuestion(questionData, question);

        return question;
    }

    private void setQuestion(QuestionData questionData, Question question){
        question.setTypeQuestion(questionData.getTypeQuestion());
        question.setCategoryQuestion(questionData.getCategoryQuestion());
        question.setText(questionData.getText());
        question.setTypeQuestion(questionData.getTypeQuestion());
        question.setWeight(questionData.getWeight());
        questionRepository.save(question);
    }

    @SneakyThrows
    public Question deleteQuestion(Long questionId) {
        Optional<Question> questionOpt = questionRepository.getQuestionByQuestionId(questionId);

        if (questionOpt.isEmpty()) {
            throw new Exception("No existe esa pregunta");
        }

        questionRepository.deleteById(questionId);
        return questionOpt.get();
    }
}
