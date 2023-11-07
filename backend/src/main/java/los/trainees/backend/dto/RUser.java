package los.trainees.backend.dto;

import lombok.Builder;
import lombok.Data;
import los.trainees.backend.enums.ERole;

@Data
@Builder(toBuilder = true)
public class RUser {

    private Long userId;

    private String username;

    private String phone;

    private String email;

    private String info;

    private ERole role;

    private String token;

}
