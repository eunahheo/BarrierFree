package com.weclusive.barrierfree.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.dto.FollowDto;
import com.weclusive.barrierfree.service.FollowService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/sns")
@Api("팔로우 기능 ")
public class FollowController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private FollowService followService;

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
}
