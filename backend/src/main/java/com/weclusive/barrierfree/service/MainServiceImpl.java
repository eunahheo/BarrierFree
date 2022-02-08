package com.weclusive.barrierfree.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.repository.PostImpairmentRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.TimeUtils;

@Service
public class MainServiceImpl implements MainService {

	@Autowired
	PostRepository postRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PostImpairmentRepository postImpairmentRepository;

	@Autowired
	ScrapRepository scrapRepository;

	@Override
	public List<Map<String, Object>> readAllPost(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		postRepository.findAll().forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("postSeq", post.getPostSeq());
			obj.put("UserSeq", post.getUserSeq());
			obj.put("postTitle", post.getPostTitle());
			obj.put("postContent", post.getPostContent());
			obj.put("postScrap", post.getPostScrap());
			obj.put("postPhoto", post.getPostPhoto());
			obj.put("postAlt", post.getPostAlt());
			obj.put("postLocation", post.getPostLocation());
			obj.put("postAddress", post.getPostAddress());
			obj.put("postLat", post.getPostLat());
			obj.put("postLng", post.getPostLng());
			obj.put("postPoint", post.getPostPoint());
			obj.put("contentId", post.getContentId());
			obj.put("delYn", post.getDelYn());
			obj.put("regDt", post.getRegDt());
			obj.put("regId", post.getRegId());
			obj.put("modDt", post.getModDt());
			obj.put("modId", post.getModId());
//			List<PostImpairment> list = postImpairmentRepository.findByPostSeq(post.getpostSeq());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrapYn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrapYn = 'y';
			obj.put("scrapYn", scrapYn);
			result.add(obj);
		});
		return result;
	}

	@Override
	public List<Map<String, Object>> readPostlatest(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		postRepository.findTop100ByDelYnOrderByRegDtDesc('n').forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("postSeq", post.getPostSeq());
			obj.put("UserSeq", post.getUserSeq());
			obj.put("postTitle", post.getPostTitle());
			obj.put("postContent", post.getPostContent());
			obj.put("postScrap", post.getPostScrap());
			obj.put("postPhoto", post.getPostPhoto());
			obj.put("postAlt", post.getPostAlt());
			obj.put("postLocation", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrapYn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrapYn = 'y';

			obj.put("scrapYn", scrapYn);
			result.add(obj);
		});
		return result;
	}

	// 스크랩 많은 순
	@Override
	public List<Map<String, Object>> readPostScrap(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		postRepository.findTop100ByDelYnOrderByPostScrapDesc('n').forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("postSeq", post.getPostSeq());
			obj.put("UserSeq", post.getUserSeq());
			obj.put("postTitle", post.getPostTitle());
			obj.put("postContent", post.getPostContent());
			obj.put("postScrap", post.getPostScrap());
			obj.put("postPhoto", post.getPostPhoto());
			obj.put("postAlt", post.getPostAlt());
			obj.put("postLocation", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrapYn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrapYn = 'y';

			obj.put("scrapYn", scrapYn);
			result.add(obj);
		});
		return result;
	}

	// 이번주 스크랩 순
	@Override
	public List<Map<String, Object>> readPostWeek(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		String startTime = LocalDateTime.now().minusDays(7).toString().replace("T", " ").substring(0, 19);
		String endTime = TimeUtils.curTime();
		postRepository.findTop100ByDelYnAndRegDtBetweenOrderByPostScrapDesc('n', startTime, endTime).forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("postSeq", post.getPostSeq());
			obj.put("UserSeq", post.getUserSeq());
			obj.put("postTitle", post.getPostTitle());
			obj.put("postContent", post.getPostContent());
			obj.put("postScrap", post.getPostScrap());
			obj.put("postPhoto", post.getPostPhoto());
			obj.put("postAlt", post.getPostAlt());
			obj.put("postLocation", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrapYn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrapYn = 'y';

			obj.put("scrapYn", scrapYn);
			result.add(obj);
		});
		return result;
	}

	// 팔로워 게시글
	@Override
	public List<Map<String, Object>> readPostFollowing(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		postRepository.findFollowPost(userSeq).forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("postSeq", post.getPostSeq());
			obj.put("UserSeq", post.getUserSeq());
			obj.put("postTitle", post.getPostTitle());
			obj.put("postContent", post.getPostContent());
			obj.put("postScrap", post.getPostScrap());
			obj.put("postPhoto", post.getPostPhoto());
			obj.put("postAlt", post.getPostAlt());
			obj.put("postLocation", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrapYn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrapYn = 'y';

			obj.put("scrapYn", scrapYn);
			result.add(obj);
		});
		return result;
	}

}
