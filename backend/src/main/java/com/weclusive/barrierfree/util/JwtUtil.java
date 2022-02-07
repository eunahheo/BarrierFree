package com.weclusive.barrierfree.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtUtil {
	private String secretKey = "barrierfree";

	static final Long EXPIRE_MINUTES = 1000L * 60 * 30; // access token 유효시간 30분

	// token에서 userId 값 추출
	public String extractUserId(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	// token에서 모든 Claim 추출
	private Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}

	public String generateAccessToken(String userId) {
		Map<String, Object> claims = new HashMap<>();
		return createAccessToken(claims, userId);
	}

	// Access Token 만들기
	private String createAccessToken(Map<String, Object> claims, String subject) {
		System.out.println("원래 만료 시간 : "+ new Date(System.currentTimeMillis() + EXPIRE_MINUTES));
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(subject)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRE_MINUTES))
				.signWith(SignatureAlgorithm.HS256, secretKey).compact();
	}
	
	// token 유효성 확인
	// 아이디 확인, 유효시간 확인
    //유효한 토큰인지 확인
    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            final String userId = extractUserId(token);
			if (userId.equals(userDetails.getUsername())) {
				if(claims.getBody().getExpiration().before(new Date(System.currentTimeMillis() + 1000L * 60 * 5))) { // 만료시간이 5분 이하로 남으면
	                return false;
				} 
            }
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
