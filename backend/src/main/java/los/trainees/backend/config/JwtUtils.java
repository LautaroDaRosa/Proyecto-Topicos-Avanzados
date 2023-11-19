package los.trainees.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import los.trainees.backend.enums.EJwtType;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtils {

    private final String secret;
    private final long expirationInMinutes;

    public static final String USERNAME_CLAIM = "username";

    public static final String ROLE_CLAIM = "role";

    public static final String JWT_TYPE_CLAIM = "type";

    public static final String SENDER_USER_EMAIL_CLAIM = "senderUserEmail";

    public JwtUtils(String secret, long expirationInMinutes) {
        this.secret = secret;
        this.expirationInMinutes = expirationInMinutes;
    }

    public String generateLoginToken(String username, String role) {
        return generateToken(new HashMap<>(), username, role, EJwtType.LOGIN);
    }

    public String generateEmailInvitationToken(String username, String role, String senderUserEmail, EJwtType jwtType) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(SENDER_USER_EMAIL_CLAIM, senderUserEmail);
        return generateToken(claims, username, role, jwtType);
    }

    public String generateToken(Map<String, Object> claims, String username, String role, EJwtType jwtType) {
        claims.put(USERNAME_CLAIM, username);
        claims.put(ROLE_CLAIM, role);
        claims.put(JWT_TYPE_CLAIM, jwtType);
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expirationInMinutes * 60000);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Jws<Claims> claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
        return claims.getBody().getSubject();
    }

    public String getClaimFromToken(String token, String claim) {
        Jws<Claims> claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
        return (String) claims.getBody().get(claim);
    }
}