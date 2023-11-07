package los.trainees.backend.repository;

import los.trainees.backend.entity.ProviderCategory;
import los.trainees.backend.enums.ECategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProviderCategoryRepository extends JpaRepository<ProviderCategory, ProviderCategory> {

    @Modifying
    @Query(value = "DELETE FROM ProviderCategory pc WHERE pc.provider.userId = :providerId")
    void deleteByProviderId(Long providerId);

    @Query("SELECT pc.category FROM ProviderCategory pc WHERE pc.provider.userId = :providerId")
    List<ECategory> findCategoriesByProviderId(Long providerId);

}
