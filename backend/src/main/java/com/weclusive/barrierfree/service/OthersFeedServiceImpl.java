package com.weclusive.barrierfree.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Follow;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.Tourapi;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.FollowRepository;
import com.weclusive.barrierfree.repository.OthersFeedRepository;
import com.weclusive.barrierfree.repository.PostImpairmentRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.TourapiImpairmentRepository;
import com.weclusive.barrierfree.repository.TourapiRepository;
import com.weclusive.barrierfree.repository.UserRepository;

@Service
public class OthersFeedServiceImpl implements OthersFeedService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PostRepository postRepository;

	@Autowired
	private TourapiRepository tourRepository;

	@Autowired
	private TourapiImpairmentRepository tiRepository;

	@Autowired
	FollowRepository followRepository;

	@Autowired
	ScrapRepository scarpRepository;

	@Autowired
	OthersFeedRepository othersFeedRepository;

	@Autowired
	PostImpairmentRepository postImpairmentRepository;

	@Autowired
	ScrapRepository scrapRepository;

	@Autowired
	RecommendService recommendService;

	@Override
	public Map<String, Object> readOthersFeed(int userSeq, int otherUserSeq) {

		Map<String, Object> obj = new HashMap<>();

		Optional<User> user = userRepository.findAllByUserSeq(otherUserSeq);

		if (user.isPresent()) {
			obj.put("userNickname", user.get().getUserNickname());
			obj.put("userPhoto", user.get().getUserPhoto());
			obj.put("writePost", postRepository.countByUserSeq(otherUserSeq));
			obj.put("following", followRepository.countFollowing(otherUserSeq));
			obj.put("follower", followRepository.countFollower(otherUserSeq));
		}

		Follow follow = followRepository.findByUserSeqAndFollowingSeqAndDelYn(userSeq, otherUserSeq, 'n');
		if (follow == null)
			obj.put("isfollow", 'n');
		else
			obj.put("isfollow", 'y');

		return obj;
	}

	@Override
	public List<Map<String, Object>> readOthersPost(int otherUserSeq, int userSeq) {
		// otherUserSeq : 상대방
		// userSeq: 현재 사용자
		List<Map<String, Object>> result = new LinkedList<>();

		List<Post> posts = othersFeedRepository.findByUserSeq(otherUserSeq); // 상대방이 작성한 글
		posts.forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post", post);
			List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
			obj.put("impairment", list);

			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
					post.getPostSeq()) > 0) {
				obj.put("scrap_yn", 'y');
			} else
				obj.put("scrap_yn", 'n');
			result.add(obj);
		});
		return result;
	}

	// otherUserSeq가 팔로잉하는 목록
	@Override
	public List<Map<String, Object>> readOthersFollowing(int otherUserSeq, int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();

		List<Follow> followingList = followRepository.findByUserSeq(otherUserSeq);
		followingList.forEach(following -> {
			System.out.println("seq: " +following.getFollowingSeq());
			Map<String, Object> obj = new HashMap<>();
			User user = userRepository.findByUserSeq(following.getFollowingSeq());
//			obj.put("userId", user.getUserId());
			obj.put("userPhoto", user.getUserPhoto());
			obj.put("userNickname", user.getUserNickname());
			obj.put("userSeq", following.getFollowingSeq());

			Follow isFollowing = (Follow) followRepository.findByDelYnAndUserSeqAndFollowingSeq(userSeq,
					following.getFollowingSeq());
			if (isFollowing == null) {
				obj.put("isfollow", 'n');
			} else {
				obj.put("isfollow", 'y');
			}
			result.add(obj);
		});
		return result;
	}

	@Override
	public List<Map<String, Object>> readOthersFollower(int otherUserSeq, int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();

		List<Follow> followingList = followRepository.findByFollowingSeq(otherUserSeq);
		followingList.forEach(following -> {
			Map<String, Object> obj = new HashMap<>();
			User user = userRepository.findByUserSeq(following.getUserSeq());
//			obj.put("userId", user.getUserId());
			obj.put("userPhoto", user.getUserPhoto());
			obj.put("userNickname", user.getUserNickname());
			obj.put("userSeq", following.getUserSeq());

			Follow isFollowing = (Follow) followRepository.findByDelYnAndUserSeqAndFollowingSeq(userSeq,
					following.getUserSeq());
			if (isFollowing == null) {
				obj.put("isfollow", 'n');
			} else {
				obj.put("isfollow", 'y');
			}
			result.add(obj);
		});
		return result;
	}

	@Override
	public List<Map<String, Object>> readScrapPost(int otherUserSeq, int userSeq) {
		Optional<User> user = userRepository.findAllByUserSeq(otherUserSeq);

		// 사용자가 있으면
		if (user.isPresent()) {
			List<Long> scrapPostSeq = scrapRepository.findScrapPost(otherUserSeq, '0');
			List<Map<String, Object>> result = new LinkedList<>();
			System.out.println(scrapPostSeq.size());
			// 스크랩 게시글이 있으면
			if (scrapPostSeq.size() != 0) {
				// 최신순 조회를 위해서 역순 정렬
				scrapPostSeq.forEach(p -> {
					Post post = postRepository.findByPostSeqP(p); // 스크랩한 게시글
					Map<String, Object> obj = new HashMap<>();
					obj.put("post_seq", post.getPostSeq());
					obj.put("user_seq", post.getUserSeq());
					obj.put("post_title", post.getPostTitle());
					obj.put("post_photo", post.getPostPhoto());
					obj.put("post_location", post.getPostLocation());
					List<String> list = postImpairmentRepository.findImpairment(post.getPostSeq());
					obj.put("impairment", list);

					if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '0', userSeq,
							post.getPostSeq()) > 0) {
						obj.put("scrap_yn", 'y');
					} else
						obj.put("scrap_yn", 'n');
					result.add(obj);
				});
			}
			return result;
		}
		return null;
	}

	// 스크랩한 추천글
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> readScrapRecommend(int otherUserSeq, int userSeq) throws Exception {
		Optional<User> user = userRepository.findAllByUserSeq(otherUserSeq);

		// 사용자가 있으면
		if (user.isPresent()) {
			List<Long> scrapPostSeq = scrapRepository.findScrapPost(otherUserSeq, '1');
			List<Map<String, Object>> result = new LinkedList<>();

			// 스크랩 게시글이 있으면
			if (scrapPostSeq.size() != 0) {
				for (int i = 0; i < scrapPostSeq.size(); i++) {
					try {
						System.out.println(scrapPostSeq.get(i));
						Map<String, Object> obj = new HashMap<String, Object>();
						Tourapi info = tourRepository.findByDelYnAndContentId('n', scrapPostSeq.get(i));
						long contentId = info.getContentId();
						obj.put("contentId", contentId);
						obj.put("title", info.getTourapiTitle());
						obj.put("firstimage", info.getTourapiImage());
						obj.put("addr1", info.getTourapiAddr1());

						// 장애정보 JSONArray
						String[] impairments = tiRepository.selectConentImpairment(contentId);
						JSONArray impairment = new JSONArray();
						for (String imp : impairments) {
							impairment.add(imp);
						}
						obj.put("impairment", impairment);

						if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '1', userSeq,
								scrapPostSeq.get(i)) > 0) {
							obj.put("scrap_yn", 'y');
						} else
							obj.put("scrap_yn", 'n');

						result.add(obj);
					} catch (Exception e) {
						e.printStackTrace();
						throw new Exception();
					}
				}
			}
			return result;
		}
		return null;
	}
}
