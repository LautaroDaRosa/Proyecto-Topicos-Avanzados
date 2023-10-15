package los.trainees.backend.controller;

import los.trainees.backend.entity.Provider;
import los.trainees.backend.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/provider")
public class ProviderController {

    private ProviderService providerService;

    @Autowired
    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Provider>> getAllProviders(){
        return ResponseEntity.ok(providerService.getProviders());
    }

}
