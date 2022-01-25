package com.weclusive.barrierfree.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.PostImpairment;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.PostImpairmentRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.StringUtils;

@Service
public class PostServiceImpl implements PostService {

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
			obj.put("userSeq", post.getUserSeq());
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
//			List<PostImpairment> list = postImpairmentRepository.findByPostSeq(post.getpostSeq());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', "0", userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';
			obj.put("scrap_yn", scrap_yn);
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
			obj.put("userSeq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_scrap", post.getPostScrap());
			obj.put("post_photo", post.getPostPhoto());
//			obj.put("post_photo_alt", post.getPostPhotoAlt());
			obj.put("post_location", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', "0", userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
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
			obj.put("userSeq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_scrap", post.getPostScrap());
			obj.put("post_photo", post.getPostPhoto());
//			obj.put("post_photo_alt", post.getPostPhotoAlt());
			obj.put("post_location", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', "0", userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}

	// 이번주 스크랩 순
	@Override
	public List<Map<String, Object>> readPostWeek(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		String startTime = LocalDateTime.now().minusDays(7).toString().replace("T", " ").substring(0, 19);
		String endTime = curTime();
		postRepository.findTop100ByDelYnAndRegDtBetweenOrderByPostScrapDesc('n', startTime, endTime).forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("postSeq", post.getPostSeq());
			obj.put("userSeq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_scrap", post.getPostScrap());
			obj.put("post_photo", post.getPostPhoto());
//			obj.put("post_photo_alt", post.getPostPhotoAlt());
			obj.put("post_location", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', "0", userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}

	// 팔로워 게시글
	@Override
	public List<Map<String, Object>> readPostFollowing(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		// 현재 사용자의 seq를 불러오는 API 필요
		postRepository.findFollowPost(1).forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("postSeq", post.getPostSeq());
			obj.put("userSeq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_scrap", post.getPostScrap());
			obj.put("post_photo", post.getPostPhoto());
//			obj.put("post_photo_alt", post.getPostPhotoAlt());
			obj.put("post_location", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', "0", userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}

	// 게시글 상세정보 가져오기
	@Override
	public List<Map<String, Object>> readPostDetail(long postSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		Map<String, Object> obj = new HashMap<>();
		obj.put("post", postRepository.findByPostSeq(postSeq));
		obj.put("impairment", postImpairmentRepository.findImpairment(postSeq));
		result.add(obj);
		return result;
	}

	// 게시글 저장하기
	@Override
	public Post save(Post post) {
		postRepository.save(post);
		return post;
	}

	// 게시글 삭제하기 (del_yn을 y로 변경)
	@Override
	public int deleteByPostSeq(long postSeq) {
		Optional<Post> deletePost = postRepository.findByPostSeq(postSeq);
		deletePost.get().setDelYn('y');
		save(deletePost.get());
		return 1;
	}

	// 게시글 수정하기
	// 변경 안되는 값 : photo, scrap, reg_dt, reg_id, post_seq, user_seq
	@Override
	public int updateByPostSeq(long postSeq, Post post, int userSeq) {
		Optional<Post> curPost = postRepository.findById(postSeq);
		String regTime = curTime();

		String userId = returnUserId(userSeq);

		Post updatePost = curPost.get();
		if (StringUtils.isNotBlank(post.getPostTitle()))
			updatePost.setPostTitle(post.getPostTitle());
		if (StringUtils.isNotBlank(post.getPostContent()))
			updatePost.setPostContent(post.getPostContent());
		if (StringUtils.isNotBlank(post.getPostLocation()))
			updatePost.setPostLocation(post.getPostLocation());
		if (StringUtils.isNotBlank(post.getPostAddress()))
			updatePost.setPostAddress(post.getPostAddress());
		if (StringUtils.isNotBlank(post.getPostLat()))
			updatePost.setPostLat(post.getPostLat());
		if (StringUtils.isNotBlank(post.getPostLng()))
			updatePost.setPostLng(post.getPostLng());
		if (StringUtils.isNotBlank(post.getContentId()))
			updatePost.setContentId(post.getContentId());
		updatePost.setPostPoint(post.getPostPoint());
		updatePost.setModDt(regTime);
		updatePost.setModId(userId);

		postRepository.save(updatePost);

		return 1;
	}

	@Override
	public int updatePostImpairmentByPostSeq(long postSeq, PostImpairment pi) {
		int result = 0;
		List<String> curPi = postImpairmentRepository.findImpairment(postSeq);

		// 원래 장애 정보가 하나도 없거나 del_yn='n'인 테이블에 추가할 때
		if (postImpairmentRepository.findPostImpairment(postSeq, pi.getCode()) == 0) {
				System.out.println("no2");
				PostImpairment ppp = pi;
				ppp.setDelYn('n');
				ppp.setRegDt(curTime());
				ppp.setRegId(returnUserIdFromPostSeq(postSeq));
				ppp.setModDt(curTime());
				ppp.setModId(returnUserIdFromPostSeq(postSeq));
				save(ppp);
				result = 1;
			}
		
		for (int i = 0; i < curPi.size(); i++) {
			String impairment = curPi.get(i);
			
			// 원래 목록에 없음 -> 추가하기
			if (postImpairmentRepository.findPostImpairment(postSeq, impairment) == 0) {
				PostImpairment ppp = pi;
				ppp.setDelYn('n');
				ppp.setRegDt(curTime());
				ppp.setRegId(returnUserIdFromPostSeq(postSeq));
				ppp.setModDt(curTime());
				ppp.setModId(returnUserIdFromPostSeq(postSeq));
				save(ppp);
				result = 1;

			}
			// 원래 목록에 있음 -> 삭제하기
			else {
				// 목록에서 del_yn = y로
				Optional<PostImpairment> deletePostImpairment = postImpairmentRepository.findOneByPostSeq(postSeq);
				deletePostImpairment.get().setDelYn('y');
				postImpairmentRepository.save(deletePostImpairment.get());
				result = 2;

			}
		}

		return result;
	}

	// 게시글 장애정보 저장하기
	public PostImpairment save(PostImpairment postImpairment) {
		postImpairmentRepository.save(postImpairment);
		return postImpairment;
	}

	// userSeq -> userId
	public String returnUserId(int userSeq) {
		Optional<User> list = userRepository.findById(userSeq);
		String userId = list.get().getUserId();
		return userId;
	}

	// postSeq -> userId
	public String returnUserIdFromPostSeq(long postSeq) {
		Optional<Post> list = postRepository.findById(postSeq);
		int userSeq = list.get().getUserSeq();
		return returnUserId(userSeq);
	}
	
	// 현재 시간 구하기
	public String curTime() {
		return LocalDateTime.now().toString().replace("T", " ").substring(0, 19);
	}

}
