package los.trainees.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class AnswerDTO {
    private Long provider;
    private List<AnswerData> answers;
}
