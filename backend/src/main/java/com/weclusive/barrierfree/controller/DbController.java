package com.weclusive.barrierfree.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.weclusive.barrierfree.util.DataManager;

import io.swagger.annotations.ApiOperation;


//@RestController
@CrossOrigin("*")
@RequestMapping("/db")
public class DbController {
	@Autowired
	private DataManager dbService;
	
	@PostMapping("/tour")
	public ResponseEntity<String> tourdb(@RequestParam int pageNo, @RequestParam String serviceKey, @RequestParam int numOfRows) {
		
		try {
			dbService.searchContentId(pageNo, serviceKey, numOfRows);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<String>("db", HttpStatus.OK);
	}
	
	@GetMapping("/test")
	@ApiOperation(value = "댓글 보기", notes = "댓글 정보를 반환한다.", response = List.class)
	public ResponseEntity<Object> test(String contentid) {
		
//		ArrayList<String> list = ti.loadAllContentId();
//		for(String contentid : list) {
//			dbService.loadByContentId(contentid);
//		}
		
		dbService.loadByContentId(contentid);
		
		return null;
	}
}
