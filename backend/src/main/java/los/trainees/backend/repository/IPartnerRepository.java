package los.trainees.backend.repository;


import los.trainees.backend.entity.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IPartnerRepository extends JpaRepository<Partner, Long> {

    Optional<Partner> getPartnersByUserId(Long id);
}