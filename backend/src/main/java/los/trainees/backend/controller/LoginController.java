package los.trainees.backend.controller;

import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.service.LoginService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @PostMapping(produces = "application/json")
    public ResponseEntity<RUser> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userMapper.toDto(loginService.checkCredentials(loginRequest)));
    }
}
