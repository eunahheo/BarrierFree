package com.weclusive.barrierfree.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtUtil {
	private String secret = "barrierfree";

	static final Long EXPIRE_MINUTES = 1000L * 60 * 60; // access token 유효시간 1시간

	static final Long REFRESH_EXPIRE_MINUTES = EXPIRE_MINUTES * 24 * 14; // refresh token 유효시간 2주

	// token에서 userId 값 추출
	public String extractUserId(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	// token에서 유효시간 추출
	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	// token에서 모든 Claim 추출
	private Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	// token 유효시간 확인
	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	public String generateAccessToken(String userId) {
		Map<String, Object> claims = new HashMap<>();
		return createAccessToken(claims, userId);
	}
	
	public String generateRefreshToken(String userId) {
		Map<String, Object> claims = new HashMap<>();
		return createRefreshToken(claims, userId);
	}

	// Access Token 만들기
	private String createAccessToken(Map<String, Object> claims, String subject) {
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(subject)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRE_MINUTES))
				.signWith(SignatureAlgorithm.HS256, secret).compact();
	}
	
	// Refresh Token 만들기
	private String createRefreshToken(Map<String, Object> claims, String subject) {
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(subject)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRE_MINUTES))
				.signWith(SignatureAlgorithm.HS256, secret).compact();
	}

	// token 유효성 확인
	// 아이디 확인, 유효시간 확인
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String userId = extractUserId(token);
		return (userId.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
