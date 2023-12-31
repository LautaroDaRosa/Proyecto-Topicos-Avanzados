package los.trainees.backend.service;

import los.trainees.backend.config.JwtUtils;
import los.trainees.backend.dto.InviteDTO;
import los.trainees.backend.dto.JwtInvitationDTO;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.Invite;
import los.trainees.backend.entity.InviteId;
import los.trainees.backend.entity.User;
import los.trainees.backend.enums.EEmailType;
import los.trainees.backend.enums.EJwtType;
import los.trainees.backend.enums.ERole;
import los.trainees.backend.enums.EStatus;
import los.trainees.backend.exception.AlreadyCreatedInviteException;
import los.trainees.backend.exception.InvalidInviteException;
import los.trainees.backend.exception.InviteNotFoundException;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.repository.IInviteRepository;
import los.trainees.backend.repository.IUserRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
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
            Optional<User> userOptional = userRepository.getUserByEmail(receiverEmail);
            String url = emailUrl;
            EEmailType emailType;
            EJwtType jwtType;
            if (userOptional.isEmpty()) {
                url += "sign_up/";
                emailType = EEmailType.SIGN_UP;
                jwtType = EJwtType.SIGN_UP;
            } else {
                if (Objects.equals(userOptional.get().getRole(), senderUser.getRole())) {
                    throw new InvalidInviteException();
                }
                url += "invitation/";
                emailType = EEmailType.INVITATION;
                jwtType = EJwtType.INVITATION;
            }
            Invite invite = inviteRepository.save(Invite.builder().id(inviteId).build());
            ERole receiverUserRole = senderUser.getRole() == ERole.ADMIN ? ERole.PARTNER : ERole.PROVIDER;
            String inviteJwt = jwtUtils.generateEmailInvitationToken(receiverEmail, receiverUserRole.name(), senderUser.getEmail(), jwtType);
            url += inviteJwt;
            emailService.sendEmailList(List.of(receiverEmail), emailType, url);
            return invite;
        }
        throw new AlreadyCreatedInviteException();
    }

    public InviteDTO getInvite(JwtInvitationDTO jwtInvitationDTO) {
        EJwtType jwtType = jwtInvitationDTO.getJwtType();
        String senderUserEmail = jwtInvitationDTO.getSenderUserEmail();
        String receiverUserEmail = jwtInvitationDTO.getReceiverUserEmail();
        Optional<Invite> invite = inviteRepository.findInviteByIdAndStatus(InviteId.builder().senderUserEmail(senderUserEmail).receiverUserEmail(receiverUserEmail).build(), EStatus.PENDING);
        if (invite.isPresent()) {
            RUser rUserSender = userMapper.toDto(userRepository.getUserByEmail(senderUserEmail).get());
            RUser rUserReceiver = jwtType == EJwtType.INVITATION ? userMapper.toDto(userRepository.getUserByEmail(receiverUserEmail).get()) : null;
            return InviteDTO.builder().senderUser(rUserSender).receiverUser(rUserReceiver).receiverUserEmail(receiverUserEmail).receiverUserRole(jwtInvitationDTO.getReceiverUserRole()).token(jwtInvitationDTO.getToken()).build();
        }
        throw new InviteNotFoundException();
    }

    public Map<String, String> acceptInvite(JwtInvitationDTO jwtInvitationDTO, String status) {
        String senderUserEmail = jwtInvitationDTO.getSenderUserEmail();
        String receiverUserEmail = jwtInvitationDTO.getReceiverUserEmail();
        Optional<Invite> invite = inviteRepository.findInviteByIdAndStatus(InviteId.builder().senderUserEmail(senderUserEmail).receiverUserEmail(receiverUserEmail).build(), EStatus.PENDING);
        if (invite.isPresent()) {
            Invite inv = invite.get();
            inv.setStatus(EStatus.valueOf(status));
            inviteRepository.save(inv);
            return Map.of("message", "Invite accepted");
        }
        throw new InviteNotFoundException();
    }
}
