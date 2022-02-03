package com.weclusive.barrierfree.service;

import com.weclusive.barrierfree.dto.FollowDto;

public interface FollowService {
	public void follow(FollowDto followDto) throws Exception;

	public void unfollow(FollowDto followDto) throws Exception;

	public boolean isFollow(int otherUserSeq, int userSeq);
}
