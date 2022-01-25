package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;

public interface RecommendService {
	//상세보기 페이지에 필요한 정보들 반환
	public JSONObject loadDetailView(String contentid);
	// 해당 컨텐츠id의 무장애정보 반환
//	public JSONObject loadImpairment(String contentid);
}
