package los.trainees.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@SuperBuilder
public class Provider extends User {

    private String businessName;

    @Column(unique = true)
    private String rut;

    private String contact;

    private String address;

    @Transient
    private Score score;

    public Provider() {

    }

    public Score getScore() {
        if (this.score == null) {
            this.score = new Score(this.answerList);
        }
        return this.score;
    }

    @OneToMany(mappedBy = "id.provider", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Answer> answerList;
}
