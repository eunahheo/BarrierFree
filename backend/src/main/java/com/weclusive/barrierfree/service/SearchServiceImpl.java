package com.weclusive.barrierfree.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.PostImpairmentRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.UserRepository;

@Service
public class SearchServiceImpl implements SearchService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	PostImpairmentRepository postImpairmentRepository;

	@Autowired
	ScrapRepository scrapRepository;

	// 사용자 닉네임 검색
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

	// 사용자 게시글 검색 - 제목, 내용, 지역
	@Override
	public List<Map<String, Object>> searchPost(String keyword, int userSeq, int count) {
		List<Map<String, Object>> result = new ArrayList<>();

		List<Post> posts = postRepository.findByDelYnAndPostTitleContainingOrPostContentContainingOrPostLocationContaining('n', keyword, keyword, keyword);

		posts.forEach(post -> {
			Map<String, Object> map = new HashMap<>();
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_photo", post.getPostPhoto());
			obj.put("post_location", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';
			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
			result.add(map);
		});
		return result;
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

	@Override
	public List<Map<String, Object>> searchTour(String keyword, int count) {
		// TODO Auto-generated method stub
		return null;
	}

}
