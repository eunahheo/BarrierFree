package com.weclusive.barrierfree.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.entity.Scrap;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.service.ScrapService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/scrap")
@Api("스크랩 관련 API")
public class ScrapController {
	
	@Autowired
	private ScrapService scrapService;
	
	@GetMapping("/insert")
	@ApiOperation(value="해당 게시글을 스크랩 하는 API", notes="스크랩에 성공하면 1, 실패하면 0을 반환한다.", response=Map.class)	
	public Map<String, Integer> insertScrap(int user_seq, char scrap_type, long scrap_data) {
		Map<String, Integer> result = scrapService.insertScrap(user_seq, scrap_type, scrap_data);
		return result;
	}
	
	@GetMapping("/time")
	@ApiOperation(value="해당 게시글의 스크랩 회수를 반환하는 API", notes="사용자 작성 게시글이나 관광공사 API 상세 정보 게시글의 스크랩 수를 반환한다.", response=Integer.class)	
	public int loadScrapTime(char scrap_type, long scrap_data) {
		int result = scrapService.getScraptime(scrap_type,scrap_data);
		return result;
	}
	
	@GetMapping("/check")
	@ApiOperation(value="현재 사용자가 해당 게시물을 스크랩했는지를 반환하는 API", notes="현재 사용자가 해당 게시글을 스크랩 했다면 1, 아니면 0을 반환한다.", response=Integer.class)	
	public int checkScrap(long scrap_data, int user_seq) {
		int result = scrapService.getScrapYn(user_seq, scrap_data);
		return result;
	}
	
}
