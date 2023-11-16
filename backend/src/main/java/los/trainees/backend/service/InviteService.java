package los.trainees.backend.service;

import lombok.extern.log4j.Log4j2;
import los.trainees.backend.config.JwtUtils;
import los.trainees.backend.dto.InviteDTO;
import los.trainees.backend.dto.JwtInvitationDTO;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.Invite;
import los.trainees.backend.entity.InviteId;
import los.trainees.backend.entity.User;
import los.trainees.backend.enums.EEmailType;
import los.trainees.backend.enums.ERole;
import los.trainees.backend.enums.EStatus;
import los.trainees.backend.exception.AlreadyCreatedInviteException;
import los.trainees.backend.exception.InviteNotFoundException;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.repository.IInviteRepository;
import los.trainees.backend.repository.IUserRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class InviteService {

    @Autowired
    private IInviteRepository inviteRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${invite.emailUrl}")
    private String emailUrl;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    public Invite sendInvite(RUser senderUser, String receiverEmail) {
        InviteId inviteId = InviteId.builder().senderUserEmail(senderUser.getEmail()).receiverUserEmail(receiverEmail).build();
        Optional<Invite> inviteOptional = inviteRepository.findById(inviteId);
        if (inviteOptional.isEmpty() || !(inviteOptional.get().getStatus() == EStatus.ACCEPTED || inviteOptional.get().getStatus() == EStatus.PENDING)) {
            Invite invite = inviteRepository.save(Invite.builder().id(inviteId).build());
            Optional<User> userOptional = userRepository.getUserByEmail(receiverEmail);
            String url = emailUrl;
            EEmailType emailType;
            if (userOptional.isEmpty()) {
                url += "sign_up/";
                emailType = EEmailType.SING_UP;
            } else {
                url += "invitation/";
                emailType = EEmailType.INVITATION;
            }
            ERole receiverUserRole = senderUser.getRole() == ERole.ADMIN ? ERole.PARTNER : ERole.PROVIDER;
            String inviteJwt = jwtUtils.generateEmailInvitationToken(receiverEmail, receiverUserRole.name(), senderUser.getEmail());
            url += inviteJwt;
            emailService.sendEmailList(List.of(receiverEmail), emailType, url);
            return invite;
        }
        throw new AlreadyCreatedInviteException();
    }

    public InviteDTO getInvite(JwtInvitationDTO jwtInvitationDTO) {
        String senderUserEmail = jwtInvitationDTO.getSenderUserEmail();
        String receiverUserEmail = jwtInvitationDTO.getReceiverUserEmail();
        Optional<Invite> invite = inviteRepository.findById(InviteId.builder().senderUserEmail(senderUserEmail).receiverUserEmail(receiverUserEmail).build());
        if (invite.isPresent()) {
            RUser rUser = userMapper.toDto(userRepository.getUserByEmail(senderUserEmail).get());
            return InviteDTO.builder().senderUser(rUser).receiverUserEmail(receiverUserEmail).receiverUserRole(jwtInvitationDTO.getReceiverUserRole()).token(jwtInvitationDTO.getToken()).build();
        }
        throw new InviteNotFoundException();
    }
}
