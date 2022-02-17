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

import com.weclusive.barrierfree.dto.CommentSave;
import com.weclusive.barrierfree.entity.Comment;
import com.weclusive.barrierfree.service.CommentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/post/comment")
@Api("댓글")
public class CommentController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private CommentService commentService;

	
	@GetMapping("/detail")
	@ApiOperation(value = "댓글 보기", notes = "댓글 정보를 반환한다.", response = List.class)
	public ResponseEntity<Object> readComment(@RequestParam long postSeq) {
		List<Map<String, Object>> result = commentService.readComments(postSeq);
		if (result != null) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping(value = "/delete")
	@ApiOperation(value = "댓글 삭제하기", response = List.class)
	public ResponseEntity<Object> deleteComment(@RequestParam long cmtSeq, @RequestParam int userSeq) throws Exception {
		Optional<Comment> result = commentService.deleteByCmtSeq(cmtSeq, userSeq);

		if(result == null)
			return new ResponseEntity<>(FAIL + " : 해당 게시글이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}

	@PutMapping(value = "/update")
	@ApiOperation(value = "댓글 수정하기", response = List.class)
	public ResponseEntity<String> updatePost(@RequestParam long cmtSeq, @RequestParam String cmtContent, @RequestParam int userSeq) throws Exception {
		int res = commentService.updateByCmtSeq(cmtSeq, cmtContent, userSeq);

		if (res == 1)
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping(value = "/saveComment")
	@ApiParam(value = "게시글, 장애 정보 저장하기", required = true)
	public ResponseEntity<String> save(@RequestBody CommentSave cs) {
		int res = commentService.saveComment(cs);
		if (res == 1)
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		else
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	
}

