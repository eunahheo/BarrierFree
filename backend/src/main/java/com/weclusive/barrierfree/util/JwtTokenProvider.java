package com.weclusive.barrierfree.util;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.TokenRepository;
import com.weclusive.barrierfree.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

	public static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

	private String secretKey = "barrierfree";

	static final Long EXPIRE_MINUTES = 1000L * 60 * 60; // access token 유효시간 1시간

	static final Long REFRESH_EXPIRE_MINUTES = EXPIRE_MINUTES * 24 * 14; // refresh token 유효시간 2주

	@Autowired
	private UserService userService;

	private byte[] generateKey() {
		byte[] key = null;
		try {
			key = secretKey.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			if (logger.isInfoEnabled()) {
				e.printStackTrace();
			} else {
				logger.error("Making JWT Key Error ::: {}", e.getMessage());
			}
		}

		return key;
	}

	// JWT 토큰 생성
	public String createToken(String userId) {
		Claims claims = Jwts.claims().setSubject(userId); // JWT payload에 저장되는 정보 단위
		Date now = new Date();
		return Jwts.builder().setHeaderParam("typ", "JWT").setClaims(claims)
				.setHeaderParam("redDate", System.currentTimeMillis())
				.setExpiration(new Date(now.getTime() + EXPIRE_MINUTES)) // 만료 시간 설정
				.signWith(SignatureAlgorithm.HS256, this.generateKey()).compact();
	}

	// jwt refresh 토큰 생성
	public String createRefreshToken() {
		return Jwts.builder().setHeaderParam("typ", "JWT").setHeaderParam("redDate", System.currentTimeMillis())
				.setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRE_MINUTES))
				.signWith(SignatureAlgorithm.HS256, this.generateKey()).compact();
	}

	// JWT 토큰에서 인증 정보 조회
	public Authentication getAuthentication(String token) {
		User user = userService.findByUserId(this.getUserId(token));
		return new UsernamePasswordAuthenticationToken(user, "");
	}

	// 토큰에서 회원 정보 추출
	public String getUserId(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}

	public String resolveToken(HttpServletRequest req) {
		return req.getHeader("X-AUTH-TOKEN");
	}

	// 전달 받은 토큰이 제대로 생성된것인지 확인 하고 문제가 있다면 UnauthorizedException을 발생.
	public boolean isUsable(String jwt) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt);
			return true;
		} catch (Exception e) {
			if (logger.isInfoEnabled()) {
				e.printStackTrace();
			} else {
				logger.error(e.getMessage());
			}
//            throw new UnauthorizedException();
//            개발환경
			return false;
		}
	}

	public boolean isValidRefreshToken(String token) {
		try {
			Claims accessClaims = getClaimsToken(token);
			System.out.println("Access expireTime: " + accessClaims.getExpiration());
			System.out.println("Access userId: " + accessClaims.get("userId"));
			return true;
		} catch (ExpiredJwtException exception) {
			System.out.println("Token Expired UserID : " + exception.getClaims().getSubject());
			return false;
		} catch (JwtException exception) {
			System.out.println("Token Tampered");
			return false;
		} catch (NullPointerException exception) {
			System.out.println("Token is null");
			return false;
		}
	}

	private Claims getClaimsToken(String token) {
		return Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).parseClaimsJws(token)
				.getBody();
	}
}