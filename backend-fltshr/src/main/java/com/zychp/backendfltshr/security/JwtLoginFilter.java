package com.zychp.backendfltshr.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zychp.backendfltshr.constant.AuthConstants;
import com.zychp.backendfltshr.model.user.UserLoginDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    JwtLoginFilter(final AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl(AuthConstants.LOGIN_URL);
    }

    @Override
    public Authentication attemptAuthentication(final HttpServletRequest request,
                                                final HttpServletResponse response) throws AuthenticationException {
        try {
            UserLoginDTO user = new ObjectMapper().readValue(request.getInputStream(), UserLoginDTO.class);
            return authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword(),
                            Collections.emptyList()
                    ));
        } catch (Exception e) {
            e.printStackTrace();
            throw new SecurityException("Attempt authentication exception");
        }
    }

    @Override
    protected void successfulAuthentication(final HttpServletRequest request,
                                            final HttpServletResponse response,
                                            final FilterChain chain,
                                            final Authentication authResult) {
        String username = authResult.getName();

        String roles = authResult
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String token = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + AuthConstants.EXPIRATION_TIME))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .claim("roles", roles)
                .signWith(SignatureAlgorithm.HS512, AuthConstants.SECRET)
                .compact();

        response.setContentType("application/json");
        response.addHeader(AuthConstants.HEADER, AuthConstants.TOKEN_PREFIX + token);
        log.info("successfulAuthentication: {}", username);
    }
}
