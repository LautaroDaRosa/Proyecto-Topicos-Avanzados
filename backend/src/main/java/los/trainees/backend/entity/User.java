package los.trainees.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import los.trainees.backend.enums.ERole;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long userId;

    protected String name;

    protected String phone;

    protected String password;

    protected String email;

    protected String info;

    @Enumerated(EnumType.STRING)
    protected ERole role;

}
