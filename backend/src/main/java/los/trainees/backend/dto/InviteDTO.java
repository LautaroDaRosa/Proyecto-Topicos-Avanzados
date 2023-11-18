package los.trainees.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InviteDTO {

    private RUser senderUser;

    private String receiverUserEmail;

    private String receiverUserRole;

    private String token;

}
