package los.trainees.backend.service;

import lombok.SneakyThrows;
import los.trainees.backend.dto.ListQuestionIdDTO;
import los.trainees.backend.dto.QuestionDTO;
import los.trainees.backend.entity.Question;
import los.trainees.backend.exception.QuestionNotFoundException;
import los.trainees.backend.repository.IQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private IQuestionRepository questionRepository;

    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> createQuestions(List<QuestionDTO> listQuestionData) {
        List<Question> list = new ArrayList<>();
        for (QuestionDTO questionData:
             listQuestionData) {
            Question question = new Question();
            setQuestion(questionData, question);
            list.add(question);
        }

        questionRepository.saveAll(list);

        return list;
    }

    @SneakyThrows
    public List<Question> modifyQuestions(List<QuestionDTO> listQuestionData) {
        List<Question> list = new ArrayList<>();
        for (QuestionDTO questionData:
                listQuestionData) {
            Optional<Question> questionOpt = questionRepository.getQuestionByQuestionId(questionData.getQuestionId());
            Question question = questionOpt.orElseThrow(QuestionNotFoundException::new);
            setQuestion(questionData, question);
            list.add(question);
        }

        questionRepository.saveAll(list);

        return list;
    }

    private void setQuestion(QuestionDTO questionData, Question question){
        question.setTypeQuestion(questionData.getTypeQuestion());
        question.setCategoryQuestion(questionData.getCategoryQuestion());
        question.setText(questionData.getText());
        question.setTypeQuestion(questionData.getTypeQuestion());
        question.setWeight(questionData.getWeight());
    }

    @SneakyThrows
    public boolean deleteQuestions(ListQuestionIdDTO listQuestionIdDTO) {
        questionRepository.deleteAllById(listQuestionIdDTO.getListQuestionId());

        return true;
    }
}
