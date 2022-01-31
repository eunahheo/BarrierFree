package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.weclusive.barrierfree.dto.Impairment;
import com.weclusive.barrierfree.dto.PostSave;
import com.weclusive.barrierfree.dto.PostUpdate;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.PostImpairment;

public interface PostService {
	public List<Map<String, Object>> readAllPost(int userSeq);
	public List<Map<String, Object>> readPostlatest(int userSeq);
	public List<Map<String, Object>> readPostScrap(int userSeq);
	public List<Map<String, Object>> readPostWeek(int userSeq);
	public List<Map<String, Object>> readPostFollowing(int userSeq);
	public List<Map<String, Object>> readPostDetail(long postSeq);
	
	public Post save(Post post);
	public Optional<Post> deleteByPostSeq(long postSeq);
	public int updateByPostSeq(long postSeq, PostUpdate pu, int userSeq);
	public int updatePostImpairmentByPostSeq(long postSeq, Impairment impairment);
	public PostImpairment savePostImpairment(Impairment impairment, long postSeq);
	public int savePost(PostSave ps);
	public List<Post> readUserPosts(int userSeq);


}
