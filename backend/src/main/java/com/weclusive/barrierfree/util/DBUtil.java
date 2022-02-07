package com.weclusive.barrierfree.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Sigungu;
import com.weclusive.barrierfree.entity.Tourapi;
import com.weclusive.barrierfree.entity.TourapiImage;
import com.weclusive.barrierfree.repository.SidoRepository;
import com.weclusive.barrierfree.repository.SigunguRepository;
import com.weclusive.barrierfree.repository.TourapiImageRepository;
import com.weclusive.barrierfree.repository.TourapiRepository;

@Service
public class DBUtil {
	@Autowired
	static TourapiRepository tourapiRepository;
	
	@Autowired
	static SigunguRepository sigunguRepository;
	
	@Autowired
	static SidoRepository sidoRepository;
	
	@Autowired
	static TourapiImageRepository tourapiImageRepository;
	
	public static void searchContentId(int pageNo) throws Exception {
		StringBuilder sb = new StringBuilder();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/areaBasedList"
					+ "?ServiceKey=oe7OTbBkAde50WbBoRyFG%2FWfDB6ekTwQu1XJllixXgeyhgOlJho9c2mIcuYrmN%2BXg4g0l0eshTzlH7GHPQlC1A%3D%3D";
			urlstr += "&numOfRows=10";
			urlstr += "&pageNo=" + pageNo;
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

			for (Object o : parse_item) {
				JSONObject temp = (JSONObject) o;
				System.out.print(temp.get("contentid")+" ");
				long contentid = Long.parseLong(temp.get("contentid").toString());
				String now = TimeUtils.curTime();
				loadDetail(contentid, now);
				loadImage(contentid, now);
			}

		} catch (ClassCastException e) {
			e.printStackTrace();
			throw new ClassCastException();
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
	}

	@SuppressWarnings("unchecked")
	public static void loadDetail(long contentid, String now) throws Exception {
		StringBuilder sb = new StringBuilder();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/detailCommon"
					+ "?ServiceKey=oe7OTbBkAde50WbBoRyFG%2FWfDB6ekTwQu1XJllixXgeyhgOlJho9c2mIcuYrmN%2BXg4g0l0eshTzlH7GHPQlC1A%3D%3D"
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
			JSONObject tour = (JSONObject) parse_items.get("item");

			String tel = null;
			String addr2 = null;
			
			try {
				 tel = tour.get("tel").toString();
			} catch (Exception e) {
				System.out.println("tel is null");
			}
			
			try {
				addr2 = tour.get("addr2").toString();
			} catch (Exception e) {
				 System.out.println("addr2 is null");
			}
			
			System.out.println(sidoRepository.findAll());
			
			String sidoCode = tour.get("areacode").toString();
			String sigunguName = tour.get("addr1").toString().split(" ")[1]; //시군구 이름
			System.out.println(sidoCode +" "+ sigunguName);
			
			
			Sigungu sigungu = sigunguRepository.findBySidoCodeAndSigunguName(sidoCode, sigunguName);
			System.out.println(sigunguRepository.findBySidoCodeAndSigunguName(sidoCode, sigunguName).getSidoCode());
			String sigunguCode = sigunguRepository.findBySidoCodeAndSigunguName(sidoCode, sigunguName).getSigunguCode();
			System.out.println(sigunguCode);
			
			tourapiRepository.save(
					Tourapi.builder()
					.contentId(contentid)
					.tourapiContentTypeId(tour.get("contenttypeid").toString())
					.tourapiTitle(tour.get("title").toString())
					.sidoCode(sidoCode)//
					.sigunguCode(sigunguCode)//
					.tourapiAddr1(tour.get("addr1").toString())
					.tourapiAddr2(addr2)
					.tourapiZipcode(tour.get("zipcode").toString())
					.tourapiLat(tour.get("lat").toString())
					.tourapiLng(tour.get("lng").toString())
					.tourapiTel(tel)
					.tourapiImage(tour.get("title").toString())
					.tourapiOverview(tour.get("overview").toString())
					.tourapiHomepage(tour.get("homepage").toString())
					.delYn('n')
					.regDt(now)
					.regId("admin")
					.modDt(now)
					.modId("admin")
				.build());
			

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
	}
	
	public static void loadImage(long contentid, String now) throws Exception {
		StringBuilder sb = new StringBuilder();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/detailImage"
					+ "?ServiceKey=oe7OTbBkAde50WbBoRyFG%2FWfDB6ekTwQu1XJllixXgeyhgOlJho9c2mIcuYrmN%2BXg4g0l0eshTzlH7GHPQlC1A%3D%3D"					+ "&contentId=" + contentid
					+ "&numOfRows=100"
					+ "&pageNo=1"
					+ "&MobileOS=ETC&MobileApp=barrierfree"
					+ "&contentId=" + contentid
					+ "&imageYN=Y&subImageYN=Y&_type=json";

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
			
			// 잘못된 컨텐츠id면 리턴
			// response 로 부터 body 찾아오기
			JSONObject parse_body = (JSONObject) parse_response.get("body");
			
			Long totalCount = (Long) parse_body.get("totalCount");
			if(totalCount == 0) return;
			
			if(totalCount == 1) {
				// body 로 부터 items 받아오기
				JSONObject parse_items = (JSONObject) parse_body.get("items");
				
				JSONObject image = (JSONObject) parse_items.get("item"); // response key값에 맞는 Value인 JSON객체를
				
				tourapiImageRepository.save(
						TourapiImage.builder()
						.contentId(contentid)
						.timImage(image.get("originimgurl").toString())
						.delYn('n')
						.regDt(now)
						.regId("admin")
						.modDt(now)
						.modId("admin")
						.build()
						);
				
				return;
			}
			
			// body 로 부터 items 받아오기
			JSONArray parse_items = (JSONArray) parse_body.get("items");
			
			for (int i = 0; i < parse_items.size(); i++) {
				JSONObject image = (JSONObject) parse_items.get(i); // response key값에 맞는 Value인 JSON객체를
				
				tourapiImageRepository.save(
						TourapiImage.builder()
						.contentId(contentid)
						.timImage(image.get("originimgurl").toString())
						.delYn('n')
						.regDt(now)
						.regId("admin")
						.modDt(now)
						.modId("admin")
						.build()
						);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
	}
}
