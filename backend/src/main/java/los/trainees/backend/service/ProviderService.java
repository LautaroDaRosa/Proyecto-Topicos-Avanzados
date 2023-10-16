package los.trainees.backend.service;

import los.trainees.backend.entity.Provider;
import los.trainees.backend.repository.IProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageImpl;

import java.util.List;

@Service
public class ProviderService {

    @Autowired
    private IProviderRepository providerRepository;

    public Page<Provider> getProviders(Pageable pageable) {
        return providerRepository.findAll(pageable);
    }

    public Page<Provider> filter(String name, String businessName, String rut, Integer score, String category, Pageable pageable) {
        List<Provider> filtered = providerRepository.filter(name, businessName, rut, score, category, pageable).stream()
                .filter(provider -> provider.getCategoryList().stream().
                        anyMatch(category1 -> category1.getCategory().toString().equals(category))).toList();
        return new PageImpl<>(filtered);
    }
}
