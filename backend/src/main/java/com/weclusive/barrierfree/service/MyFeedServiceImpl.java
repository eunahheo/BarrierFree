package com.weclusive.barrierfree.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.Tourapi;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.FollowRepository;
import com.weclusive.barrierfree.repository.PostImpairmentRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.TourapiImpairmentRepository;
import com.weclusive.barrierfree.repository.TourapiRepository;
import com.weclusive.barrierfree.repository.UserRepository;

@Service
public class MyFeedServiceImpl implements MyFeedService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PostRepository postRepository;

	@Autowired
	FollowRepository followRepository;

	@Autowired
	ScrapRepository scrapRepository;

	@Autowired
	RecommendService recommendService;

	@Autowired
	PostImpairmentRepository postImpairmentRepository;

	@Autowired
	private TourapiRepository tourRepository;

	@Autowired
	private TourapiImpairmentRepository tiRepository;

	// 회원 피드 상단
	@Override
	public List<Map<String, Object>> readMyFeed(@RequestParam int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();

		Map<String, Object> obj = new HashMap<>();

		Optional<User> user = userRepository.findAllByUserSeq(userSeq);

		// 유효한 회원이면
		if (user.isPresent()) {
			obj.put("userNickname", user.get().getUserNickname());
			obj.put("userPhoto", user.get().getUserPhoto());
			obj.put("writePost", postRepository.countByUserSeq(userSeq));
			obj.put("following", followRepository.countFollowing(userSeq));
			obj.put("follower", followRepository.countFollower(userSeq));
			obj.put("totalScarp", scrapRepository.countByDelYnAndScrapTypeAndUserSeq('n', '0', userSeq)
					+ scrapRepository.countByDelYnAndScrapTypeAndUserSeq('n', '1', userSeq));

			result.add(obj);
			return result;
		}
		return null;
	}

	// 팔로잉 목록
	@Override
	public List<Map<String, Object>> readFollowing(int userSeq) {
		int countFollowing = followRepository.countFollowing(userSeq);

		if (countFollowing != 0) {
			List<Map<String, Object>> result = new LinkedList<>();

			List<Integer> following = followRepository.findFollowings(userSeq);

			for (int i = 0; i < following.size(); i++) {
				Map<String, Object> obj = new HashMap<>();
				int followingSeq = following.get(i);
				User followingUser = userRepository.findByUserSeq(followingSeq);
				obj.put("userSeq", followingSeq);
				obj.put("userNickname", followingUser.getUserNickname());
				obj.put("userPhoto", followingUser.getUserPhoto());
				result.add(obj);
			}

			return result;
		}
		return null;

	}

	// 팔로워 목록
	@Override
	public List<Map<String, Object>> readFollower(int userSeq) {
		int countFollower = followRepository.countFollower(userSeq);

		if (countFollower != 0) {
			List<Map<String, Object>> result = new LinkedList<>();

			List<Integer> follower = followRepository.findFollowers(userSeq);

			for (int i = 0; i < follower.size(); i++) {
				Map<String, Object> obj = new HashMap<>();
				int followerSeq = follower.get(i);
				User followerUser = userRepository.findByUserSeq(followerSeq);

				// 현재 사용자가 자신의 팔로워를 팔로잉 했는지 여부
				if (followRepository.findByUserSeqAndFollowingSeqAndDelYn(userSeq, followerSeq, 'n') == null) {
					obj.put("isfollow", 'n');
				} else
					obj.put("isfollow", 'y');

				obj.put("userSeq", followerSeq);
				obj.put("userNickname", followerUser.getUserNickname());
				obj.put("userPhoto", followerUser.getUserPhoto());

				result.add(obj);
			}

			return result;
		}
		return null;
	}

	// 작성 게시글 조회하기
	@Override
	public List<Map<String, Object>> readPost(int userSeq) {
		List<Map<String, Object>> result = new LinkedList<>();
		List<Post> posts = postRepository.findByUserSeq(userSeq);
		
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

	// 스크랩한 게시글
	@Override
	public List<Map<String, Object>> readScrapPost(int userSeq) {
		Optional<User> user = userRepository.findAllByUserSeq(userSeq);

		// 사용자가 있으면
		if (user.isPresent()) {
			List<Long> scrapPostSeq = scrapRepository.findScrapPost(userSeq, '0');
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
					obj.put("scrap_yn", 'y');

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
	public List<Map<String, Object>> readScrapRecommend(int userSeq) throws Exception {
		Optional<User> user = userRepository.findAllByUserSeq(userSeq);

		// 사용자가 있으면
		if (user.isPresent()) {
			List<Long> scrapPostSeq = scrapRepository.findScrapPost(userSeq, '1');
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
						obj.put("scrap_yn", 'y');

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
