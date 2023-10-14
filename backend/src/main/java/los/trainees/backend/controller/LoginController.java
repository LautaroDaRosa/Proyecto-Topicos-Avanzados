package los.trainees.backend.controller;

import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.service.LoginService;
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

    @PostMapping(produces = "application/json")
    public RUser login(@RequestBody LoginRequest loginRequest) {

        return loginService.checkCredentials(loginRequest);
    }
}
