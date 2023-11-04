package los.trainees.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Provider extends User {

    private String businessName;

    private String rut;

    private String contact;

    private String logo;

    private String address;

    @Transient
    private Score score;

    public Score getScore(){
        if(this.score == null){
            this.score = new Score(this.answerList);
        }
        return this.score;
    }

    @OneToMany
    private List<Answer> answerList;
}
