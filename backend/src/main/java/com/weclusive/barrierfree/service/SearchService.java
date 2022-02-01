package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;

public interface SearchService {
	public List<Map<String, Object>> searchUser(String keyword, int count);

	public List<Map<String, Object>> searchTour(String keyword, int count);

	public List<Map<String, Object>> searchRestaurant(String keyword, int count);

	public List<Map<String, Object>> searchAccommodation(String keyword, int count);

	public List<Map<String, Object>> searchEvent(String keyword, int count);
}
