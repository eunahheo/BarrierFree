package com.weclusive.barrierfree.service;

import java.io.BufferedReader;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.PostImpairmentRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.ImpairmentUtils;

@Service
public class SearchServiceImpl implements SearchService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private PostImpairmentRepository postImpairmentRepository;

	@Autowired
	private ScrapRepository scrapRepository;
	
	@Autowired
	private ScrapService scrapService;

	private ImpairmentUtils iutil = new ImpairmentUtils();
	
	// 사용자 닉네임 검색
	@Override
	public List<Map<String, Object>> searchUser(String keyword, int count) {
		List<Map<String, Object>> result = new ArrayList<>();

		List<User> users = userRepository.findByUserNicknameContaining(keyword);

		users.forEach(user -> {
			Map<String, Object> map = new HashMap<>();
			map.put("userSeq", user.getUserSeq());
			map.put("userNickname", user.getUserNickname());
			map.put("userPhoto", user.getUserPhoto());
			result.add(map);
		});
		return result;
	}

	// 사용자 게시글 검색 - 제목, 내용, 지역
	@Override
	public List<Map<String, Object>> searchPost(String keyword, int userSeq, int count) {
		List<Map<String, Object>> result = new ArrayList<>();

		List<Post> posts = postRepository
				.findByDelYnAndPostTitleContainingOrPostContentContainingOrPostLocationContaining('n', keyword, keyword,
						keyword);

		posts.forEach(post -> {
			Map<String, Object> map = new HashMap<>();
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
			result.add(map);
		});
		return result;
	}

	@Override
	public List<Map<String, Object>> searchRestaurant(String keyword, int count) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchAccommodation(String keyword, int count) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchEvent(String keyword, int count) {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public JSONObject searchTour(String keyword, int count) {
		StringBuilder sb = new StringBuilder();
		JSONObject result = new JSONObject();
		try {
			StringBuilder urlSb = new StringBuilder();
			urlSb.append(
					"http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/searchKeyword?")
			.append("serviceKey=JQ0dr75fofUBYyMcnAMiT5lY7W5N4BOl%2FazS3t%2BSyM1ypfNKYZcOsBbLG1AEeVs48N6KfarxqeC1D09kVX3G6Q%3D%3D")
			.append("&numOfRows=500&pageNo=1&MobileOS=ETC&MobileApp=BarrierFree&listYN=Y&arrange=B")
			.append("&contentTypeId=12") // 명소
			.append("&keyword=")
			.append(keyword);
			 

			URL url = new URL(urlSb.toString());
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));

			String returnLine;
			while ((returnLine = br.readLine()) != null) {
				sb.append(returnLine + "\n");
			}
			connection.disconnect();

			JSONParser parser = new JSONParser();
			JSONObject jsonObject = (JSONObject) parser.parse(sb.toString());
			System.out.println(jsonObject);

			JSONObject parse_response = (JSONObject) jsonObject.get("response"); // response key값에 맞는 Value인 JSON객체를
																					// 가져옵니다.
			// 잘못된 컨텐츠id면 리턴
			// response 로 부터 body 찾아오기
			JSONObject parse_body = (JSONObject) parse_response.get("body");
			// body 로 부터 items 받아오기
			JSONObject parse_items = (JSONObject) parse_body.get("items");
			// body 로 부터 items 받아오기
			JSONObject parse_item = (JSONObject) parse_items.get("item");

			System.out.println(parse_item);
			String contentid = (String) parse_item.get("contentid");
			
			result.put("title", parse_item.get("title"));
			result.put("firstimage", parse_item.get("firstimage"));
			result.put("impairments", loadImpairmentDetail(contentid));
			result.put("mapx", parse_item.get("mapx"));
			result.put("mapy", parse_item.get("mapy"));
			result.put("addr1", parse_item.get("addr1"));
			result.put("scraptimes",
					scrapRepository.countByDelYnAndScrapTypeAndScrapData('n', '1', Long.parseLong(contentid)));
//			result.put("scrapYN", scrapService.getScrapYn('1', Long.parseLong(contentid))); //현재 사용자의 seq를 가져오는 api 필요
			result.put("posts", postRepository.findTop20ByDelYnAndContentIdOrderByPostScrapDesc('n', contentid));
		} catch (Exception e) {
			e.printStackTrace();
//			throw new Exception();
		}
		return result;
	}
	
	// 해당 컨텐츠id의 무장애정보 분류만 반환
		@Override
		public ArrayList<String> loadImpairment(String contentid) throws Exception {
			StringBuilder sb = new StringBuilder();
			ArrayList<String> result = new ArrayList<>();
			try {
				String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/detailWithTour"
						+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
						+ "&contentId=" + contentid + "&MobileOS=ETC&MobileApp=barrierfree&_type=json";

				URL url = new URL(urlstr);
				HttpURLConnection connection = (HttpURLConnection) url.openConnection();
				connection.setRequestMethod("GET");

				BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));

				String returnLine;
				while ((returnLine = br.readLine()) != null) {
					sb.append(returnLine + "\n");
				}
				connection.disconnect();

				JSONParser parser = new JSONParser();
				JSONObject jsonObject = (JSONObject) parser.parse(sb.toString());

				JSONObject parse_response = (JSONObject) jsonObject.get("response"); // response key값에 맞는 Value인 JSON객체를
																						// 가져옵니다.
				// response 로 부터 body 찾아오기
				JSONObject parse_body = (JSONObject) parse_response.get("body");
				// body 로 부터 items 받아오기
				JSONObject parse_items = (JSONObject) parse_body.get("items");
				// body 로 부터 items 받아오기
				JSONObject parse_item = (JSONObject) parse_items.get("item");

				System.out.println(parse_item);
				result = iutil.getImpairment(parse_item);

			} catch (Exception e) {
				e.printStackTrace();
				throw new Exception();
			}
			return result;
		}

		@Override
		public JSONObject loadImpairmentDetail(String contentid) throws Exception {
			StringBuilder sb = new StringBuilder();
			JSONObject result = new JSONObject();
			try {
				String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/detailWithTour"
						+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
						+ "&contentId=" + contentid + "&MobileOS=ETC&MobileApp=barrierfree&_type=json";

				URL url = new URL(urlstr);
				HttpURLConnection connection = (HttpURLConnection) url.openConnection();
				connection.setRequestMethod("GET");

				BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));

				String returnLine;
				while ((returnLine = br.readLine()) != null) {
					sb.append(returnLine + "\n");
				}
				connection.disconnect();

				JSONParser parser = new JSONParser();
				JSONObject jsonObject = (JSONObject) parser.parse(sb.toString());

				JSONObject parse_response = (JSONObject) jsonObject.get("response"); // response key값에 맞는 Value인 JSON객체를
																						// 가져옵니다.
				// response 로 부터 body 찾아오기
				JSONObject parse_body = (JSONObject) parse_response.get("body");
				// body 로 부터 items 받아오기
				JSONObject parse_items = (JSONObject) parse_body.get("items");
				// body 로 부터 items 받아오기
				JSONObject parse_item = (JSONObject) parse_items.get("item");

				System.out.println(parse_item);
				result = iutil.getImpairmentDetail(parse_item);

			} catch (Exception e) {
				e.printStackTrace();
				throw new Exception();
			}
			return result;
		}

}
