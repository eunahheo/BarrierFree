package com.weclusive.barrierfree.service;

import com.weclusive.barrierfree.dto.Impairment;
import com.weclusive.barrierfree.entity.*;

public interface UserService {

	// 회원 가입
	public void registUser(User user) throws Exception;

	public void registImpairment(String userId, Impairment impairment);

	public void sendEmailwithUserKey(String email, String id) throws Exception;

	public User email_cert_check(String userNickname);

	public void email_certified_update(User user);

	public boolean encodePassword(User loginUser) throws Exception;

	// User
	public User findByUserId(String userId);

	public User findByUserNickname(String userNickname);

	public User findByUserEmail(String userEmail);

	public void createRefreshToken(User user);

	// Token
	public String createAccessToken(User user);

	// Kakao
	public String getKakaoAccessToken(String code);

	public String getKakaoEmail(String token) throws Exception;

	public void registKakaoUser(User user, String userEmail);

}
