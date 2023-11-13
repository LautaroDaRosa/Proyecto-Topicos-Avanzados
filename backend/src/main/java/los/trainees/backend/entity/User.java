package los.trainees.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import los.trainees.backend.enums.ERole;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    protected Long userId;

    @Column(unique = true)
    protected String username;

    protected String phone;

    protected String password;

    @Column(unique = true)
    protected String email;

    protected String logo;

    protected String info;

    @Enumerated(EnumType.STRING)
    protected ERole role;

}
