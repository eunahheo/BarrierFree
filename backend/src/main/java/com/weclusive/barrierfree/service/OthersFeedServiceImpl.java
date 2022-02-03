package com.weclusive.barrierfree.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Follow;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.FollowRepository;
import com.weclusive.barrierfree.repository.OthersFeedRepository;
import com.weclusive.barrierfree.repository.PostImpairmentRepository;
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

	@Autowired
	PostImpairmentRepository postImpairmentRepository;

	@Autowired
	ScrapRepository scrapRepository;

	@Override
	public Map<String, Object> readOthersFeed(int userSeq, int otherUserSeq) {

		Map<String, Object> obj = new HashMap<>();

		Optional<User> user = userRepository.findAllByUserSeq(otherUserSeq);

		if (user.isPresent()) {
			obj.put("userNickname", user.get().getUserNickname());
			obj.put("userPhoto", user.get().getUserPhoto());
			obj.put("writePost", postRepository.countByUserSeq(otherUserSeq));
			obj.put("following", followRepository.countFollowing(otherUserSeq));
			obj.put("follower", followRepository.countFollower(otherUserSeq));
		}
		Follow follow = followRepository.findByUserSeqAndFollowingSeqAndDelYn(userSeq, otherUserSeq, 'n');
		if(follow == null) obj.put("isfollow", 'n');
		else obj.put("isfollow", 'y');
		
		return obj;
	}

	@Override
	public List<Map<String, Object>> readOthersPost(int otherUserSeq, int userSeq) {
		// otherUserSeq : 상대방
		// userSeq: 현재 사용자
		List<Map<String, Object>> result = new LinkedList<>();

		List<Post> posts = othersFeedRepository.findByUserSeq(otherUserSeq); // 상대방이 작성한 글
		posts.forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_scrap", post.getPostScrap());
			obj.put("post_photo", post.getPostPhoto());
//			obj.put("post_photo_alt", post.getPost_photo_alt());
			obj.put("post_location", post.getPostLocation());
			obj.put("post_address", post.getPostAddress());
			obj.put("post_lat", post.getPostLat());
			obj.put("post_lng", post.getPostLng());
			obj.put("post_point", post.getPostPoint());
			obj.put("content_id", post.getContentId());
			obj.put("del_yn", post.getDelYn());
			obj.put("reg_dt", post.getRegDt());
			obj.put("reg_id", post.getRegId());
			obj.put("mod_dt", post.getModDt());
			obj.put("mod_id", post.getModId());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';
			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}

	// otherUserSeq가 팔로잉하는 목록
	@Override
	public List<Map<String, Object>> readOthersFollowing(int otherUserSeq, int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();

		List<Follow> followingList = followRepository.findByUserSeq(otherUserSeq);
		followingList.forEach(following -> {
			Map<String, Object> obj = new HashMap<>();
			User user = userRepository.findByUserSeq(following.getFollowingSeq());
//			obj.put("userId", user.getUserId());
			obj.put("userPhoto", user.getUserPhoto());
			obj.put("userNickname", user.getUserNickname());
			obj.put("userSeq", following.getFollowingSeq());

			Follow isFollowing = (Follow) followRepository.findByDelYnAndUserSeqAndFollowingSeq(userSeq,
					following.getFollowingSeq());
			if (isFollowing == null) {
				obj.put("followingYn", 'n');
			} else {
				obj.put("followingYn", 'y');
			}
			result.add(obj);
		});
		return result;
	}

	@Override
	public List<Map<String, Object>> readOthersFollower(int otherUserSeq, int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();

		List<Follow> followingList = followRepository.findByFollowingSeq(otherUserSeq);
		followingList.forEach(following -> {
			Map<String, Object> obj = new HashMap<>();
			User user = userRepository.findByUserSeq(following.getUserSeq());
//			obj.put("userId", user.getUserId());
			obj.put("userPhoto", user.getUserPhoto());
			obj.put("userNickname", user.getUserNickname());
			obj.put("userSeq", following.getUserSeq());

			Follow isFollowing = (Follow) followRepository.findByDelYnAndUserSeqAndFollowingSeq(userSeq,
					following.getUserSeq());
			if (isFollowing == null) {
				obj.put("followingYn", 'n');
			} else {
				obj.put("followingYn", 'y');
			}
			result.add(obj);
		});
		return result;
	}
}