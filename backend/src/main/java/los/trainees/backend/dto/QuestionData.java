package los.trainees.backend.dto;

import lombok.Data;
import los.trainees.backend.enums.ECategoryQuestion;
import los.trainees.backend.enums.ETypeQuestion;

@Data
public class QuestionData {

    private Long questionId;

    private ECategoryQuestion categoryQuestion;

    private int weight;

    private String text;

    private ETypeQuestion typeQuestion;
}
