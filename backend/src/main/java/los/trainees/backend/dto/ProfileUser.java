package los.trainees.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import los.trainees.backend.entity.Score;
import los.trainees.backend.enums.ERole;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class ProfileUser {

    private Long userId;

    private String username;

    private String phone;

    private String email;

    private String info;

    private ERole role;

    private String businessName;

    private String rut;

    private String contact;

    private String logo;

    private String address;

    private String businessRole;

    private Score score;

    private List<String> categories;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
}
