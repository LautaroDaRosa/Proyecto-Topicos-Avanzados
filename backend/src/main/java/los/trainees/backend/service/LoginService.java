package los.trainees.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import los.trainees.backend.model.User;
import los.trainees.backend.repository.IUserRepository;

@Service
public class LoginService {

    @Autowired
    private IUserRepository userRepository;

    public LoginService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String checkCredentials(String username, String password) {
        String hashedPassword = String.valueOf(password.hashCode());

        User user = userRepository.getUserByUsername(username);

        return (user.getPassword().compareTo(hashedPassword) == 0) ? user.getRole().name() : "ERROR";
    }
}
