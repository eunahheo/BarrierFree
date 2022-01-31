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
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private OthersFeedService othersfeedService;
	
	@GetMapping("/main")
	@ApiOperation(value = "피드 상단 내용 보기", notes = "프로필 사진, 닉네임, 게시글 수, 팔로잉 수, 팔로워 수를 반환한다.", response = List.class)
	public ResponseEntity<Object> mainFeed(@RequestParam int userSeq) {
		List<Map<String, Object>> result = othersfeedService.readOthersFeed(userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL + " : 해당 게시글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
		}
	}
}
