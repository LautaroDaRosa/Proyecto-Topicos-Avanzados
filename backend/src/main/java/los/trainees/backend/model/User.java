package los.trainees.backend.model;

import lombok.Getter;
import los.trainees.backend.enums.Role;

@Getter
@Entity
public class User {
    
    private String username;
    private String password;
    private Role role;
}
