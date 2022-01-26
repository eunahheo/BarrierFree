package com.weclusive.barrierfree.service;

import com.weclusive.barrierfree.entity.*;

public interface UserService {

	public void registUser(User user);

	public User findByUserId(String userId);

	public User findByUserNickname(String userNickname);

	public void sendEmailwithUserKey(String email, String id);

	public User email_cert_check(String userNickname);

	public void email_certified_update(User user);

	public boolean encodePassword(User loginUser);

	void createRefreshToken(User user);

	String createAccessToken(User user);

	String getKakaoAccessToken(String code);

	String getKakaoEmail(String token) throws Exception;

	void registKakaoUser(User user, String userEmail);

	public User findByUserEmail(String userEmail);

}
