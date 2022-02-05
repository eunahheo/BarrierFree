package com.weclusive.barrierfree.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.weclusive.barrierfree.dto.CommentSave;
import com.weclusive.barrierfree.entity.Comment;

public interface CommentService {

	public List<Map<String, Object>> readComments(long postSeq);

	public Optional<Comment> deleteByCmtSeq(long postSeq, int userSeq);

	public int updateByCmtSeq(long cmtSeq, String cmtContent, int userSeq);

	public int saveComment(CommentSave cs);
}
