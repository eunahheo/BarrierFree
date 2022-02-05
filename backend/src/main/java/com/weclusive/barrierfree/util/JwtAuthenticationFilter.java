package com.weclusive.barrierfree.util;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.weclusive.barrierfree.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private CustomUserDetailsService service;

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse,
			FilterChain filterChain) throws ServletException, IOException {
		
		String authorizationHeader = httpServletRequest.getHeader("Authorization"); // 헤더
		
		String token = null;
		String userId = null;
		
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			token = authorizationHeader.substring(7); // access-token 
			userId = jwtUtil.extractUserId(token);  // access-token에서 userId 추출
		}
		
		// userId가 있고, SecurityContextHolder.getContext().getAuthentication()이 비어 있다면 최초 인증이라는 뜻!
		if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			
			UserDetails userDetails = service.loadUserByUsername(userId);

			if (jwtUtil.validateToken(token, userDetails)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
				= new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
					.setDetails(new WebAuthenticationDetailsSource()
					.buildDetails(httpServletRequest));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		filterChain.doFilter(httpServletRequest, httpServletResponse);
	}
}