package los.trainees.backend.service;

import los.trainees.backend.entity.Provider;
import los.trainees.backend.repository.IProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService {

    private IProviderRepository providerRepository;

    @Autowired
    public ProviderService(IProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    public List<Provider> getProviders() {
        return providerRepository.getAllProviders();
    }
}
