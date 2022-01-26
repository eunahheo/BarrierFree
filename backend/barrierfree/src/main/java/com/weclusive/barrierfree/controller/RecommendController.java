package com.weclusive.barrierfree.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.service.RecommendService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/recommend")
@Api("추천화면 API (한국관광공사 무장애 여행지 API 활용)")
public class RecommendController {
	
	@Autowired
	private RecommendService recommendService;
	
	@GetMapping("/detail")
	@ApiOperation(value="상세정보 조회", notes="컨텐츠id를 통해 상세정보를 조회한다.")
	public ResponseEntity<Object> detailView(@RequestParam @ApiParam(value="관광공사 API에 존재하는 컨텐츠id")String contentid) {
		JSONObject result;
		try {
			result = recommendService.loadDetailView(contentid);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("컨텐츠id를 확인해주세요.", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping("/impairment")
	@ApiOperation(value="무장애정보 조회", notes="컨텐츠id를 통해 무장애정보를 조회한다.")
	public ResponseEntity<Object> getImpairment(@RequestParam @ApiParam(value="관광공사 API에 존재하는 컨텐츠id")String contentid) {
		JSONObject result;
		try {
			result = recommendService.loadImpairment(contentid);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("컨텐츠id를 확인해주세요.", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
}
