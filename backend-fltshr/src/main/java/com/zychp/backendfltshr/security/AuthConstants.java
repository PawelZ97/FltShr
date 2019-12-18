package com.zychp.backendfltshr.security;

class AuthConstants {
    final static String LOGIN_URL = "/login";
    final static String SECRET = "RandomSecret";
    final static long EXPIRATION_TIME = 86_400_000;
    final static String TOKEN_PREFIX = "Bearer ";
    final static String HEADER = "Authorization";
}
