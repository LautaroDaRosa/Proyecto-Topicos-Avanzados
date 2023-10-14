package los.trainees.backend.repository;

import los.trainees.backend.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProviderRepository extends JpaRepository<Provider,Long> {
    List<Provider> getAllProviders();
}
