package los.trainees.backend.entity;

import lombok.Getter;
import lombok.Setter;
import los.trainees.backend.enums.ETypeQuestion;

import java.util.List;

@Getter
@Setter
public class Score {
    private double governance;
    private double social;
    private double environmental;

    public Score() {
    }

    public Score(List<Answer> answerList) {
        for (Answer ans: answerList) {
            Question quest = ans.getQuestion();
            double weightFactor = 0;
            switch (quest.getTypeQuestion()){
                case TrueOrFalse -> weightFactor = 1;
                case Ranking5 -> weightFactor = 1D/5D;
            }

            switch (quest.getCategoryQuestion()){
                case SOCIAL:
                    this.social += quest.getPeso() * ans.getResponse() * weightFactor;
                    break;
                case GOVERNANCE:
                    this.governance += quest.getPeso() * ans.getResponse() * weightFactor;
                    break;
                case ENVIRONMENTAL:
                    this.environmental += quest.getPeso() * ans.getResponse() * weightFactor;
                    break;
            }
        }
    }

}
