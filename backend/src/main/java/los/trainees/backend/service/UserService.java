package los.trainees.backend.service;

import lombok.extern.log4j.Log4j2;
import los.trainees.backend.dto.JwtInvitationDTO;
import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.dto.ProfileUser;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.*;
import los.trainees.backend.enums.ECategory;
import los.trainees.backend.enums.ERole;
import los.trainees.backend.enums.EStatus;
import los.trainees.backend.exception.IncorrectUserDataException;
import los.trainees.backend.exception.InvalidRegisterException;
import los.trainees.backend.exception.InviteNotFoundException;
import los.trainees.backend.repository.*;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class UserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IAdminRepository adminRepository;

    @Autowired
    private IPartnerRepository partnerRepository;

    @Autowired
    private IProviderRepository providerRepository;

    @Autowired
    private IProviderCategoryRepository providerCategoryRepository;

    @Autowired
    private IInviteRepository inviteRepository;

    public UserService(IUserRepository userRepository, IProviderRepository providerRepository, IPartnerRepository partnerRepository, IAdminRepository adminRepository, IProviderCategoryRepository providerCategoryRepository) {
        this.userRepository = userRepository;
        this.partnerRepository = partnerRepository;
        this.adminRepository = adminRepository;
        this.providerRepository = providerRepository;
        this.providerCategoryRepository = providerCategoryRepository;
    }


    public Optional<User> findUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    public User checkCredentials(LoginRequest loginRequest) {
        Optional<User> optionalUser = findUserByUsername(loginRequest.getUsername());
        User user = optionalUser.orElseThrow(IncorrectUserDataException::new);
        if (user.getPassword().compareTo(DigestUtils.sha256Hex(loginRequest.getPassword())) == 0) {
            return user;
        }
        throw new IncorrectUserDataException();
    }

    public ProfileUser fillProfileUser(RUser rUser) {
        ProfileUser profile = new ProfileUser();
        profile.setUserId(rUser.getUserId());
        profile.setUsername(rUser.getUsername());
        profile.setPhone(rUser.getPhone());
        profile.setEmail(rUser.getEmail());
        profile.setInfo(rUser.getInfo());
        profile.setRole(rUser.getRole());
        switch (rUser.getRole()) {
            case ADMIN:
                Optional<Admin> admin = adminRepository.getAdminByUserId(rUser.getUserId());
                profile.setBusinessRole(admin.get().getBusinessRole());
                break;
            case PARTNER:
                Optional<Partner> partner = partnerRepository.getPartnersByUserId(rUser.getUserId());
                profile.setBusinessName(partner.get().getBusinessName());
                profile.setRut(partner.get().getRut());
                profile.setContact(partner.get().getContact());
                profile.setLogo(partner.get().getLogo());
                profile.setAddress(partner.get().getAddress());
                break;
            case PROVIDER:
                Optional<Provider> provider = providerRepository.getProvidersByUserId(rUser.getUserId());
                List<ECategory> categories = providerCategoryRepository.findCategoriesByProviderId(rUser.getUserId());
                profile.setCategories(categories.stream().map(eCategory -> eCategory.name).toList());
                profile.setBusinessName(provider.get().getBusinessName());
                profile.setRut(provider.get().getRut());
                profile.setContact(provider.get().getContact());
                profile.setLogo(provider.get().getLogo());
                profile.setAddress(provider.get().getAddress());
                profile.setScore(provider.get().getScore());
                break;
        }
        return profile;
    }

    public ProfileUser registerUser(ProfileUser userRegister, JwtInvitationDTO jwtInvitationDTO) {
        try {
            switch (jwtInvitationDTO.getReceiverUserRole()) {
                case "PROVIDER":
                    Provider provider = Provider.builder().username(userRegister.getUsername()).phone(userRegister.getPhone()).password(DigestUtils.sha256Hex(userRegister.getPassword())).email(userRegister.getEmail()).logo(userRegister.getLogo()).info(userRegister.getInfo()).role(ERole.PROVIDER).businessName(userRegister.getBusinessName()).rut(userRegister.getRut()).contact(userRegister.getContact()).address(userRegister.getAddress()).build();
                    providerRepository.save(provider);
                    break;
                case "PARTNER":
                    Partner partner = Partner.builder().username(userRegister.getUsername()).phone(userRegister.getPhone()).password(DigestUtils.sha256Hex(userRegister.getPassword())).email(userRegister.getEmail()).logo(userRegister.getLogo()).info(userRegister.getInfo()).role(ERole.PARTNER).businessName(userRegister.getBusinessName()).rut(userRegister.getRut()).contact(userRegister.getContact()).address(userRegister.getAddress()).build();
                    partnerRepository.save(partner);
                    break;
            }
        } catch (Exception e) {
            throw new InvalidRegisterException();
        }
        String senderUserEmail = jwtInvitationDTO.getSenderUserEmail();
        String receiverUserEmail = jwtInvitationDTO.getReceiverUserEmail();
        Optional<Invite> invite = inviteRepository.findInviteByIdAndStatus(InviteId.builder().senderUserEmail(senderUserEmail).receiverUserEmail(receiverUserEmail).build(), EStatus.PENDING);
        if (invite.isPresent()) {
            Invite inv = invite.get();
            inv.setStatus(EStatus.ACCEPTED);
            inviteRepository.save(inv);
        } else {
            throw new InviteNotFoundException();
        }
        return userRegister;
    }
}
