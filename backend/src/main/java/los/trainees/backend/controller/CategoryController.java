package los.trainees.backend.controller;

import los.trainees.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'PARTNER')")
    @GetMapping(produces = "application/json")
    public List<String> getCategories() {
        return categoryService.getCategories();
    }
}
