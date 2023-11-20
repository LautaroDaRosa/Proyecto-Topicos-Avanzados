package los.trainees.backend.repository;

import los.trainees.backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IQuestionRepository extends JpaRepository<Question, Long> {

}
