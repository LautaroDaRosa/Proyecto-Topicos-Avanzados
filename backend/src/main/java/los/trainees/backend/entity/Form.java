package los.trainees.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long formId;

    @OneToMany(mappedBy="question")
    private List<Question> questions;
}
