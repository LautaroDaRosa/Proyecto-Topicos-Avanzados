package los.trainees.backend.repository;

import los.trainees.backend.entity.Provider;
import los.trainees.backend.enums.ECategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IProviderRepository extends JpaRepository<Provider, Long> {

    Optional<Provider> getProvidersByUserId(Long id);

    @Query(value = "SELECT p FROM Provider p " +
            "WHERE (:username IS NULL OR p.username LIKE %:username%) " +
            "AND (:businessName IS NULL OR p.businessName LIKE %:businessName%) " +
            "AND (:rut IS NULL OR p.rut LIKE %:rut%) " +
            "AND (:category IS NULL OR EXISTS (SELECT pc FROM ProviderCategory pc " +
            "WHERE pc.provider.userId = p.userId AND pc.category = :category)) " +
            "AND (:email is null or p.email in " +
            "(SELECT i.userReceiverEmail from Invite i where i.userSenderEmail = :email " +
            "AND i.status = 'ACCEPTED'))")
    Page<Provider> filterPage(@Param("username") String username,
                              @Param("businessName") String businessName,
                              @Param("rut") String rut,
                              @Param("category") ECategory category,
                              @Param("email") String email,
                              Pageable pageable);

    @Query(value = "SELECT p FROM Provider p " +
            "WHERE (:username IS NULL OR p.username LIKE %:username%) " +
            "AND (:businessName IS NULL OR p.businessName LIKE %:businessName%) " +
            "AND (:rut IS NULL OR p.rut LIKE %:rut%) " +
            "AND (:category IS NULL OR EXISTS (SELECT pc FROM ProviderCategory pc " +
            "WHERE pc.provider.userId = p.userId AND pc.category = :category)) " +
            "AND (:email is null or p.email in " +
            "(SELECT i.userReceiverEmail from Invite i where i.userSenderEmail = :email " +
            "AND i.status = 'ACCEPTED'))")
    List<Provider> filterList(@Param("username") String username,
                              @Param("businessName") String businessName,
                              @Param("rut") String rut,
                              @Param("category") ECategory category,
                              @Param("email") String email);

    @Query(value = "SELECT p FROM Provider p " +
            "WHERE :email is null or p.email in " +
            "(SELECT i.userReceiverEmail from Invite i where i.userSenderEmail = :email " +
            "AND i.status = 'ACCEPTED')")
    Page<Provider> getProvidersInvited(@Param("email") String email,
                                       Pageable pageable);
}
