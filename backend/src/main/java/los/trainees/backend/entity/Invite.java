package los.trainees.backend.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import los.trainees.backend.enums.EStatus;

import static los.trainees.backend.enums.EStatus.PENDING;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Invite {

    @EmbeddedId
    private InviteId id;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private EStatus status = PENDING;

}
