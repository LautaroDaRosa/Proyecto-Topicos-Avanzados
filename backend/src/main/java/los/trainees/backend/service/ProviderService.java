package los.trainees.backend.service;

import los.trainees.backend.entity.Provider;
import los.trainees.backend.enums.ECategory;
import los.trainees.backend.repository.IProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProviderService {

    @Autowired
    private IProviderRepository providerRepository;

    public Page<Provider> getProviders(Pageable pageable) {
        return providerRepository.findAll(pageable);
    }

    public Page<Provider> filter(String name, String businessName, String rut, Integer score, ECategory category, Pageable pageable) {
        return providerRepository.filter(name, businessName, rut, score, category, pageable);
    }
}
