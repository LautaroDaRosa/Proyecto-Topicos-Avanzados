package los.trainees.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import los.trainees.backend.enums.ERole;

@Data
@Builder(toBuilder = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RUser {

    private Long userId;

    private String username;

    private String phone;

    private String email;

    private String info;

    private String logo;

    private ERole role;

    private String token;

}
