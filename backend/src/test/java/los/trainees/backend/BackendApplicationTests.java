package los.trainees.backend;

import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.entity.User;
import los.trainees.backend.enums.ERole;
import los.trainees.backend.exception.IncorrectUserDataException;
import los.trainees.backend.repository.IUserRepository;
import los.trainees.backend.service.UserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("test")
class BackendApplicationTests extends Containers {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private UserService userService;

    @BeforeEach
    public void setUp() {
        userRepository.save(User.builder().username("Michael").email("usuario@ejemplo.com").password(DigestUtils.sha256Hex("root")).role(ERole.PROVIDER).build());
    }

    @AfterEach
    public void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    void testCheckCredentialsValid() {
        User user = userRepository.getUserByUsername("Michael").get();
        User result = userService.checkCredentials(LoginRequest.builder().username("Michael").password("root").build());
        assertEquals(user.getUserId(), result.getUserId());
    }

    @Test
    void testCheckCredentialsIncorrectUsername() {
        assertThrows(IncorrectUserDataException.class, () -> userService.checkCredentials(LoginRequest.builder().username("Michael1234").password("root").build()));
    }

    @Test
    void testCheckCredentialsIncorrectPassword() {
        assertThrows(IncorrectUserDataException.class, () -> userService.checkCredentials(LoginRequest.builder().username("Michael").password("root1234").build()));
    }
}
