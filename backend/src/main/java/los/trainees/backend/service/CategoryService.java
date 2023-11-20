package los.trainees.backend.service;

import lombok.extern.log4j.Log4j2;
import los.trainees.backend.enums.ECategory;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@Log4j2
public class CategoryService {
    public List<String> getCategories() {
        return Arrays.stream(ECategory.values()).map(eCategory -> eCategory.name).toList();
    }
}
