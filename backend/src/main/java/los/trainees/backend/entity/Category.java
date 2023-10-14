package los.trainees.backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Category {

    @Id
    @OneToOne(cascade = CascadeType.ALL)
    private User userId;

    @Id
    private ECategory category;

}
