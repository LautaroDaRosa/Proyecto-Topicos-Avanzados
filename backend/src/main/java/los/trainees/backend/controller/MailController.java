package los.trainees.backend.controller;

import los.trainees.backend.config.JwtGenerator;
import los.trainees.backend.dto.EmailDTO;
import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.dto.ProfileUser;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.service.EmailService;
import los.trainees.backend.service.UserService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/email")
public class MailController {

    @Autowired
    private EmailService email;

    @PostMapping(produces = "application/json")
    public ResponseEntity<List<String>> email(@RequestBody EmailDTO emailDTO) {
        List<String> results = email.sendEmail(emailDTO);
        return ResponseEntity.ok(results);
    }
}


