package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;

public interface MainService {
	public List<Map<String, Object>> readAllPost(int userSeq);
	public List<Map<String, Object>> readPostlatest(int userSeq, int page, int size);
	public List<Map<String, Object>> readPostScrap(int userSeq, int page, int size);
	public List<Map<String, Object>> readPostWeek(int userSeq, int page, int size);
	public List<Map<String, Object>> readPostFollowing(int userSeq, int page, int size);
}
