package los.trainees.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtGenerator {

    private final String secret;
    private final long expirationInMinutes;

    public JwtGenerator(String secret, long expirationInMinutes) {
        this.secret = secret;
        this.expirationInMinutes = expirationInMinutes;
    }

    public String generateToken(String username, String role) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expirationInMinutes * 60000);
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("role", role);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Jws<Claims> claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token);
        return claims.getBody().getSubject();
    }

    public String getRoleFromToken(String token) {
        Jws<Claims> claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token);
        return (String) claims.getBody().get("role");
    }
}