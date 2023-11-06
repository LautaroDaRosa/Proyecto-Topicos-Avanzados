package los.trainees.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import los.trainees.backend.enums.ECategory;

import java.io.Serializable;

@Entity
@IdClass(ProviderCategory.class)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProviderCategory implements Serializable {

    @Id
    @ManyToOne
    private Provider provider;

    @Id
    @Enumerated(EnumType.STRING)
    private ECategory category;

}