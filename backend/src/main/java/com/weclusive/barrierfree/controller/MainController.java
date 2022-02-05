package com.weclusive.barrierfree.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.weclusive.barrierfree.service.MainService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/main")
@Api("메인화면 게시글")
public class MainController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private MainService mainService;

	@GetMapping("/all")
	@ApiOperation(value = "게시글 전체목록 조회", notes = "모든 게시물의 모든 정보를 반환한다.", response = List.class)
	public ResponseEntity<Object> listPost(int userSeq) {
		List<Map<String, Object>> result = mainService.readAllPost(userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/recently")
	@ApiOperation(value = "게시글 최신순으로 조회", notes = "등록된 순서대로 상위 100개의 게시글을 반환한다.", response = List.class)
	public ResponseEntity<Object> listRecently(int userSeq) {
		List<Map<String, Object>> result = mainService.readPostlatest(userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/scrap")
	@ApiOperation(value = "누적된 스크랩 순으로 조회", notes = "누적된 스크랩 순서대로 상위 100개의 게시글을 반환한다.", response = List.class)
	public ResponseEntity<Object> listScrap(int userSeq) {
		List<Map<String, Object>> result = mainService.readPostScrap(userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/weekscrap")
	@ApiOperation(value = "현재 시간 기준 일주일 동안의 스크랩 순으로 조회", notes = "현재 시간을 기준으로 일주일 전 까지 작성된 게시글 중 순서대로 상위 100개의 게시글을 반환한다.", response = List.class)
	public ResponseEntity<Object> listWeekScrap(int userSeq) {
		List<Map<String, Object>> result = mainService.readPostWeek(userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/follow")
	@ApiOperation(value = "팔로우 한 계정들의 게시글 최신순 조회", notes = "팔로우 한 계정들의 게시글을 최신순으로 상위 100개의 게시글을 반환한다.", response = List.class)
	public ResponseEntity<Object> listFollow(int userSeq) {
		List<Map<String, Object>> result = mainService.readPostFollowing(userSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}
}
