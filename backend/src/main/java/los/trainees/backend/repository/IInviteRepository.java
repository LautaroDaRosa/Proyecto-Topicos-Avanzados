package los.trainees.backend.repository;

import los.trainees.backend.entity.Invite;
import los.trainees.backend.entity.InviteId;
import los.trainees.backend.entity.Partner;
import los.trainees.backend.enums.EStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IInviteRepository extends JpaRepository<Invite, InviteId> {

    Optional<Invite> findInviteByIdAndStatus(InviteId id, EStatus status);
}
