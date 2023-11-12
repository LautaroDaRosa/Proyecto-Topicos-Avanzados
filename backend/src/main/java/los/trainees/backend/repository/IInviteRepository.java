package los.trainees.backend.repository;

import los.trainees.backend.entity.Invite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IInviteRepository extends JpaRepository<Invite,String> {
}
