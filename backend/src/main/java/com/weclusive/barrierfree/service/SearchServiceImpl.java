package com.weclusive.barrierfree.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
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

	@SuppressWarnings("unchecked")
	@Override
	public List<JSONObject> searchTour(String keyword, String contentTypeId, int userSeq) throws Exception {
		StringBuilder sb = new StringBuilder();
		List<JSONObject> result = new ArrayList<>();
		try {
			StringBuilder urlBuilder = new StringBuilder("http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/searchKeyword"); //URL
            urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=oe7OTbBkAde50WbBoRyFG%2FWfDB6ekTwQu1XJllixXgeyhgOlJho9c2mIcuYrmN%2BXg4g0l0eshTzlH7GHPQlC1A%3D%3D"); //Service Key
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("300", "UTF-8")); //한 페이지 결과 수
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));//현재 페이지 번호
            urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); //IOS(아이폰),AND(안드로이드),WIN(원도우폰),ETC
            urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("barrierfree", "UTF-8")); //서비스명=어플명
            urlBuilder.append("&" + URLEncoder.encode("listYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); //목록 구분(Y=목록, N=개수)
            urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode("B", "UTF-8")); //(A=제목순,B=조회순,C=수정일순,D=생성일순) 대표이미지가 반드시 있는 정렬(O=제목순, P=조회순, Q=수정일순, R=생성일순)
          
            // contentTypeId를 지정하지 않으면 관계 없이 모두 검색 된다.
            if(!contentTypeId.equals("0"))   urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode(contentTypeId, "UTF-8")); //관광타입(관광지, 숙박 등) ID
            
            urlBuilder.append("&" + URLEncoder.encode("keyword","UTF-8") + "=" + URLEncoder.encode(keyword, "UTF-8")); //검색 요청할 키워드 (국문=인코딩 필요)
            urlBuilder.append("&" + URLEncoder.encode("totalCnt","UTF-8") + "=" + URLEncoder.encode("3", "UTF-8")); //ListYN(Y=결과 리스트, N=리스트 갯수)
            urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8")+'='+URLEncoder.encode("json","UTF-8"));
           
            URL url = new URL(urlBuilder.toString());
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));

			String returnLine;
			while ((returnLine = br.readLine()) != null) {
				sb.append(returnLine + "\n");
				System.out.println(returnLine + "\n");
			}
			connection.disconnect();

			JSONParser parser = new JSONParser();
			JSONObject jsonObject = (JSONObject) parser.parse(sb.toString());
			JSONObject parse_response = (JSONObject) jsonObject.get("response"); // response key값에 맞는 Value인 JSON객체를
																					// 가져옵니다.
			// 잘못된 컨텐츠id면 리턴
			// response 로 부터 body 찾아오기
			JSONObject parse_body = (JSONObject) parse_response.get("body");
			// body 로 부터 items 받아오기
			JSONObject parse_items = null;
			try {
				parse_items = (JSONObject) parse_body.get("items");
			} catch (Exception e) {
				return null;
			}
			
			Long totalCount = (Long) parse_body.get("totalCount");

			if(totalCount == 1) {
				JSONObject item = (JSONObject) parse_items.get("item");
				JSONObject tour = new JSONObject();
				
				String contentid = item.get("contentid").toString();

				tour.put("contentid", item.get("contentid"));
				tour.put("title", item.get("title"));
				tour.put("firstimage", item.get("firstimage"));
				
				
				tour.put("impairments",loadImpairmentDetail(contentid));
				tour.put("mapx", item.get("mapx"));
				tour.put("mapy", item.get("mapy"));
				tour.put("addr1", item.get("addr1"));
				tour.put("scrapYN", scrapService.getScrapYn(userSeq, '1', Long.parseLong(contentid)));

				result.add(tour);
				return result;
			}
			// body 로 부터 items 받아오기
			JSONArray parse_item = (JSONArray) parse_items.get("item");
			
			for (int i = 0; i < parse_item.size(); i++) {
				JSONObject item = (JSONObject) parse_item.get(i);
				JSONObject tour = new JSONObject();
				
				String contentid = item.get("contentid").toString();

				tour.put("contentid", item.get("contentid"));
				tour.put("title", item.get("title"));
				tour.put("firstimage", item.get("firstimage"));
				tour.put("impairment", loadImpairmentDetail(contentid));
				tour.put("mapx", item.get("mapx"));
				tour.put("mapy", item.get("mapy"));
				tour.put("addr1", item.get("addr1"));
				tour.put("scrapYN", scrapService.getScrapYn(userSeq, '1', Long.parseLong(contentid)));

				result.add(tour);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
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
	public JSONArray loadImpairmentDetail(String contentid) throws Exception {
		StringBuilder sb = new StringBuilder();
		JSONArray result = new JSONArray();
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
			result = iutil.getImpairmentInt(parse_item);

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

}
