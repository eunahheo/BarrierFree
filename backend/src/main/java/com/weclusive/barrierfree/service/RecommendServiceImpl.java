package com.weclusive.barrierfree.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.util.ImpairmentUtils;

@Service
public class RecommendServiceImpl implements RecommendService {

	@Autowired
	private ScrapRepository scrapRepository;

	@Autowired
	private PostRepository postRepository;

	private ImpairmentUtils iutil = new ImpairmentUtils();
	
	// 상세보기 페이지에 필요한 정보들 반환
	@SuppressWarnings("unchecked")
	@Override
	public JSONObject loadDetailView(String contentid) throws Exception {
		StringBuilder sb = new StringBuilder();
		JSONObject result = new JSONObject();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/detailCommon"
					+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
					+ "&contentId=" + contentid
					+ "&defaultYN=Y&addrinfoYN=Y&overviewYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y"
					+ "&mapinfoYN=Y&firstImageYN=Y&MobileOS=ETC&MobileApp=barrierfree&_type=json";

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

			result.put("title", parse_item.get("title"));
			result.put("firstimage", parse_item.get("firstimage"));
			result.put("firstimage2", parse_item.get("firstimage2"));
			result.put("overview", parse_item.get("overview"));
			result.put("impairments",loadImpairmentDetail(contentid));
			result.put("mapx", parse_item.get("mapx"));
			result.put("mapy", parse_item.get("mapy"));
			result.put("createdtime", parse_item.get("createdtime"));
			result.put("modifiedtime", parse_item.get("modifiedtime"));
			result.put("addr1", parse_item.get("addr1"));
			result.put("homepage", parse_item.get("homepage"));
			result.put("scraptimes",
					scrapRepository.countByDelYnAndScrapTypeAndScrapData('n', '1', Long.parseLong(contentid)));
//			result.put("scrapYN", scrapService.getScrapYn('1', Long.parseLong(contentid))); 현재 사용자의 seq를 가져오는 api 필요
			result.put("posts", postRepository.findTop20ByDelYnAndContentIdOrderByPostScrapDesc('n', contentid));
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
	
	// 지역 시도 리스트 반환
	@Override
	public JSONArray getSido() throws Exception {
		StringBuilder sb = new StringBuilder();
		JSONArray result = new JSONArray();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/areaCode"
					+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
					+ "&numOfRows=17&MobileOS=ETC&MobileApp=barrierfree&_type=json";

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
			result = (JSONArray) parse_items.get("item");

			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

	@Override
	public JSONArray getSigungu(int sidoCode) throws Exception {
		StringBuilder sb = new StringBuilder();
		JSONArray result = new JSONArray();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/areaCode?"
					+ "ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
					+ "&areaCode=" + sidoCode + "&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=barrierfree&_type=json";

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
			result = (JSONArray) parse_items.get("item");

			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

	@Override
	public List<Map<String, Object>> search(int userSeq, String sidoCode, String sigunguCode, String contentTypeId, JSONObject impairments) throws Exception {
		StringBuilder sb = new StringBuilder();
		List<Map<String, Object>> result = new LinkedList<>();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/areaBasedList"
					+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
					+ "";
					
			if(sidoCode!=null) {
				urlstr += "&areaCode="+ sidoCode;
				if(sigunguCode!=null)
					urlstr += "&sigunguCode=" + sigunguCode;
			}
			
			if(contentTypeId!=null)
				urlstr += "&contentTypeId=" + contentTypeId;
			
			urlstr += "&MobileOS=ETC&MobileApp=barrierfree&_type=json";

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
			JSONArray parse_item = (JSONArray) parse_items.get("item");
			
			for(Object o : parse_item) {
				Map<String, Object> obj = new HashMap<>();
				JSONObject temp = (JSONObject) o;
				obj.put("contentid", temp.get("contentid"));
				obj.put("title", temp.get("title"));
				obj.put("firstimage", temp.get("firstimage"));
				obj.put("addr1", temp.get("addr1"));
				
				char scrap_yn = 'n';
//				 현재 사용자의 seq를 가져오는 api 필요
				if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '1', userSeq, (long) temp.get("contentid")) > 0)
					scrap_yn = 'y';
				obj.put("scrap_yn", scrap_yn);
				
				result.add(obj);
			}

			System.out.println(result);
		} catch (ClassCastException e) {
			e.printStackTrace();
			throw new ClassCastException();
		}
			catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

	@Override
	public List<Map<String, Object>> getNearMyLocation(int userSeq, String lat, String lng, String radius, String contentTypeId) throws Exception {
		StringBuilder sb = new StringBuilder();
		List<Map<String, Object>> result = new LinkedList<>();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/locationBasedList"
					+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
					+ "&mapX=" + lng + "&mapY=" + lat + "&radius=" + radius;
			
			if(contentTypeId!=null)
				urlstr += "&contentTypeId=" + contentTypeId;
			
			urlstr += "&MobileOS=ETC&MobileApp=barrierfree&_type=json";

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
			JSONArray parse_item = (JSONArray) parse_items.get("item");
			
			for(Object o : parse_item) {
				Map<String, Object> obj = new HashMap<>();
				JSONObject temp = (JSONObject) o;
				obj.put("contentid", temp.get("contentid"));
				obj.put("title", temp.get("title"));
				obj.put("firstimage", temp.get("firstimage"));
				obj.put("addr1", temp.get("addr1"));
				
				char scrap_yn = 'n';
//				 현재 사용자의 seq를 가져오는 api 필요
				if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '1', userSeq, (long) temp.get("contentid")) > 0)
					scrap_yn = 'y';
				obj.put("scrap_yn", scrap_yn);
				
				result.add(obj);
			}

			System.out.println(result);
		} catch (ClassCastException e) {
			e.printStackTrace();
			throw new ClassCastException();
		}
			catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

	

}
