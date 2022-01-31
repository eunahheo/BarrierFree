package com.weclusive.barrierfree.service;

import java.util.Map;

public interface OthersFeedService {

	public Map<String, Object> readOthersFeed(int otherUserSeq);

	public Map<String, Object> readOthersPost(int otherUserSeq, int userSeq);
}
