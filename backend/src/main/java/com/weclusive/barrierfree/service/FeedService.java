package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;

public interface FeedService {
	
	public List<Map<String, Object>> readMyFeed(int userSeq);

	public List<Map<String, Object>> readOthersFeed(int userSeq);

}
