package los.trainees.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import los.trainees.backend.enums.ECategoryQuestion;
import los.trainees.backend.enums.ETypeQuestion;

@Entity
@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long questionId;

    @Enumerated(EnumType.STRING)
    private ECategoryQuestion categoryQuestion;

    private int weight;

    private String text;

    @Enumerated(EnumType.STRING)
    private ETypeQuestion typeQuestion;

}
