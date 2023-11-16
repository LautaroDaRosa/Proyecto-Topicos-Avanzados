package los.trainees.backend.service;

import los.trainees.backend.dto.AnswerDTO;
import los.trainees.backend.dto.AnswerData;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.*;
import los.trainees.backend.repository.IAnswerRepository;
import los.trainees.backend.repository.IProviderRepository;
import los.trainees.backend.repository.IQuestionRepository;
import los.trainees.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private IAnswerRepository answerRepository;

    @Autowired
    private IProviderRepository providerRepository;

    @Autowired
    private IQuestionRepository questionRepository;

    @Autowired
    private IUserRepository userRepository;

    public Boolean saveAnswers(AnswerDTO answerList) {
        User user = userRepository.findById(answerList.getUserId()).orElse(null);
        for (AnswerData answerData : answerList.getAnswers()) {
            Question question = questionRepository.findById(answerData.getQuestion()).orElse(null);
            if (user == null || question == null) {
                throw new RuntimeException("invalid Answer");
            } else {
                Answer answer = new Answer();
                AnswerId answerId = new AnswerId();
                answerId.setUser(user);
                answerId.setQuestion(question);
                answer.setId(answerId);
                answer.setResponse(answerData.getResponse());
                answerRepository.save(answer);
            }
        }
        return true;
    }

    public List<AnswerData> getAnswers(RUser rUser) {
        Provider provider = providerRepository.getProvidersByUserId(rUser.getUserId()).get();
        List<AnswerData> answers = new ArrayList<>();
        for (Answer ans : provider.getAnswerList()) {
            AnswerData data = new AnswerData(ans.getId().getQuestion().getQuestionId(), ans.getResponse());
            answers.add(data);
        }
        return answers;
    }
}
