package los.trainees.backend.service;

import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.entity.User;
import los.trainees.backend.exception.IncorrectUserDataException;
import los.trainees.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;

import java.util.Optional;

@Service
public class LoginService {

    private IUserRepository userRepository;

    @Autowired
    public LoginService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User checkCredentials(LoginRequest loginRequest) {
        String hashedPassword = String.valueOf(loginRequest.getPassword().hashCode());
        Optional<User> optionalUser = userRepository.getUserByName(loginRequest.getUsername());

        User user = optionalUser.orElseThrow(IncorrectUserDataException::new);

        if (user.getPassword().compareTo(hashedPassword) == 0) {
            return user;
        }

        throw new IncorrectUserDataException();
    }

}
