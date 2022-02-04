package com.weclusive.barrierfree.util;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

//@EnableWebSecurity
//public class EmailSecurityConfig extends WebSecurityConfigurerAdapter {
//	
//	@Override
//	public void configure(HttpSecurity http) throws Exception{
//		http.csrf().disable()
//			.authorizeRequests()
//			.antMatchers("/user/***")
//			.permitAll()
//			.anyRequest()
//			.authenticated();
//	}
//	
//}
