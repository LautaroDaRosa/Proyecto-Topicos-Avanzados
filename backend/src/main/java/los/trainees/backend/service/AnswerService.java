package los.trainees.backend.service;

import los.trainees.backend.dto.AnswerDTO;
import los.trainees.backend.dto.AnswerData;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.Answer;
import los.trainees.backend.entity.AnswerId;
import los.trainees.backend.entity.Provider;
import los.trainees.backend.entity.Question;
import los.trainees.backend.repository.IAnswerRepository;
import los.trainees.backend.repository.IProviderRepository;
import los.trainees.backend.repository.IQuestionRepository;
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

    public Boolean saveAnswers(AnswerDTO answerList) {
        Provider provider = providerRepository.findById(answerList.getProvider()).orElse(null);
        for (AnswerData answerData : answerList.getAnswers()) {
            Question question = questionRepository.findById(answerData.getQuestion()).orElse(null);
            if (provider == null || question == null) {
                throw new RuntimeException("invalid Answer");
            } else {
                Answer answer = new Answer();
                AnswerId answerId = new AnswerId();
                answerId.setProvider(provider);
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
