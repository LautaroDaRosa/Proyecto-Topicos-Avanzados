package los.trainees.backend.dto;

import lombok.Data;

@Data
public class RProviderReduced {

    private Long userId;

    private String name;

    private String businessName;

    private String rut;

    private String logo;

    private Integer averageScore;

}
