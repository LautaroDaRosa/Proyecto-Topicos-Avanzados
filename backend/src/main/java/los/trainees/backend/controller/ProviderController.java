package los.trainees.backend.controller;

import los.trainees.backend.dto.ProfileUser;
import los.trainees.backend.dto.RProviderReduced;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.enums.ECategory;
import los.trainees.backend.enums.ERole;
import los.trainees.backend.mapper.ProviderMapper;
import los.trainees.backend.service.ProviderService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/provider")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    private final ProviderMapper providerMapper = Mappers.getMapper(ProviderMapper.class);

    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'PARTNER')")
    @GetMapping(produces = "application/json")
    public Page<RProviderReduced> getAllProviders(Pageable pageable) {
        RUser rUser = (RUser) SecurityContextHolder.getContext().getAuthentication().getDetails();
        String email = rUser.getRole() == ERole.ADMIN ? null : rUser.getEmail();
        return providerMapper.pageToDtoReduced(providerService.getProviders(email, pageable));
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'PARTNER')")
    @GetMapping(path = "/filter", produces = "application/json")
    public Page<RProviderReduced> filterProviders(@RequestParam(required = false) String username, @RequestParam(required = false) String businessName, @RequestParam(required = false) String rut, @RequestParam(required = false) Integer score, @RequestParam(required = false) String category, Pageable pageable) {
        RUser rUser = (RUser) SecurityContextHolder.getContext().getAuthentication().getDetails();
        String email = rUser.getRole() == ERole.ADMIN ? null : rUser.getEmail();
        return providerMapper.pageToDtoReduced(providerService.filter(email, username, businessName, rut, score, ECategory.findByName(category), pageable));
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'PARTNER')")
    @GetMapping(path = "/{id}", produces = "application/json")
    public ProfileUser getDetails(@PathVariable Long id) {
        return providerService.getProfileProvider(id);
    }

    @PreAuthorize(value = "hasAnyAuthority('ADMIN', 'PROVIDER')")
    @PutMapping(path = "/updateCategories", produces = "application/json")
    public void associateWithCategories(@RequestBody List<String> categoryList) {
        RUser rUser = (RUser) SecurityContextHolder.getContext().getAuthentication().getDetails();
        providerService.associateWithCategories(rUser.getUserId(), categoryList.stream().map(ECategory::findByName).collect(Collectors.toList()));
    }

}
