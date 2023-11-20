package los.trainees.backend.mapper;

import los.trainees.backend.dto.QuestionDTO;
import los.trainees.backend.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface QuestionMapper {

    Question toEntity(QuestionDTO questionDTO);

    default List<Question> toEntityList(List<QuestionDTO> list) {
        return list.stream().map(this::toEntity).collect(Collectors.toList());
    }
}