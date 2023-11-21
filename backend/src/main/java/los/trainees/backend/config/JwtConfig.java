package los.trainees.backend.config;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationInMinutes}")
    private int expirationInMinutes;

    @Bean
    public JwtParser jwtParser() {
        return Jwts.parser().setSigningKey(secret);
    }

    @Bean
    public JwtUtils jwtUtils() {
        return new JwtUtils(secret, expirationInMinutes);
    }
}
