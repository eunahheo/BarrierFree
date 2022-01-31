package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;

public interface OthersFeedService {

	public Map<String, Object> readOthersFeed(int otherUserSeq);

	public List<Map<String, Object>> readOthersPost(int otherUserSeq, int userSeq);
}
