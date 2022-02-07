package com.weclusive.barrierfree.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.service.TestService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/test")
@Api("댓글")
public class TestController {
	
	@Autowired
	private TestService ti;
	
	@GetMapping("/test")
	@ApiOperation(value = "댓글 보기", notes = "댓글 정보를 반환한다.", response = List.class)
	public ResponseEntity<Object> test(String contentid) {
		
//		ArrayList<String> list = ti.loadAllContentId();
//		for(String contentid : list) {
//			ti.loadByContentId(contentid);
//		}
		
		ti.loadByContentId(contentid);
		
		return null;
	}
}
