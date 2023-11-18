package los.trainees.backend.repository;

import los.trainees.backend.entity.Invite;
import los.trainees.backend.entity.InviteId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IInviteRepository extends JpaRepository<Invite, InviteId> {
}
