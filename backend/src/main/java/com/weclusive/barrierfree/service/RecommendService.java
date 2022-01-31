package com.weclusive.barrierfree.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public interface RecommendService {
	// 상세보기 페이지에 필요한 정보들 반환
	public JSONObject loadDetailView(String contentid) throws Exception;
	// 해당 컨텐츠id의 무장애정보 상세정보 반환
	public JSONObject loadImpairmentDetail(String contentid) throws Exception;
	// 해당 컨텐츠id의 무장애정보 분류만 반환
	public ArrayList<String> loadImpairment(String contentid) throws Exception;
	// 지역 시도 리스트 반환
	public JSONArray getSido() throws Exception;
	// 선택한 시도의 시구군 리스트 반환
	public JSONArray getSigungu(int sidoCode) throws Exception;
	// 시도, 시구군, 장애정보에 대한 검색 결과 반환
	public List<Map<String, Object>> search(int userSeq, String sidoCode, String sigunguCode, String contentTypeId, JSONObject impairments) throws Exception;
	// 내 주변 15km이내 무장애 여행지 리스트 반환 
	public List<Map<String, Object>> getNearMyLocation(int userSeq, String lat, String lng, String radius,String contentTypeId) throws Exception;
}
