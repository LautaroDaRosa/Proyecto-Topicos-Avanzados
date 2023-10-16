package los.trainees.backend.controller;

import los.trainees.backend.dto.RProviderReduced;
import los.trainees.backend.enums.ECategory;
import los.trainees.backend.mapper.ProviderMapper;
import los.trainees.backend.service.ProviderService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/provider")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    private final ProviderMapper providerMapper = Mappers.getMapper(ProviderMapper.class);

    @GetMapping(produces = "application/json")
    public Page<RProviderReduced> getAllProviders(Pageable pageable) {
        return providerMapper.pageToDtoReduced(providerService.getProviders(pageable));
    }

    @GetMapping(path = "/filter", produces = "application/json")
    public Page<RProviderReduced> filterProviders(@RequestParam(required = false) String name, @RequestParam(required = false) String businessName,
                                                  @RequestParam(required = false) String rut, @RequestParam(required = false) Integer score,
                                                  @RequestParam(required = false) String category, Pageable pageable) {
        return providerMapper.pageToDtoReduced(providerService.filter(name, businessName, rut, score, ECategory.findByName(category), pageable));
    }

}
