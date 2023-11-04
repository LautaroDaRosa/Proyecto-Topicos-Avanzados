package los.trainees.backend.repository;

import los.trainees.backend.entity.Answer;
import los.trainees.backend.entity.AnswerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAnswerRepository extends JpaRepository<Answer, AnswerId> {
}
