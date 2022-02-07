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
	public ResponseEntity<Object> getSigungu(String sidoCode) {
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
	public ResponseEntity<Object> getSearchList(@RequestParam int userSeq, @RequestParam(value="시도코드", required=false) String sidoCode, 
			@RequestParam(value="시군구코드", required=false) String sigunguCode,
			@RequestParam(value="컨텐츠타입id", required=false) String contentTypeId,
			@RequestParam(value="장애정보 객체", required=false) JSONObject impairments,
			@RequestParam(value="페이지 번호(0번부터 시작)", required=false) int page,
			@RequestParam(value="한 페이지에 출력할 게시물 수", required=false) int size) {
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
	public ResponseEntity<Object> getSearchListByLoc(@RequestParam int userSeq, @RequestParam String lat, @RequestParam String lng, @RequestParam String radius,
			@RequestParam(value="contentTypeId", required=false) String contentTypeId,
			@RequestParam(value="한 페이지에 출력할 게시물 수", required=false) int numOfRows,
			@RequestParam(value="페이지 번호", required=false) int pageNo) {
		List<Map<String,Object>> result;
		try {
			result = recommendService.getNearMyLocation(userSeq, lat, lng, radius, contentTypeId, numOfRows, pageNo);
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
