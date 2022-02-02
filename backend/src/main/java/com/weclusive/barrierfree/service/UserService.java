package com.weclusive.barrierfree.service;

import com.weclusive.barrierfree.dto.Impairment;
import com.weclusive.barrierfree.dto.UserJoin;
import com.weclusive.barrierfree.dto.UserJoinKakao;
import com.weclusive.barrierfree.dto.UserLoginDto;
import com.weclusive.barrierfree.entity.User;

public interface UserService {

	// 회원 가입
	public void registUser(UserJoin userJoin) throws Exception;

	public void sendEmailwithUserKey(String email, String id) throws Exception;

	public User email_cert_check(String userNickname);

	public void email_certified_update(User user);

	public boolean encodePassword(UserLoginDto loginUser) throws Exception;

	// User
	public User findByUserId(String userId);

	public User findByUserNickname(String userNickname);

	public User findByUserEmail(String userEmail);

	public void createRefreshToken(User user);

	public void sendEmailwithTemp(String userEmail, String userId);
	
	public boolean modifyUser(User user) throws Exception;

	// Token
	public String createAccessToken(User user);

	// Kakao
	public String getKakaoAccessToken(String code);

	public String getKakaoEmail(String token) throws Exception;

	public void registKakaoUser(UserJoinKakao user, String userEmail);

	// 회원의 장애 정보 가져오기
	public Impairment readUserImpairment(int userSeq);

	public User findByUserSeq(int userSeq);


}
