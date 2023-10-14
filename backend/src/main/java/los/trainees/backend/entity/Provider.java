package los.trainees.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Provider extends User{
    private String businessName;
    private String rut;
    private String contact;
    private String logo;
    private String address;

    private int socialScore;
    private int socialEnvironmental;
    private int socialGovernance;

    @ManyToMany
    private List<Category> categoryList;

    @ManyToOne
    private Form form;
}
