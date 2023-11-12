package los.trainees.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InviteDTO {
    private RUser inviteSender;
    private String inviteReceiver;
}
