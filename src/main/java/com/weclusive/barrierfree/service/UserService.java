package com.weclusive.barrierfree.service;

import java.util.List;

import com.weclusive.barrierfree.entity.*;

public interface UserService {

	public void registUser(User user);

//	public List<User> allUsers();

	public User findByUserId(String userId);

	public User findByUserNickname(String userNickname);

	public void sendEmailwithUserKey(String email, String id);

	public User email_cert_check(String userNickname);

	public void email_certified_update(User user);

}
