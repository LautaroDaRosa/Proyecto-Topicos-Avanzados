package los.trainees.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Data;
import los.trainees.backend.enums.EStatus;
import org.apache.commons.codec.digest.DigestUtils;

import java.time.LocalDate;
import java.time.ZoneId;

@Entity
@Data
public class Invite {

    @JsonIgnore
    @Id
    private String invite_id;

    private String userSenderEmail;

    private String userReceiverEmail;

    @Enumerated(EnumType.STRING)
    private EStatus status;

    private LocalDate timeStamp;

    public Invite() {
    }

    public Invite(String userSenderEmail, String userReceiverEmail) {
        this.invite_id = DigestUtils.sha256Hex(userSenderEmail + userReceiverEmail);
        this.userSenderEmail = userSenderEmail;
        this.userReceiverEmail = userReceiverEmail;
        this.status = EStatus.PENDING;
        timeStamp = LocalDate.now(ZoneId.of("America/Montevideo"));
    }
}
