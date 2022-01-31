package com.weclusive.barrierfree.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.FollowRepository;
import com.weclusive.barrierfree.repository.OthersFeedRepository;
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
	
	@Autowired
	OthersFeedRepository othersFeedRepository;

	@Override
	public Map<String, Object> readOthersFeed(int otherUserSeq) {

		Map<String, Object> obj = new HashMap<>();

		Optional<User> user = userRepository.findAllByUserSeq(otherUserSeq);

		if (user.isPresent()) {
			obj.put("userNickname", user.get().getUserNickname());
			obj.put("userPhoto", user.get().getUserPhoto());
			obj.put("writePost", postRepository.countByUserSeq(otherUserSeq));
			obj.put("following", followRepository.countFollowing(otherUserSeq));
			obj.put("follower", followRepository.countFollower(otherUserSeq));
			return obj;
		}
		return null;
	}

	@Override
	public Map<String, Object> readOthersPost(int otherUserSeq, int userSeq) {
		// otherUserSeq : 상대방 
		// userSeq: 현재 사용자 
		List<Post> posts = othersFeedRepository.findByUserSeq(otherUserSeq); // 상대방이 작성한 글
		
		posts.forEach(post->{
			System.out.println(post.getPostContent());
		});
		
		

		return null;
	}
	

}
