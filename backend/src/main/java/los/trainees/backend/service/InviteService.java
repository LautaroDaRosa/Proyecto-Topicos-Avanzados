package los.trainees.backend.service;

import los.trainees.backend.dto.InviteDTO;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.Invite;
import los.trainees.backend.entity.User;
import los.trainees.backend.enums.EStatus;
import los.trainees.backend.exception.AlreadyCreatedInviteException;
import los.trainees.backend.exception.InviteNotFoundException;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.repository.IInviteRepository;
import los.trainees.backend.repository.IUserRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InviteService {

    @Autowired
    private IInviteRepository inviteRepository;

    @Autowired
    private IUserRepository userRepository;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    public Invite sendInvite(String sender, String receiver) {
        Invite invite = new Invite(sender, receiver);
        Optional<Invite> exists = inviteRepository.findById(invite.getInvite_id());
        if (exists.isEmpty() || !(exists.get().getStatus() == EStatus.ACCEPTED ||
                exists.get().getStatus() == EStatus.PENDING)) {
            inviteRepository.save(invite);
            Optional<User> userOptional = userRepository.getUserByEmail(receiver);
            String url;
            if (userOptional.isEmpty()) {
                // MAKE URL FOR ACCEPT/REJECT WITH TOKEN
                url = "http://localhost:3000/sign_up/" + invite.getInvite_id();
            } else {
                // MAKE URL FOR REGISTER WITH TOKEN
                url = "http://localhost:3000/invitation/" + invite.getInvite_id();
            }
            // TODO:
            // Send Email with component to receiver with the url

            return invite;
        }
        throw new AlreadyCreatedInviteException();
    }

    public InviteDTO getInvite(String inviteId) {
        Optional<Invite> invite = inviteRepository.findById(inviteId);
        if (invite.isPresent()) {
            String senderEmail = invite.get().getUserSenderEmail();
            User user = userRepository.getUserByEmail(senderEmail).get();
            RUser ruser = userMapper.toDto(user);
            return new InviteDTO(ruser, invite.get().getUserReceiverEmail());
        }
        throw new InviteNotFoundException();
    }
}
