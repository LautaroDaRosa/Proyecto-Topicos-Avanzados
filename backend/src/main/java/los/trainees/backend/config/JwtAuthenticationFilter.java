package los.trainees.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import los.trainees.backend.dto.RUser;
import los.trainees.backend.entity.User;
import los.trainees.backend.mapper.UserMapper;
import los.trainees.backend.service.UserService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
@Log4j2
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtGenerator tokenGenerator;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserService userService;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        if (!request.getMethod().equalsIgnoreCase("OPTIONS")) {
            try {
                String token = extractTokenFromRequest(request);
                String username = tokenGenerator.getUsernameFromToken(token);
                String role = tokenGenerator.getRoleFromToken(token);
                Optional<User> userOptional = userService.findUserByUsername(username);
                RUser rUser = userMapper.toDto(userOptional.get());
                Collection<? extends GrantedAuthority> authorities = parseRole(role);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
                authentication.setDetails(rUser);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                log.error("Error parsing JWT", e);
                sendError(response);
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }

    private void sendError(HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.getWriter().write(objectMapper.writeValueAsString(Map.of("message", "Unauthorized")));
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().contains("/user/login");
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (StringUtils.isNotEmpty(header) && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        throw new IllegalArgumentException();
    }

    private Collection<? extends GrantedAuthority> parseRole(String role) {
        return List.of(new SimpleGrantedAuthority(role));
    }

}
