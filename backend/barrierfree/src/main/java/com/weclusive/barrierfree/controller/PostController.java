package com.weclusive.barrierfree.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.repository.FollowRepository;
import com.weclusive.barrierfree.repository.PostImpairmentRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/post")
@Api("메인화면 게시글")
public class PostController {
	PostRepository postRepository;
	PostImpairmentRepository postImpairmentRepository;
	ScrapRepository scrapRepository;
	FollowRepository followRepository;
	
	@GetMapping("/all")
	@ApiOperation(value="게시글 전체목록 조회", notes="모든 게시물의 모든 정보를 반환한다.", response=List.class)
	public List<Map<String, Object>> listPost(int user_seq) {
		List<Map<String, Object>> result = new LinkedList<>();
		postRepository.findAll().forEach(post -> {
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
//			List<PostImpairment> list = postImpairmentRepository.findByPostSeq(post.getPost_seq());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);
			
			char scrap_yn = 'n';		
			// 현재 사용자의 seq를 가져오는 api 필요
			if(scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n',"0", user_seq, post.getPostSeq())>0)
				scrap_yn = 'y';
			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}
	
	@GetMapping("/recently")
	@ApiOperation(value="게시글 최신순으로 조회", notes="등록된 순서대로 상위 100개의 게시글을 반환한다.", response=List.class)
	public List<Map<String, Object>> listRecently(int user_seq) {
		List<Map<String, Object>> result = new LinkedList<>();
		postRepository.findTop100ByDelYnOrderByRegDtDesc('n').forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
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
			if(scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n',"0", user_seq, post.getPostSeq())>0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}
	
	@GetMapping("/scrap")
	@ApiOperation(value="누적된 스크랩 순으로 조회", notes="누적된 스크랩 순서대로 상위 100개의 게시글을 반환한다.", response=List.class)
	public List<Map<String, Object>> listScrap(int user_seq) {
		List<Map<String, Object>> result = new LinkedList<>();
		postRepository.findTop100ByDelYnOrderByPostScrapDesc('n').forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
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
			if(scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n',"0", user_seq, post.getPostSeq())>0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}
	
	@GetMapping("/weekscrap")
	@ApiOperation(value="현재 시간 기준 일주일 동안의 스크랩 순으로 조회", notes="현재 시간을 기준으로 일주일 전 까지 작성된 게시글 중 순서대로 상위 100개의 게시글을 반환한다.", response=List.class)
	public List<Map<String, Object>> listWeekScrap(int user_seq) {
		List<Map<String, Object>> result = new LinkedList<>();
		String startTime = LocalDateTime.now().minusDays(7).toString().replace("T", " ").substring(0,19);
		String endTime = LocalDateTime.now().toString().replace("T", " ").substring(0,19);
		postRepository.findTop100ByDelYnAndRegDtBetweenOrderByPostScrapDesc('n',startTime, endTime).forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
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
			if(scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n',"0", user_seq, post.getPostSeq())>0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}
	
	@GetMapping("/follow")
	@ApiOperation(value="팔로우 한 계정들의 게시글 최신순 조회", notes="팔로우 한 계정들의 게시글을 최신순으로 상위 100개의 게시글을 반환한다.", response=List.class)
	public List<Map<String, Object>> listFollow(int user_seq) {
		List<Map<String, Object>> result = new LinkedList<>();
		// 현재 사용자의 seq를 불러오는 API 필요
		postRepository.findFollowPost(1).forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
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
			if(scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n',"0", user_seq, post.getPostSeq())>0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}
}
