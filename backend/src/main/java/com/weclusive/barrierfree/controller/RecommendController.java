package com.weclusive.barrierfree.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public ResponseEntity<Object> detailView(@RequestParam @ApiParam(value="현재 로그인중인 사용자의 userSeq")int userSeq,
			@RequestParam @ApiParam(value="관광공사 API에 존재하는 컨텐츠id")long contentid) {
		Map<String, Object> result;
		try {
			result = recommendService.loadDetailView(userSeq, contentid);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("컨텐츠id를 확인해주세요.", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping("/impairment")
	@ApiOperation(value="무장애정보 조회", notes="컨텐츠id를 통해 무장애정보를 조회한다.")
	public ResponseEntity<Object> getImpairment(@RequestParam @ApiParam(value="관광공사 API에 존재하는 컨텐츠id")long contentid) {
		Map<String, Object> result = new HashMap<>();
		try {
			result = recommendService.loadImpairment(contentid);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("컨텐츠id를 확인해주세요.", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping("/sido")
	@ApiOperation(value="시도 정보 조회", notes="시도의 코드, 시도 명, 컬럼번호를 조회한다.")
	public ResponseEntity<Object> getSido() {
		List<Map<String, Object>> result = new ArrayList<>();
		try {
			result = recommendService.getSido();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("오류가 발생했습니다.", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping("/sigungu")
	@ApiOperation(value="시구군 정보 조회", notes="시도의 코드를 활용해 시구군 명, 컬럼번호를 조회한다.")
	public ResponseEntity<Object> getSigungu(@RequestParam @ApiParam(value="시도 코드") String sidoCode) {
		List<Map<String, Object>> result = new ArrayList<>();
		try {
			result = recommendService.getSigungu(sidoCode);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("오류가 발생했습니다.", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping("/search")
	@ApiOperation(value="관광공사 API 검색", notes="선택한 지역과 무장애 정보에 맞는 검색 결과를 반환한다.")
	public ResponseEntity<Object> getSearchList(@RequestParam @ApiParam(value="현재 로그인중인 사용자의 userSeq") int userSeq, 
			@RequestParam(value="sidoCode", required=false) @ApiParam(value="시도코드") String sidoCode, 
			@RequestParam(value="sigunguCode", required=false) @ApiParam(value="시군구코드") String sigunguCode,
			@RequestParam(value="contentTypeId", required=false) @ApiParam(value="관광 명소 : 12 / 음식점 : 39 / 숙박 : 32 / 행사 : 15 / 쇼핑 : 38 / 문화시설 : 14 / 레포츠 : 28, 입력안하면 전체") String contentTypeId,
			@RequestParam(value="impairments", required=false) @ApiParam(value="무장애코드 : physical / visibility / deaf / infant / senior")List<String> impairments,
			@RequestParam(value="page", required=false) @ApiParam(value="페이지 번호 (0번부터 시작)")int page,
			@RequestParam(value="size", required=false) @ApiParam(value="한 페이지에 보여줄 게시글 수")int size) {
		List<Map<String,Object>> result;
		try {
			result = recommendService.search(userSeq, sidoCode, sigunguCode, contentTypeId, impairments, page, size);
		} catch(ClassCastException e) {
			e.printStackTrace();
			return new ResponseEntity<>("검색결과가 없습니다.", HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("오류가 발생했습니다.", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping("/myloc")
	@ApiOperation(value="내 주변 관광지 관광공사 API 검색", notes="현재 위도 경도 주변의 무장애 관광기 검색 결과를 반환한다.")
	public ResponseEntity<Object> getSearchListByLoc(@RequestParam @ApiParam(value="현재 로그인중인 사용자의 userSeq") int userSeq, 
			@RequestParam @ApiParam(value="위도") String lat, 
			@RequestParam @ApiParam(value="경도") String lng, 
			@RequestParam @ApiParam(value="반경(m), 최대 20000") String radius,
			@RequestParam(value="contentTypeId", required=false) @ApiParam(value="관광 명소 : 12 / 음식점 : 39 / 숙박 : 32 / 행사 : 15 / 쇼핑 : 38 / 문화시설 : 14 / 레포츠 : 28, 입력안하면 전체")String contentTypeId,
			@RequestParam(value="page") @ApiParam(value="페이지 번호 (1번부터 시작)") int page,
			@RequestParam(value="size") @ApiParam(value="한 페이지에 보여줄 게시글 수") int size) {
		List<Map<String,Object>> result;
		try {
			result = recommendService.getNearMyLocation(userSeq, lat, lng, radius, contentTypeId, page, size);
		} catch(ClassCastException e) {
			e.printStackTrace();
			return new ResponseEntity<>("검색결과가 없습니다.", HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("오류가 발생했습니다.", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
}
