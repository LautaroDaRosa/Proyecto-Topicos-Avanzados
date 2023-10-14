package los.trainees.backend.service;

import los.trainees.backend.entity.User;
import los.trainees.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private IUserRepository userRepository;

    public LoginService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String checkCredentials(String username, String password) {
        String hashedPassword = String.valueOf(password.hashCode());

        User user = userRepository.getUserByName(username);

        return (user.getPassword().compareTo(hashedPassword) == 0) ? user.getRole().name() : "ERROR";
    }
}
