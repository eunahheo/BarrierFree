package com.weclusive.barrierfree.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.TourapiImpairment;
import com.weclusive.barrierfree.repository.TourapiImpairmentRepository;
import com.weclusive.barrierfree.util.ImpairmentUtils;
import com.weclusive.barrierfree.util.TimeUtils;

@Service
public class TestServiceImpl implements TestService {
	private ImpairmentUtils iutil = new ImpairmentUtils();

	@Autowired
	private TourapiImpairmentRepository trepo;

	public ArrayList<String> loadAllContentId() {
		StringBuilder sb = new StringBuilder();
		ArrayList<String> result = new ArrayList<>();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/areaBasedList"
					+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
					+ "&numOfRows=6761&pageNo=2&MobileOS=ETC&MobileApp=barrierfree&_type=json";

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

			for (Object o : parse_item) {
				JSONObject temp = (JSONObject) o;
				result.add(temp.get("contentid").toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public int loadByContentId(String contentid) {
		StringBuilder sb = new StringBuilder();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/detailWithTour"
					+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
					+ "&contentId=" + contentid + "&MobileOS=ETC&MobileApp=barrierfree&_type=json";

			URL url = new URL(urlstr);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));

			String returnLine = "";
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

			JSONObject obj = iutil.getImpairmentDetail(parse_item);

			obj.keySet().forEach((cur) -> {
				ArrayList<String> list = (ArrayList<String>) obj.get(cur);
				StringBuilder overview = new StringBuilder();
				for (String s : list) {
					overview.append(s).append("</br>");
				}
				System.out.println(contentid);
				if(overview.length()>0) {
					trepo.save(TourapiImpairment.builder().contentId(Long.parseLong(contentid)).code(cur.toString())
							.tiOverview(overview.toString()).regDt(TimeUtils.curTime()).regId("admin").modDt(TimeUtils.curTime())
							.modId("admin").build());
				}
			});

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
}
