package los.trainees.backend.controller;

import los.trainees.backend.config.JwtUtils;
import los.trainees.backend.dto.JwtInvitationDTO;
import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.dto.ProfileUser;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.service.UserService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @PostMapping(path = "/login", produces = "application/json")
    public ResponseEntity<RUser> login(@RequestBody LoginRequest loginRequest) {
        RUser rUser = userMapper.toDto(userService.checkCredentials(loginRequest));
        if (rUser != null) {
            String token = jwtUtils.generateLoginToken(rUser.getUsername(), rUser.getRole().name());
            return ResponseEntity.ok(rUser.toBuilder().token(token).build());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'PROVIDER', 'PARTNER')")
    @GetMapping(path = "/myProfile", produces = "application/json")
    public ProfileUser myProfile() {
        RUser rUser = (RUser) SecurityContextHolder.getContext().getAuthentication().getDetails();
        return userService.fillProfileUser(rUser);
    }

    @PostMapping(value = "/register", produces = "application/json")
    public ProfileUser register(@RequestBody ProfileUser userRegister) {
        JwtInvitationDTO jwtInvitationDTO = (JwtInvitationDTO) SecurityContextHolder.getContext().getAuthentication().getDetails();
        return userService.registerUser(userRegister, jwtInvitationDTO);
    }
}


