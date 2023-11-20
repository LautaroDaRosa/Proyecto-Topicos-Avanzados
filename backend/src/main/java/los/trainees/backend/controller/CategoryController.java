package los.trainees.backend.controller;

import lombok.extern.log4j.Log4j2;
import los.trainees.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
@Log4j2
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'PARTNER', 'PROVIDER')")
    @GetMapping(produces = "application/json")
    public List<String> getCategories() {
        return categoryService.getCategories();
    }
}
