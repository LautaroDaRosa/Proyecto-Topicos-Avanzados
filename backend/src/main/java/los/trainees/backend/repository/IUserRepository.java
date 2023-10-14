package los.trainees.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import los.trainees.backend.model.User;

@Repository
public interface IUserRepository extends JpaRepository<User, String> {
    User getUserByUsername(String username);
}
