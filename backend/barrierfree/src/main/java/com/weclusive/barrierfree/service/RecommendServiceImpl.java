package com.weclusive.barrierfree.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;

@Service
public class RecommendServiceImpl implements RecommendService {

	@Autowired
	private ScrapRepository scrapRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@SuppressWarnings("unchecked")
	@Override
	public JSONObject loadDetailView(String contentid) {
		StringBuilder sb = new StringBuilder();
		JSONObject result = new JSONObject();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/detailCommon"
					+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
					+ "&contentId=" + contentid + "&defaultYN=Y&addrinfoYN=Y&overviewYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y"
					+ "&mapinfoYN=Y&firstImageYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json";
			
			URL url = new URL(urlstr);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");
			
			BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
			
			String returnLine;
			while((returnLine = br.readLine()) != null) {
				sb.append(returnLine + "\n");
			}
			connection.disconnect();
			
			JSONParser parser = new JSONParser();
			JSONObject jsonObject = (JSONObject) parser.parse(sb.toString());
			
			JSONObject parse_response = (JSONObject) jsonObject.get("response"); //response key값에 맞는 Value인 JSON객체를 가져옵니다. 
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
//			result.put("impairment", parse_item.get("장애정보"));
			result.put("mapx", parse_item.get("mapx"));
			result.put("mapy", parse_item.get("mapy"));
			result.put("createdtime", parse_item.get("createdtime"));
			result.put("modifiedtime", parse_item.get("modifiedtime"));
			result.put("addr1", parse_item.get("addr1"));
			result.put("homepage", parse_item.get("homepage"));
			result.put("scraptimes", scrapRepository.countByDelYnAndScrapTypeAndScrapData('n', '1', Long.parseLong(contentid)));
//			result.put("scrapYN", scrapService.getScrapYn('1', Long.parseLong(contentid))); 현재 사용자의 seq를 가져오는 api 필요
			result.put("posts", postRepository.findTop20ByDelYnAndContentIdOrderByPostScrapDesc('n', contentid));
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	@Override
	public JSONObject loadImpairment(String contentid) {
		StringBuilder sb = new StringBuilder();
		JSONObject result = new JSONObject();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/detailWithTour"
					+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
					+ "&contentId=" + contentid + "&MobileOS=ETC&MobileApp=AppTest&_type=json";
			
			URL url = new URL(urlstr);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");
			
			BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
			
			String returnLine;
			while((returnLine = br.readLine()) != null) {
				sb.append(returnLine + "\n");
			}
			connection.disconnect();
			
			JSONParser parser = new JSONParser();
			JSONObject jsonObject = (JSONObject) parser.parse(sb.toString());
			
			JSONObject parse_response = (JSONObject) jsonObject.get("response"); //response key값에 맞는 Value인 JSON객체를 가져옵니다. 
			// response 로 부터 body 찾아오기 
			JSONObject parse_body = (JSONObject) parse_response.get("body"); 
			// body 로 부터 items 받아오기 
			JSONObject parse_items = (JSONObject) parse_body.get("items");
			// body 로 부터 items 받아오기 
			JSONObject parse_item = (JSONObject) parse_items.get("item");
			
			System.out.println(parse_item);
			result = parse_item;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}

}
