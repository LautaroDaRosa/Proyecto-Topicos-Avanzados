package los.trainees.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import los.trainees.backend.enums.ECategoryQuestion;
import los.trainees.backend.enums.ETypeQuestion;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long questionId;

    private ECategoryQuestion categoryQuestion;

    private int peso;

    private String text;

    private ETypeQuestion typeQuestion;

}
