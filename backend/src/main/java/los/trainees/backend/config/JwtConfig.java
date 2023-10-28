package los.trainees.backend.config;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    /*
    Esto es si se quiere poner estas variables en un archivo properties afuera, es mas seguro pero bueno
    @Value("${jwt.secret}")
    private String secret = "Bananero";

    @Value("${jwt.expiration}")
    private int expiration = 100000;
    */

    private final String secret = "mi_clave_secreta";
    private final int expiration = 3600;

    @Bean
    public JwtParser jwtParser() {
        return Jwts.parser().setSigningKey(secret);
    }

    @Bean
    public JwtGenerator jwtGenerator() {
        return new JwtGenerator(secret, expiration);
    }
}
