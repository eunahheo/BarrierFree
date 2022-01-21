package com.weclusive.barrierfree.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.dao.userDAO;
import com.weclusive.barrierfree.dto.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private userDAO userDao;
	
	@Override
	public List<User> allUsers() {
		return userDao.selectUser();
	}

}
