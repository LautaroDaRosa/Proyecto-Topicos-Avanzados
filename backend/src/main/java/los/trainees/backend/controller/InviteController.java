package los.trainees.backend.controller;

import los.trainees.backend.dto.InviteDTO;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.Invite;
import los.trainees.backend.service.InviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/invite")
public class InviteController {

    @Autowired
    private InviteService inviteService;

    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'PARTNER')")
    @PostMapping(path = "/send",produces = "application/json")
    public Invite sendInvite(@RequestParam String email){
        RUser rUser = (RUser) SecurityContextHolder.getContext().getAuthentication().getDetails();
        return inviteService.sendInvite(rUser.getEmail(),email);
    }

    @GetMapping(path = "/get",produces = "application/json")
    public InviteDTO getInvite(@RequestParam String inviteId){
        return inviteService.getInvite(inviteId);
    }
}
