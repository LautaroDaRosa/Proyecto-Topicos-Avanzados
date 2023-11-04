package los.trainees.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import los.trainees.backend.enums.ECategoryQuestion;
import los.trainees.backend.enums.ETypeQuestion;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long questionId;

    @Enumerated(EnumType.STRING)
    private ECategoryQuestion categoryQuestion;

    private int peso;

    private String text;

    @Enumerated(EnumType.STRING)
    private ETypeQuestion typeQuestion;

}
