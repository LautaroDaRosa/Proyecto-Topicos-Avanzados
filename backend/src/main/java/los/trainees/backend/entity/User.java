package los.trainees.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import los.trainees.backend.enums.ERole;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
