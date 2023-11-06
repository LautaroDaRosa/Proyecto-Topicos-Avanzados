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
import java.util.Optional;

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
            // Busca el Provider y la Question por sus IDs.
            Question question = questionRepository.findById(answerData.getQuestion()).orElse(null);
            // Si Provider o Question son nulos, maneja el caso apropiadamente.
            if (provider == null || question == null) {
                throw new RuntimeException("invalid Answer");
            } else {
                // Crea una instancia de Answer y configura su ID, respuesta y otras propiedades si es necesario.
                Answer answer = new Answer();
                AnswerId answerId = new AnswerId();
                answerId.setProvider(provider);
                answerId.setQuestion(question);
                answer.setId(answerId);
                answer.setResponse(answerData.getResponse());
                // Guarda la respuesta en la base de datos.
                answerRepository.save(answer);
            }
        }
        return true;
    }

    public List<AnswerData> getAnswers(RUser rUser) {
        Provider provider = providerRepository.getProvidersByUserId(rUser.getUserId()).get();
        List<AnswerData> answers = new ArrayList<>();
        for (Answer ans: provider.getAnswerList()) {
            AnswerData data = new AnswerData(ans.getId().getQuestion().getQuestionId(),ans.getResponse());
            answers.add(data);
        }
        return answers;
    }
}
