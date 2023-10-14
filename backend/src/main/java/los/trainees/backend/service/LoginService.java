package los.trainees.backend.service;

import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.entity.User;
import los.trainees.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private IUserRepository userRepository;

    public LoginService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity checkCredentials(LoginRequest loginRequest) {
        String hashedPassword = String.valueOf(loginRequest.getPassword().hashCode());
        Optional<User> optionalUser = userRepository.getUserByName(loginRequest.getUsername());

        if (user.getPassword().compareTo(hashedPassword) == 0) {
            return new ResponseEntity<User>(user, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<User>(HttpStatusCode.valueOf(401));
    }

}
