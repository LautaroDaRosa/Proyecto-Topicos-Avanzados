package los.trainees.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Partner extends User{
    @Transient
    private boolean connected;

    private Date lastConnection;

    private String businessName;
    private String rut;
    private String contact;
    private String logo;
    private String address;
}
