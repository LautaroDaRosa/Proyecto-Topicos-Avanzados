package los.trainees.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Provider extends User {

    private String businessName;

    private String rut;

    private String contact;

    private String logo;

    private String address;

    private Integer socialScore;

    private Integer socialEnvironmental;

    private Integer socialGovernance;

    private Integer averageScore;

    @ManyToOne
    private Form form;
}
