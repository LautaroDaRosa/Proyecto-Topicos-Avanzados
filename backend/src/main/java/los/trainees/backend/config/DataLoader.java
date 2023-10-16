package los.trainees.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.stream.Collectors;

@Component
@Profile("!test")
public class DataLoader {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void init() {
        executeSqlScript();
    }

    private void executeSqlScript() {
        try {
            Resource resource = new ClassPathResource("db/init.sql");
            InputStream inputStream = resource.getInputStream();
            String[] sqlScriptArray = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                    .lines()
                    .collect(Collectors.joining("\n")).split(";");
            Arrays.stream(sqlScriptArray).forEach(script -> jdbcTemplate.execute(script));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
