package los.trainees.backend.repository;

import los.trainees.backend.entity.Answer;
import los.trainees.backend.entity.AnswerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAnswerRepository extends JpaRepository<Answer, AnswerId> {

    @Query(value = "SELECT DISTINCT a.id.provider.email FROM Answer a")
    List<String> findAllEmailsDistinct();

    @Modifying
    @Query(value = "DELETE FROM Answer a " +
            "WHERE a.id.question.questionId IN :questionIdList")
    void deleteAnswersByQuestionIdList(List<Long> questionIdList);
}
