package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;

public interface MyFeedService {
	
	public List<Map<String, Object>> readMyFeed(int userSeq);

	public List<Map<String, Object>> readFollowing(int userSeq);

	public List<Map<String, Object>> readFollower(int userSeq);

	public List<Map<String, Object>> readPost(int userSeq);

	public List<Map<String, Object>> readScrapPost(int userSeq);

	public List<Map<String, Object>> readScrapRecommend(int userSeq) throws Exception;

}
