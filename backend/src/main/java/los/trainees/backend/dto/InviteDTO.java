package los.trainees.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InviteDTO {

    private RUser senderUser;

    private RUser receiverUser;

    private String receiverUserEmail;

    private String receiverUserRole;

    private String token;

}
