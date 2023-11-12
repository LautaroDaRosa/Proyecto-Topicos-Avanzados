package los.trainees.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import los.trainees.backend.enums.EStatus;
import org.apache.commons.codec.digest.DigestUtils;

import java.time.LocalDate;
import java.time.ZoneId;

@Entity
@Data
public class Invite {

    @Id
    private String invite_id;

    private String userSenderEmail;

    private String userReceiverEmail;

    @Enumerated(EnumType.STRING)
    private EStatus status;

    private LocalDate timeStamp;

    public Invite() {
    }

    public Invite(String userSenderEmail, String userReceiverEmail, EStatus status) {
        this.invite_id = DigestUtils.sha256Hex(userSenderEmail+userReceiverEmail);
        this.userSenderEmail = userSenderEmail;
        this.userReceiverEmail = userReceiverEmail;
        this.status = status;
        timeStamp = LocalDate.now(ZoneId.of("AGT"));
    }
}
