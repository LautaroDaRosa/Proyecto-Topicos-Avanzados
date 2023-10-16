package los.trainees.backend;

import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.entity.User;
import los.trainees.backend.exception.IncorrectUserDataException;
import los.trainees.backend.repository.IUserRepository;
import los.trainees.backend.service.LoginService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class BackendApplicationTests {

    @Mock
    private IUserRepository userRepository;

    @InjectMocks
    private LoginService loginService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        User user = new User();
        user.setUserId(1L);
        user.setName("Michael");
        user.setPhone("1234567890");
        user.setPassword("123");
        user.setEmail("usuario@ejemplo.com");;
    }

    @Test
    void testCheckCredentialsValid() {
        Mockito.when(userRepository.getUserByName("username")).thenReturn(Optional.of(user));

        LoginRequest loginRequest = new LoginRequest();

        User result = loginService.checkCredentials(loginRequest);
        assertEquals(user, result);
    }

    @Test
    void testCheckCredentialsInvalid() {
        Mockito.when(userRepository.getUserByName("username")).thenReturn(Optional.empty());

        LoginRequest loginRequest = new LoginRequest();

        assertThrows(IncorrectUserDataException.class, () -> loginService.checkCredentials(loginRequest));
    }

     @Test
    void testCheckCredentialsIncorrectPassword() {
        Mockito.when(userRepository.getUserByName("username")).thenReturn(Optional.of(user));

        LoginRequest loginRequest = new LoginRequest();

        assertThrows(IncorrectUserDataException.class, () -> loginService.checkCredentials(loginRequest));
    }
}
