package los.trainees.backend.entity;

import jakarta.persistence.*;
import los.trainees.backend.enums.ECategory;

@Entity
public class ProviderCategory {

    @Id
    @ManyToOne
    private Provider provider;

    @Id
    @Enumerated(EnumType.STRING)
    private ECategory category;

}