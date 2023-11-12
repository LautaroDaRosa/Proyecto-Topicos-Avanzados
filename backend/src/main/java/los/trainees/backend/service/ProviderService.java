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
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProviderService {

    @Autowired
    private IProviderRepository providerRepository;

    @Autowired
    private IProviderCategoryRepository providerCategoryRepository;

    public Page<Provider> getProviders(String email, Pageable pageable) {
        return providerRepository.getProvidersInvited(email, pageable);
    }

    public Page<Provider> filter(String email, String username, String businessName, String rut, Integer score, ECategory category, Pageable pageable) {
        if (score != null) {
            List<Provider> providerList = providerRepository.filterList(username, businessName, rut, category, email).stream().filter(provider -> provider.getScore().getAverage() == score).toList();
            int lowerIndex = pageable.getPageNumber() * pageable.getPageSize();
            int upperIndex = lowerIndex + pageable.getPageSize();
            List<Provider> finalList = Collections.emptyList();
            if (providerList.size() >= lowerIndex) {
                finalList = providerList.subList(lowerIndex, Math.min(providerList.size(), upperIndex));
            }
            return new PageImpl<>(finalList, pageable, providerList.size());
        } else {
            return providerRepository.filterPage(username, businessName, rut, category, email, pageable);
        }
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
