package com.weclusive.barrierfree.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.entity.Scrap;
import com.weclusive.barrierfree.service.ScrapService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/scrap")
@Api("스크랩 관련 API")
public class ScrapController {
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private ScrapService scrapService;
	
	@GetMapping("/insert")
	@ApiOperation(value="해당 게시글을 스크랩 하는 API", notes="스크랩에 성공하면 1, 실패하면 0을 반환한다.", response=Map.class)	
	public ResponseEntity<Map<String, Integer>> insertScrap(@RequestParam @ApiParam(value="현재 사용자의 seq")int user_seq, 
			@RequestParam @ApiParam(value="0 : 사용자 작성 게시글, 1 : 관광공사 API 상세 정보글")char scrap_type,
			@RequestParam @ApiParam(value="타입이 0이라면 post_seq, 1이라면 관광공사 API의 컨텐츠id")long scrap_data) {
		Map<String, Integer> result = new HashMap<>();
		try {
			result = scrapService.insertScrap(user_seq, scrap_type, scrap_data);
		} catch (Exception e) {
			e.printStackTrace();
			result.put("result", 0);
			return new ResponseEntity<>(result,HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping("/time")
	@ApiOperation(value="해당 게시글의 스크랩 횟수를 반환하는 API", notes="사용자 작성 게시글이나 관광공사 API 상세 정보 게시글의 스크랩 수를 반환한다.", response=Integer.class)	
	public ResponseEntity<Object> loadScrapTime(@RequestParam @ApiParam(value="0 : 사용자 작성 게시글, 1 : 관광공사 API 상세 정보글")char scrap_type, 
			@RequestParam @ApiParam(value="타입이 0이라면 post_seq, 1이라면 관광공사 API의 컨텐츠id")long scrap_data) {
		int result = 0;
		try {
			result = scrapService.getScraptime(scrap_type,scrap_data);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("오류가 발생했습니다.",HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping("/check")
	@ApiOperation(value="현재 사용자가 해당 게시물을 스크랩했는지를 반환하는 API", notes="현재 사용자가 해당 게시글을 스크랩 했다면 1, 아니면 0을 반환한다.", response=Integer.class)	
	public ResponseEntity<Map<String, Object>> checkScrap(@RequestParam @ApiParam(value="현재 사용자의 seq")int user_seq,
			@RequestParam @ApiParam(value="0 : 사용자 작성 게시글, 1 : 관광공사 API 상세 정보글")char scrap_type,
			@RequestParam @ApiParam(value="타입이 0이라면 post_seq, 1이라면 관광공사 API의 컨텐츠id") long scrap_data
			) {
		 
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			int res = scrapService.getScrapYn(user_seq, scrap_type, scrap_data);
			if(res == 1) {
				result.put("scrap_yn", 'y');
			}else {
				result.put("scrap_yn", 'n');
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@PutMapping(value = "/delete")
	@ApiOperation(value = "스크랩 취소하기", response = Map.class)
	public ResponseEntity<Object> deleteScrap(@RequestParam char scrap_type, @RequestParam long scrap_data, @RequestParam int user_seq) throws Exception {
		Map<String,Integer> result = scrapService.deleteByScrapSeq(scrap_type, scrap_data, user_seq);

		if (result == null)
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}
}
