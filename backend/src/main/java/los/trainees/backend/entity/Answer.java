package los.trainees.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Answer {

    @Id
    @ManyToOne
    private Provider provider;

    @Id
    @ManyToOne
    private Question question;

    private int response;
}
