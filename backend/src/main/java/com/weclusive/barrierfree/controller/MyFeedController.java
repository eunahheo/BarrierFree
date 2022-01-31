package com.weclusive.barrierfree.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.dto.FollowDto;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.service.FollowService;
import com.weclusive.barrierfree.service.MyFeedService;
import com.weclusive.barrierfree.service.PostService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/myFeed")
@Api("내 피드 보기")
public class MyFeedController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private MyFeedService myfeedService;
	
	@Autowired
	private FollowService followService;
	
	@Autowired
	private PostService postService;
	
	// 피드 보기
	@GetMapping("/main")
	@ApiOperation(value = "피드 상단 내용 보기", notes = "프로필 사진, 닉네임, 게시글 수, 팔로잉 수, 팔로워 수, 스크랩 게시글 수를 반환한다.", response = List.class)
	public ResponseEntity<Object> mainFeed(@RequestParam int userSeq) {
		List<Map<String, Object>> result = myfeedService.readMyFeed(userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	// 팔로잉 리스트
	@GetMapping("/following")
	@ApiOperation(value = "팔로잉 목록", notes = "사용자 일련 번호, 프로필 사진, 닉네임을 반환한다.", response = List.class)
	public ResponseEntity<Object> followingList(@RequestParam int userSeq) {
		List<Map<String, Object>> result = myfeedService.readFollowing(userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}
	
	// 팔로워 리스트
	@GetMapping("/follower")
	@ApiOperation(value = "팔로워 목록", notes = "사용자 일련 번호, 프로필 사진, 닉네임을 반환한다.", response = List.class)
	public ResponseEntity<Object> followerList(@RequestParam int userSeq) {
		List<Map<String, Object>> result = myfeedService.readFollower(userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}
	
	
	// 팔로워(팔로우 하기) / 팔로잉(팔로우 취소하기)
	@PostMapping("/follow")
	@ApiOperation(value = "사용자 팔로우", notes = "사용자를 팔로우 하는 기능")
	public ResponseEntity<String> follow(@RequestBody FollowDto followDto) {
		try {
			followService.follow(followDto);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@PostMapping("/unfollow")
	@ApiOperation(value = "사용자 언팔로우", notes = "사용자를 언팔로우 하는 기능")
	public ResponseEntity<String> unfollow(@RequestBody FollowDto followDto) {
		try {
			followService.unfollow(followDto);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
	
	// 게시글 조회하기
	@GetMapping("/post")
	@ApiOperation(value = "작성한 게시글", notes = "작성한 게시글 조회하는 기능")
	public ResponseEntity<Object> readUserPosts(@RequestParam int userSeq) {
		List<Post> result = postService.readUserPosts(userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}
	
}
