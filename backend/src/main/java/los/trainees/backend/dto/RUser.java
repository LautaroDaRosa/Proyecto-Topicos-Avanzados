package los.trainees.backend.dto;

import lombok.Builder;
import lombok.Data;
import los.trainees.backend.enums.ERole;

@Data
@Builder(toBuilder = true)
public class RUser {

    private Long userId;

    private String username;

    private String phone;

    private String email;

    private String info;

    private ERole role;

    private String token;

    public ProfileUser getProfile(){
        ProfileUser profile = new ProfileUser();
        profile.setUserId(this.getUserId());
        profile.setUsername(this.getUsername());
        profile.setPhone(this.getPhone());
        profile.setEmail(this.getEmail());
        profile.setInfo(this.getInfo());
        profile.setRole(this.getRole());
        return profile;
    }

}
