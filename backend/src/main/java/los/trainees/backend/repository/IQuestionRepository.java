package los.trainees.backend.repository;

import los.trainees.backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IQuestionRepository extends JpaRepository<Question,Long> {
    Optional<Question> getQuestionByQuestionId(Long questionId);
}
