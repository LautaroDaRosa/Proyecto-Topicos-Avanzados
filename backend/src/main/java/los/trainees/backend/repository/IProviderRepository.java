package los.trainees.backend.repository;

import los.trainees.backend.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProviderRepository extends JpaRepository<Provider,Long> {
    List<Provider> getAllProviders();
}
