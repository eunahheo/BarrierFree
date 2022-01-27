package com.weclusive.barrierfree.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.dto.Impairment;
import com.weclusive.barrierfree.dto.PostSave;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.PostImpairment;
import com.weclusive.barrierfree.service.PostService;
import com.weclusive.barrierfree.service.PostServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/post")
@Api("메인화면 게시글")
public class PostController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private PostService postService;

	@GetMapping("/all")
	@ApiOperation(value = "게시글 전체목록 조회", notes = "모든 게시물의 모든 정보를 반환한다.", response = List.class)
	public List<Map<String, Object>> listPost(int userSeq) {
		List<Map<String, Object>> result = postService.readAllPost(userSeq);
		return result;
	}

	@GetMapping("/recently")
	@ApiOperation(value = "게시글 최신순으로 조회", notes = "등록된 순서대로 상위 100개의 게시글을 반환한다.", response = List.class)
	public List<Map<String, Object>> listRecently(int userSeq) {
		List<Map<String, Object>> result = postService.readPostlatest(userSeq);
		return result;
	}

	@GetMapping("/scrap")
	@ApiOperation(value = "누적된 스크랩 순으로 조회", notes = "누적된 스크랩 순서대로 상위 100개의 게시글을 반환한다.", response = List.class)
	public List<Map<String, Object>> listScrap(int userSeq) {
		List<Map<String, Object>> result = postService.readPostScrap(userSeq);
		return result;
	}

	@GetMapping("/weekscrap")
	@ApiOperation(value = "현재 시간 기준 일주일 동안의 스크랩 순으로 조회", notes = "현재 시간을 기준으로 일주일 전 까지 작성된 게시글 중 순서대로 상위 100개의 게시글을 반환한다.", response = List.class)
	public List<Map<String, Object>> listWeekScrap(int userSeq) {
		List<Map<String, Object>> result = postService.readPostWeek(userSeq);
		return result;
	}

	@GetMapping("/follow")
	@ApiOperation(value = "팔로우 한 계정들의 게시글 최신순 조회", notes = "팔로우 한 계정들의 게시글을 최신순으로 상위 100개의 게시글을 반환한다.", response = List.class)
	public List<Map<String, Object>> listFollow(int userSeq) {
		List<Map<String, Object>> result = postService.readPostFollowing(userSeq);
		return result;
	}

	@GetMapping("/detail")
	@ApiOperation(value = "게시글 상세 보기", notes = "게시글 정보, 장애 정보를 반환한다.", response = List.class)
	public List<Map<String, Object>> detailPost(@RequestParam long postSeq) {
		List<Map<String, Object>> result = postService.readPostDetail(postSeq);
		return result;
	}

	@PutMapping(value = "/delete")
	@ApiOperation(value = "게시글 삭제하기", response = List.class)
	public ResponseEntity<String> deletePost(@RequestParam long postSeq) throws Exception {
		int res = postService.deleteByPostSeq(postSeq);

		if (res == 1)
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}

	@PutMapping(value = "/update")
	@ApiOperation(value = "게시글 수정하기", response = List.class)
	public ResponseEntity<String> updatePost(@RequestParam long postSeq, Post post) throws Exception {
		int res = postService.updateByPostSeq(postSeq, post, post.getUserSeq());

		if (res == 1)
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);

	}

	@PutMapping(value = "/updateImpairment")
	@ApiOperation(value = "게시글 장애 정보 수정하기", response = List.class)
	public ResponseEntity<String> updatePostImpairment(Impairment impairment, @RequestParam long postSeq) {
		int res = postService.updatePostImpairmentByPostSeq(postSeq, impairment);

		if (res == 1)
			return new ResponseEntity<String>("수정 " + SUCCESS, HttpStatus.OK);
		else if (res == 0)
			return new ResponseEntity<String>("수정 사항 없음 " + SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
	
//	// 사용자 장애 정보 불러오기
//	@GetMapping(value="/loadUserImpairment")
//	@ApiOperation(value = "사용자 장애 정보 불러오기")
//	public ResponseEntity<Object> loadUserImpairment(int UserSeq) {
//	}
	
	@PostMapping(value="/savePost")
	@ApiParam(value = "게시글, 장애 정보 저장하기", required = true)
	public ResponseEntity<String> save(@RequestBody PostSave ps) {
		int res = postService.savePost(ps);
		if(res == 1)
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}

}
