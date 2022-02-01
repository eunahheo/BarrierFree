package com.weclusive.barrierfree.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.UserRepository;

@Service
public class SearchServiceImpl implements SearchService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public List<Map<String, Object>> searchUser(String keyword, int count) {
		List<Map<String, Object>> result = new ArrayList<>();

		List<User> users = userRepository.findByUserNicknameContaining(keyword);

		users.forEach(user -> {
			Map<String, Object> map = new HashMap<>();
			map.put("userSeq", user.getUserSeq());
			map.put("userNickname", user.getUserNickname());
			map.put("userPhoto", user.getUserPhoto());
			result.add(map);
		});
		return result;
	}

	@Override
	public List<Map<String, Object>> searchTour(String keyword, int count) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchRestaurant(String keyword, int count) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchAccommodation(String keyword, int count) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchEvent(String keyword, int count) {
		// TODO Auto-generated method stub
		return null;
	}

}
