package los.trainees.backend.repository;

import los.trainees.backend.entity.Provider;
import los.trainees.backend.enums.ECategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IProviderRepository extends JpaRepository<Provider, Long> {

    @Query(value = "SELECT p FROM Provider p " +
            "WHERE (:username IS NULL OR p.username LIKE %:username%) " +
            "AND (:businessName IS NULL OR p.businessName LIKE %:businessName%) " +
            "AND (:rut IS NULL OR p.rut LIKE %:rut%) " +
            "AND (:score IS NULL OR p.averageScore = :score) " +
            "AND (:category IS NULL OR EXISTS (SELECT pc FROM ProviderCategory pc " +
            "WHERE pc.provider.userId = p.userId AND pc.category = :category))")
    Page<Provider> filter(@Param("username") String username,
                          @Param("businessName") String businessName,
                          @Param("rut") String rut,
                          @Param("score") Integer score,
                          @Param("category") ECategory category,
                          Pageable pageable);

}
