package los.trainees.backend.controller;

import los.trainees.backend.config.JwtGenerator;
import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.service.UserService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtGenerator jwtGenerator;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @PostMapping(path = "/login", produces = "application/json")
    public ResponseEntity<RUser> login(@RequestBody LoginRequest loginRequest) {
        RUser rUser = userMapper.toDto(userService.checkCredentials(loginRequest));
        if (rUser != null) {
            String token = jwtGenerator.generateToken(rUser.getUsername(), rUser.getRole().name());
            return ResponseEntity.ok(rUser.toBuilder().token(token).build());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}