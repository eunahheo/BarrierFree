package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;

public interface OthersFeedService {

	public Map<String, Object> readOthersFeed(int otherUserSeq);

	public List<Map<String, Object>> readOthersPost(int otherUserSeq, int userSeq);

	public List<Map<String, Object>> readOthersFollowing(int otherUserSeq, int userSeq);

	public List<Map<String, Object>> readOthersFollower(int otherUserSeq, int userSeq);

	public boolean isFollow(int otherUserseq, int userSeq);
}
