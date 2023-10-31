package los.trainees.backend.controller;

import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.User;
import los.trainees.backend.enums.ERole;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.service.UserService;
import los.trainees.backend.service.UserService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @GetMapping(path = "/profile", produces = "application/json")
    public User profile(@RequestParam id){
        return userMapper.toDto(userService.filter(id));
    }
}
