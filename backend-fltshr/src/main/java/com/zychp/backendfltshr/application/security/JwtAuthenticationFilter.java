package com.zychp.backendfltshr.application.security;

import com.zychp.backendfltshr.domain.security.AuthConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    JwtAuthenticationFilter(final AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(final HttpServletRequest request,
                                    final HttpServletResponse response,
                                    final FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(AuthConstants.HEADER);
        if (header == null || !header.startsWith(AuthConstants.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }
        UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(final HttpServletRequest request) {
        try {
            String token = request.getHeader(AuthConstants.HEADER);
            if (token != null) {
                Claims claims = Jwts
                        .parser()
                        .setSigningKey(AuthConstants.SECRET)
                        .parseClaimsJws(token.replace(AuthConstants.TOKEN_PREFIX, ""))
                        .getBody();
                String username = claims.getSubject();
                List<GrantedAuthority> roles = Arrays.stream(claims.get("roles").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
                if (username != null) {
                    return new UsernamePasswordAuthenticationToken(username, null, roles);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new SecurityException("Authorization exception");
        }
        return null;
    }
}
