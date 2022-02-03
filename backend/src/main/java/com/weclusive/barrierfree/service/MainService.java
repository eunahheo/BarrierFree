package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;

public interface MainService {
	public List<Map<String, Object>> readAllPost(int userSeq);
	public List<Map<String, Object>> readPostlatest(int userSeq);
	public List<Map<String, Object>> readPostScrap(int userSeq);
	public List<Map<String, Object>> readPostWeek(int userSeq);
	public List<Map<String, Object>> readPostFollowing(int userSeq);
}
