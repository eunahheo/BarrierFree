package com.weclusive.barrierfree.controller;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.service.SearchService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/search")
@Api("키워드 검색 기능")
public class SearchController {
	private static final String FAIL = "fail";

	@Autowired
	SearchService searchService;

	@GetMapping("/user")
	@ApiOperation(value = "키워드로 사용자 검색", notes = "사용자 닉네임 검색 - 사용자 사진, 사용자 닉네임, 사용자 seq 반환")
	public ResponseEntity<Object> searchUser(@ApiParam(value = "사용자 Seq") @RequestParam int userSeq,
			@ApiParam(value = "검색 키워드") @RequestParam String keyword,
			@ApiParam(value = "페이지 번호") @RequestParam int page,
			@ApiParam(value = "한 페이지에 나타낼 개수") @RequestParam int size) {
		List<Map<String, Object>> users = searchService.searchUser(userSeq, keyword, page - 1, size);

		if (users != null) {
			return new ResponseEntity<>(users, HttpStatus.OK);
		}
		return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/post")
	@ApiOperation(value = "키워드로 사용자 게시글 검색", notes = "사용자 게시글 검색 - 스크랩 여부, 제목, 내용, 게시글 번호, 지역, 장애정보, 사진, 사용자 seq 반환")
	public ResponseEntity<Object> searchPost(@ApiParam(value = "검색 키워드") @RequestParam String keyword,
			@ApiParam(value = "페이지 번호") @RequestParam int page,
			@ApiParam(value = "한 페이지에 나타낼 개수") @RequestParam int size,
			@ApiParam(value = "사용자 Seq") @RequestParam int userSeq) {
		List<Map<String, Object>> posts = searchService.searchPost(keyword, userSeq, page - 1, size);

		if (posts != null) {
			return new ResponseEntity<>(posts, HttpStatus.OK);
		}
		return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/tour")
	@ApiOperation(value = "키워드로 관광 명소 검색", notes = "contentTypeId - 전체 : 0 / 관광 명소 : 12 / 음식점 : 39 / 숙박 : 32 / 행사 : 15 / 문화시설, 쇼핑, 레포츠 : 14 / 레포츠 : 28")
	public ResponseEntity<Object> searchTour(@ApiParam(value = "검색 키워드") @RequestParam String keyword,
			@ApiParam(value = "컨텐트 타입 번호") @RequestParam String contentTypeId, @RequestParam int userSeq,
			@ApiParam(value = "페이지 번호") @RequestParam int page,
			@ApiParam(value = "한 페이지에 나타낼 개수") @RequestParam int size) {
		List<JSONObject> result;
		try {
			result = searchService.searchTour(keyword, contentTypeId, userSeq, page - 1, size);
			if (result == null)
				return new ResponseEntity<>("검색 결과가 없습니다.", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
