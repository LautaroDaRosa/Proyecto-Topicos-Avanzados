package los.trainees.backend.entity;

import lombok.Getter;
import lombok.Setter;
import java.lang.Math;

import java.util.List;

@Getter
@Setter
public class Score {
    private int governance;
    private int social;
    private int environmental;

    public Score() {
    }

    public Score(List<Answer> answerList) {
        double socialScore = 0;
        double governanceScore = 0;
        double environmentalScore = 0;
        for (Answer ans: answerList) {
            Question quest = ans.getId().getQuestion();;
            double weightFactor = 0;
            switch (quest.getTypeQuestion()){
                case TrueOrFalse -> weightFactor = 1;
                case Ranking5 -> weightFactor = 1D/5D;
            }

            switch (quest.getCategoryQuestion()){
                case SOCIAL:
                    socialScore += quest.getWeight() * ans.getResponse() * weightFactor;
                    break;
                case GOVERNANCE:
                    governanceScore += quest.getWeight() * ans.getResponse() * weightFactor;
                    break;
                case ENVIRONMENTAL:
                    environmentalScore += quest.getWeight() * ans.getResponse() * weightFactor;
                    break;
            }
        }
        this.social = (int)Math.round(socialScore/10);
        this.governance = (int)Math.round(governanceScore/10);
        this.environmental = (int)Math.round(environmentalScore/10);
    }

    public int getAverage() {
        return (int)Math.round((social+governance+environmental)/3D);
    }
}
