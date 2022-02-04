package com.weclusive.barrierfree.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.service.OthersFeedService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/othersFeed")
@Api("다른 사람 피드 보기")
public class OthersFeedController {
//	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private OthersFeedService othersfeedService;

	@GetMapping("/main")
	@ApiOperation(value = "피드 상단 내용 보기", notes = "프로필 사진, 닉네임, 게시글 수, 팔로잉 수, 팔로워 수를 반환한다.", response = List.class)
	// 상대방의 userSeq 보내기
	public ResponseEntity<Object> mainFeed(@RequestParam int userSeq, @RequestParam int otherUserSeq) {
		Map<String, Object> result = othersfeedService.readOthersFeed(userSeq, otherUserSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/postAll")
	@ApiOperation(value = "상대방 게시글 보기", notes = "상대방의 게시글을 스크랩 여부를 포함하여 반환한다.", response = List.class)
	// 상대방의 userSeq 보내기
	public ResponseEntity<Object> postAll(@RequestParam int userSeq, @RequestParam int otherUserSeq) {
		List<Map<String, Object>> result = othersfeedService.readOthersPost(otherUserSeq, userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(" : 해당 게시글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/following")
	@ApiOperation(value = "상대방 팔로잉 목록 보기", notes = "상대방의 팔로잉 목록과 현재 사용자가 해당 유저들을 팔로잉 했는지 여부를 포함하여 반환한다.", response = List.class)
	// 상대방의 userSeq 보내기
	public ResponseEntity<Object> followingList(@RequestParam int userSeq, @RequestParam int otherUserSeq) {
		List<Map<String, Object>> result = othersfeedService.readOthersFollowing(otherUserSeq, userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(" : 팔로잉 한 유저가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/follower")
	@ApiOperation(value = "상대방 팔로워 목록 보기", notes = "상대방의 팔로워 목록과 현재 사용자가 해당 유저들을 팔로잉 했는지 여부를 포함하여 반환한다.", response = List.class)
	// 상대방의 userSeq 보내기
	public ResponseEntity<Object> followerList(@RequestParam int userSeq, @RequestParam int otherUserSeq) {
		List<Map<String, Object>> result = othersfeedService.readOthersFollower(otherUserSeq, userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(" : 팔로워가가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
		}
	}
}
