package los.trainees.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@SuperBuilder
public class Partner extends User {

    private LocalDateTime lastConnection;

    private String businessName;

    @Column(unique = true)
    private String rut;

    private String contact;

    private String address;

    public Partner() {

    }
}
