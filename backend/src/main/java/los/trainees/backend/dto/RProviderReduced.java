package los.trainees.backend.dto;

import lombok.Data;
import los.trainees.backend.entity.Category;

import java.util.List;

@Data
public class RProviderReduced {

    private String name;

    private String businessName;

    private String rut;

    private String logo;

    private Integer averageScore;

    private List<Category> categoryList;

}
