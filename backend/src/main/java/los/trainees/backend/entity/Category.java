package los.trainees.backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
import los.trainees.backend.enums.ECategory;

@Entity
@Data
public class Category {

    @Id
    @OneToOne(cascade = CascadeType.ALL)
    private Provider provider;

    @Id
    private ECategory category;

}
