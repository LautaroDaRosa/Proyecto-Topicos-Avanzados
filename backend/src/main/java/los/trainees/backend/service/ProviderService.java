package los.trainees.backend.service;

import los.trainees.backend.entity.Provider;
import los.trainees.backend.enums.ECategory;
import los.trainees.backend.repository.IProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService {

    @Autowired
    private IProviderRepository providerRepository;

    public Page<Provider> getProviders(Pageable pageable) {
        return providerRepository.findAll(pageable);
    }

    public Page<Provider> filter(String username, String businessName, String rut, Integer score, ECategory category, Pageable pageable) {
        Page<Provider> dbProviders =  providerRepository.filter(username, businessName, rut, category, pageable);
        List<Provider> list = dbProviders.getContent().stream()
                .filter(provider -> (provider.getScore().getAverage()/10) == score).toList();
        return new PageImpl<>(list,pageable,dbProviders.getTotalElements());
    }
}
