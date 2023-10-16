package los.trainees.backend.repository;

import los.trainees.backend.entity.Provider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IProviderRepository extends JpaRepository<Provider, Long> {

    @Query(value = "SELECT p FROM Provider p " +
            "WHERE (:name IS NULL OR p.name LIKE %:name%) " +
            "AND (:businessName IS NULL OR p.businessName LIKE %:businessName%) " +
            "AND (:rut IS NULL OR p.rut LIKE %:rut%) " +
            "AND (:score IS NULL OR p.averageScore = :score) ")
//            "AND (:category IS NULL OR :category MEMBER OF p.categoryList)")
    Page<Provider> filter(@Param("name") String name,
                          @Param("businessName") String businessName,
                          @Param("rut") String rut,
                          @Param("score") Integer score,
                          Pageable pageable);

}
