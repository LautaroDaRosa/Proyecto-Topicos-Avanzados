package los.trainees.backend.mapper;

import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.User;
import org.mapstruct.Mapper;

import java.util.Optional;

@Mapper
public interface UserMapper {

    RUser toDto(Optional<User> user);
}