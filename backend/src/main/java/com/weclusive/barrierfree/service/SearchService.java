package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;

public interface SearchService {

	public List<Map<String, Object>> searchPost(String keyword, int userSeq, int page, int size);

	public List<JSONObject> searchTour(String keyword, String contentTypeId, int userSeq, int page, int size) throws Exception;

	public List<Map<String, Object>> searchUser(int userSeq, String keyword, int page, int size);


}
