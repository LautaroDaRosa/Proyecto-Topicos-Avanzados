package los.trainees.backend.controller;

import los.trainees.backend.config.JwtGenerator;
import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.service.LoginService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtGenerator jwtGenerator;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @PostMapping(path = "/login", produces = "application/json")
    public ResponseEntity<RUser> login(@RequestBody LoginRequest loginRequest) {
        RUser rUser = userMapper.toDto(loginService.checkCredentials(loginRequest));
        if (rUser != null) {
            String token = jwtGenerator.generateToken(rUser.getUsername(), Arrays.toString(List.of(rUser.getRole()).toArray()));
            return ResponseEntity.ok(rUser.toBuilder().token(token).build());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping(path = "/admin", produces = "application/json")
    @PreAuthorize(value = "hasAuthority('ADMIN')")
    public ResponseEntity admin() {
        return ResponseEntity.ok(Map.of("message", "ADMIN OK"));
    }

    @GetMapping(path = "/provider", produces = "application/json")
    @PreAuthorize(value = "hasRole('PROVIDER')")
    public ResponseEntity provider() {
        return ResponseEntity.ok(Map.of("message", "PROVIDER OK"));
    }
}
