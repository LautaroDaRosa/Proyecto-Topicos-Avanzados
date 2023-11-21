package los.trainees.backend.service;

import los.trainees.backend.dto.AnswerDTO;
import los.trainees.backend.dto.AnswerData;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.*;
import los.trainees.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static los.trainees.backend.enums.ERole.PARTNER;

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

    @Autowired
    private IPartnerRepository partnerRepository;

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

        User user = userRepository.getUsersByUserId(rUser.getUserId()).get();
        List<AnswerData> answers = new ArrayList<>();

        if(user.getRole() == PARTNER){
            Partner partner = partnerRepository.getPartnersByUserId(rUser.getUserId()).get();
            for (Answer ans : partner.getAnswerList()) {
                AnswerData data = new AnswerData(ans.getId().getQuestion().getQuestionId(), ans.getResponse());
                answers.add(data);
            }
        }else {
            Provider provider = providerRepository.getProvidersByUserId(rUser.getUserId()).get();
            for (Answer ans : provider.getAnswerList()) {
                AnswerData data = new AnswerData(ans.getId().getQuestion().getQuestionId(), ans.getResponse());
                answers.add(data);
            }
        }


        return answers;
    }
}
