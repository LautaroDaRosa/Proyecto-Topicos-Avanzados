package los.trainees.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import los.trainees.backend.enums.ERole;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long userId;

    protected String name;

    protected String phone;

    protected String password;

    protected String email;

    protected String info;

    protected ERole role;

}
