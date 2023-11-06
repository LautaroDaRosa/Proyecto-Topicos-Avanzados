package los.trainees.backend.repository;

import los.trainees.backend.entity.ProviderCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IProviderCategoryRepository extends JpaRepository<ProviderCategory, ProviderCategory> {

    @Modifying
    @Query(value = "DELETE FROM ProviderCategory pc WHERE pc.provider.userId = :providerId")
    void deleteByProviderId(Long providerId);

}
