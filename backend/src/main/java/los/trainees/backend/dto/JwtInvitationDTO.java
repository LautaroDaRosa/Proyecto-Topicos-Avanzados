package los.trainees.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtInvitationDTO {

    private String senderUserEmail;

    private String receiverUserEmail;

    private String receiverUserRole;

    private String token;

}
