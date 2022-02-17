package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public interface RecommendService {
	// 상세보기 페이지에 필요한 정보들 반환
	public  Map<String, Object> loadDetailView(int userSeq, long contentid) throws Exception;
	// 해당 컨텐츠id의 무장애정보 반환
	public  Map<String, Object> loadImpairment(long contentid) throws Exception;
	// 지역 시도 리스트 반환
	public List<Map<String, Object>> getSido() throws Exception;
	// 선택한 시도의 시구군 리스트 반환
	public List<Map<String, Object>> getSigungu(String sidoCode) throws Exception;
	// 시도, 시구군, 장애정보에 대한 검색 결과 반환
	public List<Map<String, Object>> search(int userSeq, String sidoCode, String sigunguCode, String[] contentTypeId,
			List<String> impairments, int page, int size) throws Exception;
	// 내 주변 15km이내 무장애 여행지 리스트 반환 
	public List<Map<String, Object>> getNearMyLocation(int userSeq, String lat, String lng, String radius,String contentTypeId,
			 int numOfRows, int pageNo) throws Exception;
}
