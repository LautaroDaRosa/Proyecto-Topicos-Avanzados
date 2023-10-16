package los.trainees.backend.service;

import los.trainees.backend.enums.ECategory;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {
    public List<String> getCategories() {
        return Arrays.stream(ECategory.values()).map(eCategory -> eCategory.name).toList();
    }
}
