package com.weclusive.barrierfree.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.service.SearchService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
@RequestMapping("/search")
@Api("키워드 검색 기능")
public class SeachController {
//	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	SearchService searchService;

	@GetMapping("/user")
	@ApiOperation(value = "키워드로 사용자 검색", notes = "사용자 닉네임 검색 - 사용자 사진, 사용자 닉네임, 사용자 seq 반환")
	public ResponseEntity<Object> searchUser(@RequestParam String keyword, @RequestParam int page, @RequestParam int count) {
		List<Map<String, Object>> users = searchService.searchUser(keyword, count);

		if (users != null) {
			return new ResponseEntity<>(users, HttpStatus.OK);
		}
		return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/post")
	@ApiOperation(value = "키워드로 사용자 게시글 검색", notes = "사용자 게시글 검색 - 스크랩 여부, 제목, 내용, 게시글 번호, 지역, 장애정보, 사진, 사용자 seq 반환")
	public ResponseEntity<Object> searchPost(@RequestParam String keyword, @RequestParam int page, @RequestParam int count, @RequestParam int userSeq) {
		List<Map<String, Object>> posts = searchService.searchPost(keyword, userSeq, count);

		if (posts != null) {
			return new ResponseEntity<>(posts, HttpStatus.OK);
		}
		return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
	}

}
