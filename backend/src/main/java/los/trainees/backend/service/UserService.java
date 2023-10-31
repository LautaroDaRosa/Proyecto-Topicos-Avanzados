package los.trainees.backend.service;

import los.trainees.backend.entity.User;
import los.trainees.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private IUserRepository userRepository;

    public User filter(Long userId) {
        return userRepository.getUserByUserId(userId);
    }
}
