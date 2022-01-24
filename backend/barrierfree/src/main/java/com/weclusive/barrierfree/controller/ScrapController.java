package com.weclusive.barrierfree.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.entity.Scrap;
import com.weclusive.barrierfree.repository.ScrapRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/scrap")
@Api("스크랩 관련 API")
public class ScrapController {
	ScrapRepository scrapRepository;
	
	@GetMapping
	@ApiOperation(value="해당 게시글을 스크랩 하는 API", notes="스크랩에 성공하면 1, 실패하면 0을 반환한다.", response=Map.class)	
	public Map<String, Integer> insertScrap(int user_seq, String user_id, long post_no) {
		Map<String, Integer> result = new HashMap<>();
		String regTime = LocalDateTime.now().toString().replace("T", " ").substring(0,19);
		scrapRepository.save(Scrap.builder()
				.userSeq(user_seq)
				.scrapType("0")
				.scrapData(post_no)
				.regDt(regTime)
				.regId(user_id)
				.modDt(regTime)
				.modId(user_id).build());
		result.put("result",1);
		
		return result;
	}
	
}
