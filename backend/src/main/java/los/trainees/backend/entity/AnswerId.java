package los.trainees.backend.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class AnswerId implements Serializable {

    @ManyToOne
    private Provider provider;

    @ManyToOne
    private Question question;

}

