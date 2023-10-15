package los.trainees.backend.service;

import los.trainees.backend.enums.ECategory;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {
    public List<ECategory> getCategories() {
        return Arrays.stream(ECategory.values()).toList();
    }
}
