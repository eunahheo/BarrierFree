package com.weclusive.barrierfree.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.dto.CommentSave;
import com.weclusive.barrierfree.entity.Comment;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.CommentRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.TimeUtils;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	PostRepository postRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public List<Map<String, Object>> readComments(long postSeq) {
		Optional<Post> posts = postRepository.findByPostSeq(postSeq);

		// 게시글이 있을 경우에만
		if(posts.isPresent()) {
			List<Map<String, Object>> result = new LinkedList<>();
			
			List<Comment> comments = commentRepository.findCommentsPostSeq(postSeq);
			
			for (int i = 0; i < comments.size(); i++) {
				Map<String, Object> obj = new HashMap<>();
				
				// 사용자 정보 - 사용자 사진, 닉네임 불러오기
				User user = userRepository.findByUserSeq(comments.get(i).getUserSeq());
				if(user != null) { // 사용자가 있을 경우에만
					List<String> list = new LinkedList<String>();
					list.add(user.getUserNickname());
					list.add(user.getUserPhoto());
					obj.put("userInfo", list);
					obj.put("comment", comments.get(i));
					result.add(obj);
				}
			}
			return result;
		}
		return null;
	}

	// 댓글 삭제하기
	@Override
	public Optional<Comment> deleteByCmtSeq(long cmtSeq, int userSeq) {
		Optional<Comment> deleteComment = commentRepository.findByCmtSeq(cmtSeq);
		String curTime = TimeUtils.curTime();
		
		if (deleteComment != null) {
			deleteComment.get().setDelYn('y');
			deleteComment.get().setModDt(curTime);
			deleteComment.get().setModId(returnUserId(userSeq));
			commentRepository.save(deleteComment.get());
			return deleteComment;
		} else
			return null;
	}

	// 댓글 수정하기
	@Override
	public int updateByCmtSeq(long cmtSeq, String cmtContent, int userSeq) {
		Optional<Comment> curComment = commentRepository.findByCmtSeq(cmtSeq);

		if (curComment != null) {
			if (cmtContent != null) {

				String curTime = TimeUtils.curTime();

				Comment updateComment = curComment.get();
				updateComment.setCmtContent(cmtContent);
				updateComment.setModDt(curTime);
				updateComment.setModId(returnUserId(userSeq));

				commentRepository.save(updateComment);
				return 1;
			}
		}
		return 0;
	}

	// 댓글 저장하기
	@Override
	public int saveComment(CommentSave cs) {
		Optional<Post> post = postRepository.findByPostSeq(cs.getPostSeq());

		if (post.isPresent()) {
			String regTime = TimeUtils.curTime();
			String userId = returnUserId(cs.getUserSeq());

			Comment cmt = new Comment();
			cmt.setUserSeq(cs.getUserSeq());
			cmt.setPostSeq(cs.getPostSeq());
			cmt.setCmtContent(cs.getCmtContent());
			cmt.setRegDt(regTime);
			cmt.setRegId(userId);
			cmt.setModDt(regTime);
			cmt.setModId(userId);
			
			commentRepository.save(cmt);
			return 1;
		}
		return 0;
	}

	// userSeq -> userId
	public String returnUserId(int userSeq) {
		Optional<User> list = userRepository.findById(userSeq);
		String userId = list.get().getUserId();
		return userId;
	}

}
