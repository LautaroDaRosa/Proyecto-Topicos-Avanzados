package los.trainees.backend.mapper;

import los.trainees.backend.dto.RProviderReduced;
import los.trainees.backend.entity.Provider;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

@Mapper
public interface ProviderMapper {

    RProviderReduced toDtoReduced(Provider provider);

    default Page<RProviderReduced> pageToDtoReduced(Page<Provider> page) {
        return page.map(this::toDtoReduced);
    }

}