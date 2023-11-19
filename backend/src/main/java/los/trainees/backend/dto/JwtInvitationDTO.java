package los.trainees.backend.dto;

import lombok.Builder;
import lombok.Data;
import los.trainees.backend.enums.EJwtType;

@Data
@Builder
public class JwtInvitationDTO {

    private String senderUserEmail;

    private String receiverUserEmail;

    private String receiverUserRole;

    private String token;

    private EJwtType jwtType;

}
