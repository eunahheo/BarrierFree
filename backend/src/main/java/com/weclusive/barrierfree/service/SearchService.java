package com.weclusive.barrierfree.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;

public interface SearchService {
	public List<Map<String, Object>> searchUser(String keyword, int count);

	public JSONObject searchTour(String keyword, int count);

	public List<Map<String, Object>> searchRestaurant(String keyword, int count);

	public List<Map<String, Object>> searchAccommodation(String keyword, int count);

	public List<Map<String, Object>> searchEvent(String keyword, int count);

	public List<Map<String, Object>> searchPost(String keyword, int userSeq, int count);

	JSONObject loadImpairmentDetail(String contentid) throws Exception;

	ArrayList<String> loadImpairment(String contentid) throws Exception;
}
