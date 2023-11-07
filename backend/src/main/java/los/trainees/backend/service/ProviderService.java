package los.trainees.backend.service;

import jakarta.transaction.Transactional;
import los.trainees.backend.dto.ProfileUser;
import los.trainees.backend.entity.Provider;
import los.trainees.backend.entity.ProviderCategory;
import los.trainees.backend.enums.ECategory;
import los.trainees.backend.exception.ProviderIdNotFoundException;
import los.trainees.backend.repository.IProviderCategoryRepository;
import los.trainees.backend.repository.IProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProviderService {

    @Autowired
    private IProviderRepository providerRepository;

    @Autowired
    private IProviderCategoryRepository providerCategoryRepository;

    public Page<Provider> getProviders(Pageable pageable) {
        return providerRepository.findAll(pageable);
    }

    public Page<Provider> filter(String username, String businessName, String rut, Integer score, ECategory category, Pageable pageable) {
        Page<Provider> dbProviders = providerRepository.filter(username, businessName, rut, category, pageable);
        List<Provider> list = dbProviders.getContent();
        if (score != null) {
            list = list.stream().filter(provider -> provider.getScore().getAverage() == score).toList();
        }
        return new PageImpl<>(list, pageable, dbProviders.getTotalElements());
    }

    @Transactional
    public void associateWithCategories(Long providerId, List<ECategory> categoryList) {
        Provider provider = providerRepository.findById(providerId).get();
        List<ProviderCategory> providerCategoryList = categoryList.stream().map(providerCategory -> ProviderCategory.builder().provider(provider).category(providerCategory).build()).collect(Collectors.toList());
        providerCategoryRepository.deleteByProviderId(providerId);
        providerCategoryRepository.saveAll(providerCategoryList);
    }

    public ProfileUser getProfileProvider(Long id) {
        ProfileUser profile = new ProfileUser();
        Optional<Provider> dbProvider = providerRepository.getProvidersByUserId(id);
        if (dbProvider.isEmpty()) {
            throw new ProviderIdNotFoundException();
        }
        Provider provider = dbProvider.get();
        profile.setUserId(provider.getUserId());
        profile.setUsername(provider.getUsername());
        profile.setPhone(provider.getPhone());
        profile.setEmail(provider.getEmail());
        profile.setInfo(provider.getInfo());
        profile.setRole(provider.getRole());

        List<ECategory> categories = providerCategoryRepository.findCategoriesByProviderId(id);

        profile.setCategories(categories.stream().map(eCategory -> eCategory.name).toList());
        profile.setBusinessName(provider.getBusinessName());
        profile.setRut(provider.getRut());
        profile.setContact(provider.getContact());
        profile.setLogo(provider.getLogo());
        profile.setAddress(provider.getAddress());
        profile.setScore(provider.getScore());
        return profile;
    }
}
