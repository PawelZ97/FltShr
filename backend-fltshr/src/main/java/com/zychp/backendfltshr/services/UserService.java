package com.zychp.backendfltshr.services;

import com.zychp.backendfltshr.dtos.user.UserNameDTO;
import com.zychp.backendfltshr.dtos.user.UserRegistrationDTO;
import com.zychp.backendfltshr.model.user.Role;
import com.zychp.backendfltshr.model.user.User;
import com.zychp.backendfltshr.repos.user.UserRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final JavaMailSender emailSender;
    private final static long TOKEN_EXPIRATION_TIME = 86_400_000;
    @Value("${VERIFY_TOKEN_SECRET}")
    private String token_secret;
    @Value("${fltshr.address}")
    private String app_adress;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserNameDTO> getUsers() {
        List<User> users = userRepository.findAllByDeactivatedIsFalseAndEmailVerifiedIsTrue();
        users.remove(0);
        log.info("getUsers()");
        return users.stream().map(UserNameDTO::valueOf).collect(Collectors.toList());
    }

    public String registerNewUser(UserRegistrationDTO userRegistrationDTO) {
        if (userRepository.existsUserByUsernameEqualsOrEmailEquals(userRegistrationDTO.getUsername(),
                userRegistrationDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username or email already used");
        }

        User registeredUser = new User();
        registeredUser.setUsername(userRegistrationDTO.getUsername());
        registeredUser.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        registeredUser.setEmail(userRegistrationDTO.getEmail());
        registeredUser.setRole(Role.ROLE_USER);
        registeredUser.setRegistration_date(new Timestamp(TimeZoneOffsetUtils.getTimeZoneWithOffset()));
        registeredUser.setEmailVerified(false);

        userRepository.save(registeredUser);

        String verify_token = Jwts.builder()
                .setSubject(userRegistrationDTO.getUsername())
                .setExpiration(new Date(TimeZoneOffsetUtils.getTimeZoneWithOffset() + TOKEN_EXPIRATION_TIME))
                .setIssuer("FltShr")
                .signWith(SignatureAlgorithm.HS512, token_secret)
                .compact();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userRegistrationDTO.getEmail());
        message.setSubject("FltShr - Potwierdź swój email");
        message.setText("Cześć " + userRegistrationDTO.getUsername() + ". Aby zakończyć rejestrację kliknij: "
                + "http://" + app_adress + "/register/emailconfirm?token=" + verify_token);
        emailSender.send(message);
        log.info("registerNewUser(): userRegistrationDTO: {}", userRegistrationDTO);
        return "Verification Email Send";
    }

    public String emailConfirm(String token) {
        Jws<Claims> jws;
        try {
            jws = Jwts.parser()
                    .setSigningKey(token_secret)
                    .parseClaimsJws(token);
        } catch (JwtException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something went wrong");
        }
        log.info("emailConfirm(): jwsSubject: {}", jws.getBody().getSubject());
        User user = userRepository.findByUsernameAndDeactivatedIsFalse(jws.getBody().getSubject());
        user.setEmailVerified(true);
        userRepository.save(user);
        return "Email Potwierdzony. Możesz się zalogować";
    }
}
