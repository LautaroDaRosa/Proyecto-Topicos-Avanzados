package los.trainees.backend.mapper;

import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {

    RUser toDto(User user);
}