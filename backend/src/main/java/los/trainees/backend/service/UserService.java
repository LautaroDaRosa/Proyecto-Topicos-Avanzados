package los.trainees.backend.service;

import los.trainees.backend.dto.LoginRequest;
import los.trainees.backend.dto.ProfileUser;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.Admin;
import los.trainees.backend.entity.Partner;
import los.trainees.backend.entity.Provider;
import los.trainees.backend.entity.User;
import los.trainees.backend.exception.IncorrectUserDataException;
import los.trainees.backend.repository.IAdminRepository;
import los.trainees.backend.repository.IPartnerRepository;
import los.trainees.backend.repository.IProviderRepository;
import los.trainees.backend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private IUserRepository userRepository;

    private IAdminRepository adminRepository;
    private IPartnerRepository partnerRepository;
    private IProviderRepository providerRepository;


    @Autowired
    public UserService(IUserRepository userRepository, IProviderRepository providerRepository,
                       IPartnerRepository partnerRepository, IAdminRepository adminRepository) {

        this.userRepository = userRepository;
        this.partnerRepository = partnerRepository;
        this.adminRepository = adminRepository;
        this.providerRepository = providerRepository;
    }


    public Optional<User> findUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    public Optional<Admin> findAdminById(Long id) {
        return adminRepository.getAdminByUserId(id);
    }

    public Optional<Partner> findPartnerById(Long id) {
        return partnerRepository.getPartnersByUserId(id);
    }

    public Optional<Provider> findProviderById(Long id) {
        return providerRepository.getProvidersByUserId(id);
    }

    public  Optional<User> findUserByUserId(Long id) {
        return  userRepository.getUsersByUserId(id);
    }

    public User checkCredentials(LoginRequest loginRequest) {
        Optional<User> optionalUser = findUserByUsername(loginRequest.getUsername());
        User user = optionalUser.orElseThrow(IncorrectUserDataException::new);
        String hashedPassword = String.valueOf(loginRequest.getPassword().hashCode());
        if (user.getPassword().compareTo(hashedPassword) == 0) {
            return user;
        }
        throw new IncorrectUserDataException();
    }

    public ProfileUser fillProfileUser(RUser rUser, ProfileUser profile) {
        profile.setUserId(rUser.getUserId());
        profile.setUsername(rUser.getUsername());
        profile.setPhone(rUser.getPhone());
        profile.setEmail(rUser.getEmail());
        profile.setInfo(rUser.getInfo());
        profile.setRole(rUser.getRole());
        switch (rUser.getRole()) {
            case ADMIN:
                Optional<Admin> admin = findAdminById(rUser.getUserId());
                profile.setBusinessRole(admin.get().getBusinessRole());
                break;
            case PARTNER:
                Optional<Partner> partner = findPartnerById(rUser.getUserId());
                profile.setBusinessName(partner.get().getBusinessName());
                profile.setRut(partner.get().getRut());
                profile.setContact(partner.get().getContact());
                profile.setLogo(partner.get().getLogo());
                profile.setAddress(partner.get().getAddress());
                break;
            case PROVIDER:
                Optional<Provider> provider = findProviderById(rUser.getUserId());
                profile.setBusinessName(provider.get().getBusinessName());
                profile.setRut(provider.get().getRut());
                profile.setContact(provider.get().getContact());
                profile.setLogo(provider.get().getLogo());
                profile.setAddress(provider.get().getAddress());
                profile.setScore(provider.get().getScore());
                profile.setEnvironmental(provider.get().getScore().getEnvironmental());
                profile.setGovernance(provider.get().getScore().getGovernance());
                profile.setSocial(provider.get().getScore().getSocial());
                break;
        }

        return profile;
    }

}
