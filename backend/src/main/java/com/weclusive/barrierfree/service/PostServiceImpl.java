package com.weclusive.barrierfree.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.dto.Impairment;
import com.weclusive.barrierfree.dto.PostSave;
import com.weclusive.barrierfree.dto.PostUpdate;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.PostImpairment;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.PostImpairmentRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.StringUtils;
import com.weclusive.barrierfree.util.TimeUtils;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	PostRepository postRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PostImpairmentRepository postImpairmentRepository;

	@Autowired
	ScrapRepository scrapRepository;

	@Override
	public List<Map<String, Object>> readAllPost(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		postRepository.findAll().forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_scrap", post.getPostScrap());
			obj.put("post_photo", post.getPostPhoto());
//			obj.put("post_photo_alt", post.getPost_photo_alt());
			obj.put("post_location", post.getPostLocation());
			obj.put("post_address", post.getPostAddress());
			obj.put("post_lat", post.getPostLat());
			obj.put("post_lng", post.getPostLng());
			obj.put("post_point", post.getPostPoint());
			obj.put("content_id", post.getContentId());
			obj.put("del_yn", post.getDelYn());
			obj.put("reg_dt", post.getRegDt());
			obj.put("reg_id", post.getRegId());
			obj.put("mod_dt", post.getModDt());
			obj.put("mod_id", post.getModId());
//			List<PostImpairment> list = postImpairmentRepository.findByPostSeq(post.getpostSeq());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';
			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}

	@Override
	public List<Map<String, Object>> readPostlatest(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		postRepository.findTop100ByDelYnOrderByRegDtDesc('n').forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_scrap", post.getPostScrap());
			obj.put("post_photo", post.getPostPhoto());
//			obj.put("post_photo_alt", post.getPostPhotoAlt());
			obj.put("post_location", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}

	// 스크랩 많은 순
	@Override
	public List<Map<String, Object>> readPostScrap(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		postRepository.findTop100ByDelYnOrderByPostScrapDesc('n').forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_scrap", post.getPostScrap());
			obj.put("post_photo", post.getPostPhoto());
//			obj.put("post_photo_alt", post.getPostPhotoAlt());
			obj.put("post_location", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}

	// 이번주 스크랩 순
	@Override
	public List<Map<String, Object>> readPostWeek(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		String startTime = LocalDateTime.now().minusDays(7).toString().replace("T", " ").substring(0, 19);
		String endTime = TimeUtils.curTime();
		postRepository.findTop100ByDelYnAndRegDtBetweenOrderByPostScrapDesc('n', startTime, endTime).forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_scrap", post.getPostScrap());
			obj.put("post_photo", post.getPostPhoto());
//			obj.put("post_photo_alt", post.getPostPhotoAlt());
			obj.put("post_location", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}

	// 팔로워 게시글
	@Override
	public List<Map<String, Object>> readPostFollowing(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		// 현재 사용자의 seq를 불러오는 API 필요
		postRepository.findFollowPost(1).forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_scrap", post.getPostScrap());
			obj.put("post_photo", post.getPostPhoto());
//			obj.put("post_photo_alt", post.getPostPhotoAlt());
			obj.put("post_location", post.getPostLocation());
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			char scrap_yn = 'n';
			// 현재 사용자의 seq를 가져오는 api 필요
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0)
				scrap_yn = 'y';

			obj.put("scrap_yn", scrap_yn);
			result.add(obj);
		});
		return result;
	}

	// 게시글 상세정보 가져오기
	@Override
	public List<Map<String, Object>> readPostDetail(long postSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		Map<String, Object> obj = new HashMap<>();

		Optional<Post> posts = postRepository.findByPostSeq(postSeq);

		// del_yn = n 일때만 장애 정보 불러와서 리턴하기
		if (posts.isPresent()) {
			obj.put("post", postRepository.findByPostSeq(postSeq));
			obj.put("impairment", postImpairmentRepository.findImpairment(postSeq));
			result.add(obj);
			return result;
		}
		// 삭제된 상태면 null 리턴
		return null;
	}

	// 게시글 저장하기
	@Override
	public Post save(Post post) {
		postRepository.save(post);
		return post;
	}

	// 게시글 삭제하기 (del_yn을 y로 변경)
	@Override
	public Optional<Post> deleteByPostSeq(long postSeq) {
		Optional<Post> deletePost = postRepository.findByPostSeq(postSeq);

		if (deletePost != null) {
			deletePost.get().setDelYn('y');
			save(deletePost.get());
			return deletePost;
		} else
			return null;
	}

	// 게시글 수정하기
	// 변경 안되는 값 : photo, photo_alt, scrap, reg_dt, reg_id, post_seq, user_seq
	@Override
	public int updateByPostSeq(long postSeq, PostUpdate pu, int userSeq) {
		Optional<Post> curPost = postRepository.findByPostSeq(postSeq);

		if (curPost.isPresent()) {
			String regTime = TimeUtils.curTime();

			String userId = returnUserId(userSeq);

			Post updatePost = curPost.get();
			if (StringUtils.isNotBlank(pu.getPostTitle()))
				updatePost.setPostTitle(pu.getPostTitle());
			if (StringUtils.isNotBlank(pu.getPostContent()))
				updatePost.setPostContent(pu.getPostContent());
			if (StringUtils.isNotBlank(pu.getPostLocation()))
				updatePost.setPostLocation(pu.getPostLocation());
			if (StringUtils.isNotBlank(pu.getPostAddress()))
				updatePost.setPostAddress(pu.getPostAddress());
			if (StringUtils.isNotBlank(pu.getPostLat()))
				updatePost.setPostLat(pu.getPostLat());
			if (StringUtils.isNotBlank(pu.getPostLng()))
				updatePost.setPostLng(pu.getPostLng());
			if (StringUtils.isNotBlank(pu.getContentId()))
				updatePost.setContentId(pu.getContentId());
			updatePost.setPostPoint(pu.getPostPoint());
			updatePost.setModDt(regTime);
			updatePost.setModId(userId);

			postRepository.save(updatePost);

			return 1;
		}
		return 0;
	}

	// 게시글 장애 정보 수정하기
	@Override
	public int updatePostImpairmentByPostSeq(long postSeq, Impairment impairment) {

		// 입력한 게시글 번호의 모든 장애 정보 반환(del_yn = n)
		List<PostImpairment> curImpairment = postImpairmentRepository.findOneByPostSeq(postSeq);
		int res = 0;
		// 입력된 장애 정보 저장하는 배열
		// -1) 선택 X, 1) 선택
		// physical, visibility, deaf, infant, senior
		int check[] = new int[] { -1, -1, -1, -1, -1 };

		for (int i = 0; i < curImpairment.size(); i++) { // 원래 게시글의 장애 정보 수 만큼 반복
			String im = curImpairment.get(i).getCode(); // 게시글의 장애 코드 ex) physical

			// 선택된 상태면 check를 1로
			switch (im) {
			case "physical":
				check[0] = 1;
				break;
			case "visibility":
				check[1] = 1;
				break;
			case "deaf":
				check[2] = 1;
				break;
			case "infant":
				check[3] = 1;
				break;
			case "senior":
				check[4] = 1;
				break;
			}
		}

		// check : 원래 선택 여부(-1) -> impairment : 새로 선택 여부(1)
		// 취소 -> 선택 : post_code table에 추가하기
		if (check[0] == -1 && impairment.getPhysical() == 1) {
			saveImpairment(postSeq, 0);
			res = 1;
		}
		if (check[1] == -1 && impairment.getVisibility() == 1) {
			saveImpairment(postSeq, 1);
			res = 1;
		}
		if (check[2] == -1 && impairment.getDeaf() == 1) {
			saveImpairment(postSeq, 2);
			res = 1;
		}
		if (check[3] == -1 && impairment.getInfant() == 1) {
			saveImpairment(postSeq, 3);
			res = 1;
		}
		if (check[4] == -1 && impairment.getSenior() == 1) {
			saveImpairment(postSeq, 4);
			res = 1;
		}

		// check : 원래 선택 여부(1) -> impairment : 새로 선택 여부(0)
		// 선택 -> 취소 : post_code에서 삭제하기 del_yn = y
		if (check[0] == 1 && impairment.getPhysical() == 0) {
			updateImpairment(postSeq, 0);
			res = 1;
		}
		if (check[1] == 1 && impairment.getVisibility() == 0) {
			updateImpairment(postSeq, 1);
			res = 1;
		}
		if (check[2] == 1 && impairment.getDeaf() == 0) {
			updateImpairment(postSeq, 2);
			res = 1;
		}
		if (check[3] == 1 && impairment.getInfant() == 0) {
			updateImpairment(postSeq, 3);
			res = 1;
		}
		if (check[4] == 1 && impairment.getSenior() == 0) {
			updateImpairment(postSeq, 4);
			res = 1;
		}

		return res;
	}

	// 게시글 저장하기
	public void saveImpairment(long postSeq, int im) {
		String type = "";
		switch (im) {
		case 0:
			type = "physical";
			break;
		case 1:
			type = "visibility";
			break;
		case 2:
			type = "deaf";
			break;
		case 3:
			type = "infant";
			break;
		case 4:
			type = "senior";
			break;
		}

		PostImpairment pi = new PostImpairment();

		pi.setPostSeq(postSeq);
		pi.setCode(type);
		pi.setDelYn('n');
		pi.setRegDt(TimeUtils.curTime());
		pi.setRegId(returnUserIdFromPostSeq(postSeq));
		pi.setModDt(TimeUtils.curTime());
		pi.setModId(returnUserIdFromPostSeq(postSeq));
		postImpairmentRepository.save(pi);
	}

	// 게시글 장애 정보 수정하기
	public void updateImpairment(long postSeq, int im) {
		String type = "";
		switch (im) {
		case 0:
			type = "physical";
			break;
		case 1:
			type = "visibility";
			break;
		case 2:
			type = "deaf";
			break;
		case 3:
			type = "infant";
			break;
		case 4:
			type = "senior";
			break;
		}

		Optional<PostImpairment> pi = postImpairmentRepository.findOneByPostSeqCode(postSeq, type);
		pi.get().setDelYn('y');
		pi.get().setModDt(TimeUtils.curTime());
		pi.get().setModId(returnUserIdFromPostSeq(postSeq));
		save(pi.get());
	}

	// 장애 정보 받아와서 게시글 장애 정보로 저장하기
	@Override
	public PostImpairment savePostImpairment(Impairment impairment, long postSeq) {
		PostImpairment postImpairment = new PostImpairment();
		postImpairment.setPostSeq(postSeq);
		postImpairment.setDelYn('n');
		postImpairment.setRegDt(TimeUtils.curTime());
		postImpairment.setRegId(returnUserIdFromPostSeq(postSeq));
		postImpairment.setModDt(TimeUtils.curTime());
		postImpairment.setModId(returnUserIdFromPostSeq(postSeq));

		if (impairment.getPhysical() == 1)
			postImpairment.setCode("physical");

		else if (impairment.getVisibility() == 1)
			postImpairment.setCode("visibility");

		else if (impairment.getDeaf() == 1)
			postImpairment.setCode("deaf");

		else if (impairment.getInfant() == 1)
			postImpairment.setCode("infant");

		else if (impairment.getSenior() == 1)
			postImpairment.setCode("senior");

		save(postImpairment);
		return postImpairment;
	}

	// 게시글 + 장애정보 저장하기
	@Override
	public int savePost(PostSave ps) {

		// 게시글 정보 저장하기
		Post p = new Post();
		p.setUserSeq(ps.getUserSeq());
		p.setPostTitle(ps.getPostTitle());
		p.setPostPhoto(ps.getPostPhoto());
//		p.setPostPhotoAlt(p.getPostPhotoAlt());
		p.setPostLocation(ps.getPostLocation());
		p.setPostAddress(ps.getPostAddress());
		p.setPostLat(ps.getPostLat());
		p.setPostLng(ps.getPostLng());
		p.setPostPoint(ps.getPostPoint());
		p.setPostContent(ps.getPostContent());
		p.setContentId(ps.getContentId());
		p.setRegDt(TimeUtils.curTime());
		p.setRegId(returnUserId(ps.getUserSeq()));
		p.setModDt(TimeUtils.curTime());
		p.setModId(returnUserId(ps.getUserSeq()));
		save(p);

		// 게시글 장애 정보 저장하기
		long postSeq = p.getPostSeq();
		int userSeq = ps.getUserSeq();
		if (ps.getPhysical() == 1) {
			postImpairmentRepository.save(PostImpairment.builder().postSeq(postSeq).code("physical")
					.regDt(TimeUtils.curTime()).regId(returnUserId(userSeq)).modDt(TimeUtils.curTime())
					.modId(returnUserId(userSeq)).build());

		}
		if (ps.getDeaf() == 1) {
			postImpairmentRepository.save(PostImpairment.builder().postSeq(postSeq).code("deaf")
					.regDt(TimeUtils.curTime()).regId(returnUserId(userSeq)).modDt(TimeUtils.curTime())
					.modId(returnUserId(userSeq)).build());

		}
		if (ps.getInfant() == 1) {
			postImpairmentRepository.save(PostImpairment.builder().postSeq(postSeq).code("infant")
					.regDt(TimeUtils.curTime()).regId(returnUserId(userSeq)).modDt(TimeUtils.curTime())
					.modId(returnUserId(userSeq)).build());

		}
		if (ps.getVisibility() == 1) {
			postImpairmentRepository.save(PostImpairment.builder().postSeq(postSeq).code("visibility")
					.regDt(TimeUtils.curTime()).regId(returnUserId(userSeq)).modDt(TimeUtils.curTime())
					.modId(returnUserId(userSeq)).build());

		}
		if (ps.getSenior() == 1) {
			postImpairmentRepository.save(PostImpairment.builder().postSeq(postSeq).code("senior")
					.regDt(TimeUtils.curTime()).regId(returnUserId(userSeq)).modDt(TimeUtils.curTime())
					.modId(returnUserId(userSeq)).build());
		}

		return 1;
	}
	
	// userSeq에 맞는 게시글 전체 조회
	@Override
	public List<Post> readUserPosts(int userSeq) {
		List<Post> posts = postRepository.findByAllPosts(userSeq);
		
		if(!posts.isEmpty())
			return posts;
		else
			return null;
		
	}
	
	
	// 게시글 장애정보 저장하기
	public PostImpairment save(PostImpairment postImpairment) {
		postImpairmentRepository.save(postImpairment);
		return postImpairment;
	}

	// userSeq -> userId
	public String returnUserId(int userSeq) {
		Optional<User> list = userRepository.findById(userSeq);
		String userId = list.get().getUserId();
		return userId;
	}

	// postSeq -> userId
	public String returnUserIdFromPostSeq(long postSeq) {
		Optional<Post> list = postRepository.findById(postSeq);
		int userSeq = list.get().getUserSeq();
		return returnUserId(userSeq);
	}

}
