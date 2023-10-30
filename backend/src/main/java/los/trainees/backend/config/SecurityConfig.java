package los.trainees.backend.config;

import los.trainees.backend.config.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/login/**").permitAll()
                        .requestMatchers("/category/**").permitAll()
                        .requestMatchers("/provider/**").hasRole("ADMIN")
                        .requestMatchers("/provider/**").hasRole("PROVIDER")
                )
                .addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(withDefaults());

        return http.build();
    }
}
