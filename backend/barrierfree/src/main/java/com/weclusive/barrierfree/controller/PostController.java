package com.weclusive.barrierfree.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

import com.weclusive.barrierfree.dto.CommentSave;
import com.weclusive.barrierfree.dto.Impairment;
import com.weclusive.barrierfree.dto.PostSave;
import com.weclusive.barrierfree.dto.PostUpdate;
import com.weclusive.barrierfree.entity.Comment;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.PostImpairment;
import com.weclusive.barrierfree.service.CommentService;
import com.weclusive.barrierfree.service.PostService;
import com.weclusive.barrierfree.service.PostServiceImpl;
import com.weclusive.barrierfree.service.UserService;

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

	@Autowired
	private UserService userService;
	
	@Autowired
	private CommentService commentService;

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


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 게시글 

	@GetMapping("/detail")
	@ApiOperation(value = "게시글 상세 보기", notes = "게시글 정보, 장애 정보를 반환한다.", response = List.class)
	public ResponseEntity<Object> detailPost(@RequestParam long postSeq) {
		List<Map<String, Object>> result = postService.readPostDetail(postSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL + " : 해당 게시글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping(value = "/delete")
	@ApiOperation(value = "게시글 삭제하기", response = List.class)
	public ResponseEntity<Object> deletePost(@RequestParam long postSeq) throws Exception {
		Optional<Post> result = postService.deleteByPostSeq(postSeq);

		if(result == null)
			return new ResponseEntity<>(FAIL + " : 해당 게시글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}

	@PutMapping(value = "/update")
	@ApiOperation(value = "게시글 수정하기", response = List.class)
	public ResponseEntity<String> updatePost(@RequestParam long postSeq, @RequestBody PostUpdate pu) throws Exception {
		int res = postService.updateByPostSeq(postSeq, pu, pu.getUserSeq());

		if (res == 1)
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}

	@PutMapping(value = "/updateImpairment")
	@ApiOperation(value = "게시글 장애 정보 수정하기", response = List.class)
	public ResponseEntity<String> updatePostImpairment(@RequestParam long postSeq, @RequestBody Impairment impairment) {
		int res = postService.updatePostImpairmentByPostSeq(postSeq, impairment);

		if (res == 1)
			return new ResponseEntity<String>(SUCCESS + " : 수정", HttpStatus.OK);
		else if (res == 0)
			return new ResponseEntity<String>(SUCCESS + " : 수정 사항 없음", HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}

	@PostMapping(value = "/savePost")
	@ApiParam(value = "게시글, 장애 정보 저장하기", required = true)
	public ResponseEntity<String> save(@RequestBody PostSave ps) {
		int res = postService.savePost(ps);
		if (res == 1)
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}

	@GetMapping(value = "/loadUserImpairment")
	@ApiOperation(value = "회원 장애 정보 불러오기", notes = "게시글 작성할 때 회원의 장애 정보 값을 디폴트로 설정하기 위해 사용한다.")
	public ResponseEntity<Object> loadUserImpairment(int userSeq) {

		Impairment ui = userService.readUserImpairment(userSeq);
		if (ui != null) {
			return new ResponseEntity<Object>(ui, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}

	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 댓글
	@GetMapping("/comment/detail")
	@ApiOperation(value = "댓글 전체 보기", notes = "댓글 정보를 반환한다.", response = List.class)
	public ResponseEntity<Object> readComment(@RequestParam long postSeq) {
		List<Comment> result = commentService.readComments(postSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping(value = "/comment/delete")
	@ApiOperation(value = "댓글 삭제하기", response = List.class)
	public ResponseEntity<Object> deleteComment(@RequestParam long cmtSeq) throws Exception {
		Optional<Comment> result = commentService.deleteByCmtSeq(cmtSeq);

		if(result == null)
			return new ResponseEntity<>(FAIL + " : 해당 게시글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}

	@PutMapping(value = "/comment/update")
	@ApiOperation(value = "댓글 수정하기", response = List.class)
	public ResponseEntity<String> updatePost(@RequestParam long cmtSeq, @RequestBody String cmtContent) throws Exception {
		int res = commentService.updateByCmtSeq(cmtSeq, cmtContent);

		if (res == 1)
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping(value = "/comment/saveComment")
	@ApiParam(value = "게시글, 장애 정보 저장하기", required = true)
	public ResponseEntity<String> save(@RequestBody CommentSave cs) {
		int res = commentService.saveComment(cs);
		if (res == 1)
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
}

