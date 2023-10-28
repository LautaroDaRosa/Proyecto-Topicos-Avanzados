package los.trainees.backend.dto;

import lombok.Builder;
import lombok.Data;
import los.trainees.backend.enums.ERole;

@Data
@Builder
public class JWTUser {

    private Long userId;

    private String username;

    private String role;

    private String token;
}
