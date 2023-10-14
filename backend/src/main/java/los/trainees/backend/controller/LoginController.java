package los.trainees.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import los.trainees.backend.service.LoginService;

@Controller
@RequestMapping("/login")
public class LoginController {
    
    @Autowired
    private LoginService loginService;

    @GetMapping(produces = "application/json") 
    public ResponseEntity<String> login(
            String username, 
            String password) {
        
        return ResponseEntity.ok(loginService.checkCredentials(username, password));
    }
}
