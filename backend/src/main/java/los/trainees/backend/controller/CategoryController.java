package los.trainees.backend.controller;

import los.trainees.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping(produces = "application/json")
    @ResponseBody
    //@PreAuthorize("hasRole('ADMIN')")
    public List<String> getCategories(){
        return categoryService.getCategories();
    }
}
