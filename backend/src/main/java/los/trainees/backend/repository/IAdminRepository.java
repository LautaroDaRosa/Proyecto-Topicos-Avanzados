package los.trainees.backend.repository;

import los.trainees.backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> getAdminByUserId(Long id);
}
