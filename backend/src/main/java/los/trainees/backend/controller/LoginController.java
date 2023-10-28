package los.trainees.backend.controller;

import los.trainees.backend.dto.JWTUser;
import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.User;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.service.LoginService;
import los.trainees.backend.config.JwtGenerator; // Asegúrate de importar tu clase JwtGenerator
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @Autowired
    private JwtGenerator jwtGenerator; // Inyecta tu instancia de JwtGenerator

    @PostMapping(produces = "application/json")
    public ResponseEntity<JWTUser> login(@RequestBody LoginRequest loginRequest) {
        User authenticatedUser = loginService.checkCredentials(loginRequest);

        System.out.println("Salio el user padree");
        if (authenticatedUser != null) {
            Long userId = authenticatedUser.getUserId();
            String username = authenticatedUser.getName();
            String role = authenticatedUser.getRole().toString();
            String token = jwtGenerator.generateToken(username, Arrays.toString(List.of(role).toArray()));

            JWTUser result = JWTUser.builder().role(role).username(username).userId(userId).token(token).build();

            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
