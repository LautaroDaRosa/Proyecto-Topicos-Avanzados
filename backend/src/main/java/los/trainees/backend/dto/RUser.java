package los.trainees.backend.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import los.trainees.backend.enums.ERole;

@Data
public class RUser {

    private Long userId;

    private String name;

    private String phone;

    private String email;

    private String info;

    @Enumerated(EnumType.STRING)
    private ERole role;

}
