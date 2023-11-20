package los.trainees.backend.repository;

import los.trainees.backend.entity.Answer;
import los.trainees.backend.entity.AnswerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAnswerRepository extends JpaRepository<Answer, AnswerId> {

    @Query("SELECT DISTINCT a.id.provider.email FROM Answer a")
    List<String> findAllEmailsDistinct();
}
