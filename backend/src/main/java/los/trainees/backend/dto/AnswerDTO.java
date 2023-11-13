package los.trainees.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class AnswerDTO {
    private Long userId;
    private List<AnswerData> answers;
}
