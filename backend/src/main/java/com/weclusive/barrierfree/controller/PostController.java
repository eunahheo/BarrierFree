package com.weclusive.barrierfree.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.dto.Impairment;
import com.weclusive.barrierfree.dto.PostSave;
import com.weclusive.barrierfree.dto.PostUpdate;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.service.PostService;
import com.weclusive.barrierfree.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/post")
@Api("사용자 작성 게시글")
public class PostController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private PostService postService;

	@Autowired
	private UserService userService;
	
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
	public ResponseEntity<String> updatePost(@RequestParam long postSeq, @RequestParam int userSeq, @RequestBody PostUpdate pu) throws Exception {
		int res = postService.updateByPostSeq(postSeq, pu, userSeq);

		if (res == 1)
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}

	@PutMapping(value = "/updateImpairment")
	@ApiOperation(value = "게시글 장애 정보 수정하기", response = List.class)
	public ResponseEntity<String> updatePostImpairment(@RequestParam long postSeq, @RequestParam int userSeq, @RequestBody Impairment impairment) {
		int res = postService.updatePostImpairmentByPostSeq(postSeq, impairment, userSeq);

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
}

