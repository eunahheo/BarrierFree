package com.weclusive.barrierfree.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.FollowRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.UserRepository;

@Service
public class OthersFeedServiceImpl implements OthersFeedService {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	FollowRepository followRepository;
	
	@Autowired
	ScrapRepository scarpRepository;
	
	@Override
	public List<Map<String, Object>> readOthersFeed(int userSeq){
		List<Map<String, Object>> result = new LinkedList<>();
		
		Map<String, Object> obj = new HashMap<>();
		
		Optional<User> user = userRepository.findAllByUserSeq(userSeq);
		
		if(user.isPresent()) {
			obj.put("userNickname", user.get().getUserNickname());
			obj.put("userPhoto", user.get().getUserPhoto());
			obj.put("writePost", postRepository.countByUserSeq(userSeq));
			obj.put("following", followRepository.countFollowing(userSeq));
			obj.put("follower", followRepository.countFollower(userSeq));
			result.add(obj);
			return result;
		}
		return null;
		
	}
	
	
}
