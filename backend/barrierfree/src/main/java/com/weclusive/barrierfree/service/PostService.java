package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.weclusive.barrierfree.entity.Post;

public interface PostService {
	public List<Map<String, Object>> readAllPost(int userSeq);
	public List<Map<String, Object>> readPostlatest(int userSeq);
	public List<Map<String, Object>> readPostScrap(int userSeq);
	public List<Map<String, Object>> readPostWeek(int userSeq);
	public List<Map<String, Object>> readPostFollowing(int userSeq);
	public List<Map<String, Object>> readPostDetail(long postSeq);
	public Post save(Post post);
	public int deleteByPostSeq(long postSeq);
	public int updateByPostSeq(long postSeq, Post post, int userSeq);
}
