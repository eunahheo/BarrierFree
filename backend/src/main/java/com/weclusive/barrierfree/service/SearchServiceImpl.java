package com.weclusive.barrierfree.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Follow;
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
public class SearchServiceImpl implements SearchService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	FollowRepository followRepository;
	
	@Autowired
	private PostRepository postRepository;

	@Autowired
	private PostImpairmentRepository postImpairmentRepository;

	@Autowired
	private ScrapRepository scrapRepository;

	@Autowired
	private ScrapService scrapService;

	@Autowired
	private TourapiRepository tourapiRepository;
	
	@Autowired
	private TourapiImpairmentRepository tourapiImpairmentRepository;

	// 사용자 닉네임 검색
	@Override
	public List<Map<String, Object>> searchUser(int userSeq, String keyword, int page, int size) {
		List<Map<String, Object>> result = new ArrayList<>();
		PageRequest pageRequest = PageRequest.of(page, size);
		Page<User> pageResult = userRepository.findByUserNicknameContainingAndDelYn(keyword, 'n', pageRequest);

		List<User> users = pageResult.getContent();
		users.forEach(user -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("userSeq", user.getUserSeq());
			obj.put("userNickname", user.getUserNickname());
			obj.put("userPhoto", user.getUserPhoto());
			
			Follow follow = followRepository.findByUserSeqAndFollowingSeqAndDelYn(userSeq, user.getUserSeq(), 'n');
			if(follow == null) obj.put("isfollow", 'n');
			else obj.put("isfollow", 'y');
			
			result.add(obj);
		});
		Map<String, Object> paging = new HashMap<>();
		paging.put("pageable", pageResult.getPageable());
		paging.put("totalPages", pageResult.getTotalPages());
		paging.put("numberOfElements", pageResult.getNumberOfElements());
		
		return result;
	}

	// 사용자 게시글 검색 - 제목, 내용, 지역
	@Override
	public List<Map<String, Object>> searchPost(String keyword, int userSeq, int page, int size) {
		List<Map<String, Object>> result = new ArrayList<>();

		PageRequest pageRequest = PageRequest.of(page, size);
		Page<Post> pageResult = postRepository.findByDelYnAndPostTitleContainingOrPostContentContainingOrPostLocationContaining('n', keyword, keyword, keyword, pageRequest);
		
		List<Post> posts = pageResult.getContent();
		posts.forEach(post -> {
			Map<String, Object> obj = new HashMap<>();
			obj.put("post_seq", post.getPostSeq());
			obj.put("user_seq", post.getUserSeq());
			obj.put("post_title", post.getPostTitle());
			obj.put("post_content", post.getPostContent());
			obj.put("post_photo", post.getPostPhoto());
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
		Map<String, Object> paging = new HashMap<>();
		paging.put("pageable", pageResult.getPageable());
		paging.put("totalPages", pageResult.getTotalPages());
		paging.put("numberOfElements", pageResult.getNumberOfElements());
		result.add(paging);
		
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<JSONObject> searchTour(String keyword, String contentTypeId, int userSeq, int page, int size)
			throws Exception {
		List<JSONObject> result = new ArrayList<>();
		PageRequest pageRequest = PageRequest.of(page, size);
		Page<Tourapi> pageTours = tourapiRepository.findByTourapiTitleContainingAndTourapiContenttypeid(keyword, contentTypeId, pageRequest);
		
		List<Tourapi> tours = pageTours.getContent();
		for (int i = 0; i < tours.size(); i++) {

			JSONObject obj = new JSONObject();
			Tourapi tourapi = tours.get(i);

			// 해당 contentid에 해당하는 장애정보 Code들
			long contentid = tourapi.getContentId();
			String[] impairments = tourapiImpairmentRepository.selectConentImpairment(contentid);
			
			// 장애정보 JSONArray
			JSONArray impairment = new JSONArray();
			for (String imp : impairments) {
				impairment.add(imp);
			}
			
			obj.put("contentid", contentid);
			obj.put("title", tourapi.getTourapiTitle());
			obj.put("firstimage", tourapi.getTourapiImage());
			obj.put("impairment", impairment);
			obj.put("lng", tourapi.getTourapiLng());
			obj.put("lat", tourapi.getTourapiLat());
			obj.put("addr1", tourapi.getTourapiAddr1());
			obj.put("scrapYN", scrapService.getScrapYn(userSeq, '1', contentid));
			obj.put("pageable", pageTours.getPageable());
			obj.put("totalPages", pageTours.getTotalPages());
			obj.put("numberOfElements", pageTours.getNumberOfElements());

			result.add(obj);
		}
		return result;
	}

}
