package los.trainees.backend.service;

import los.trainees.backend.entity.Provider;
import los.trainees.backend.entity.User;
import los.trainees.backend.enums.ECategory;
import los.trainees.backend.enums.ERole;
import los.trainees.backend.repository.IProviderRepository;
import los.trainees.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private IUserRepository userRepository;

    public Optional<User> filter(Long userId) {
        return userRepository.getUserByUserId(userId);
    }
}
