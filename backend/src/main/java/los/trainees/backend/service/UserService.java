package los.trainees.backend.service;

import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.entity.User;
import los.trainees.backend.exception.IncorrectUserDataException;
import los.trainees.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private IUserRepository userRepository;

    @Autowired
    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    public User checkCredentials(LoginRequest loginRequest) {
        Optional<User> optionalUser = findUserByUsername(loginRequest.getUsername());
        User user = optionalUser.orElseThrow(IncorrectUserDataException::new);
        String hashedPassword = String.valueOf(loginRequest.getPassword().hashCode());
        if (user.getPassword().compareTo(hashedPassword) == 0) {
            return user;
        }
        throw new IncorrectUserDataException();
    }

}
