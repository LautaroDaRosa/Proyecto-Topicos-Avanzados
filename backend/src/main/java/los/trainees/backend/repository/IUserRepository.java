package los.trainees.backend.repository;

import los.trainees.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> getUserByUsername(String username);

    Optional<User> getUsersByUserId(Long userId);
}
