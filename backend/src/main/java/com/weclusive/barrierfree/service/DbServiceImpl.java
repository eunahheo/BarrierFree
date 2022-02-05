package com.weclusive.barrierfree.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Tourapi;
import com.weclusive.barrierfree.entity.TourapiImage;
import com.weclusive.barrierfree.repository.SigunguRepository;
import com.weclusive.barrierfree.repository.TourapiImageRepository;
import com.weclusive.barrierfree.repository.TourapiRepository;
import com.weclusive.barrierfree.util.TimeUtils;

@Service
public class DbServiceImpl {
	@Autowired
	private TourapiRepository tourapiRepository;
	
	@Autowired
	private SigunguRepository sigunguRepository;
	
	@Autowired
	private TourapiImageRepository tourapiImageRepository;
	
	public void searchContentId(int pageNo, String Servicekey, int numOfRows) throws Exception {
		StringBuilder sb = new StringBuilder();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/areaBasedList"
					+ "?ServiceKey=" + Servicekey;
			urlstr += "&numOfRows=" + numOfRows;
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

			JSONObject parse_response = (JSONObject) jsonObject.get("response");
			// response 로 부터 body 찾아오기
			JSONObject parse_body = (JSONObject) parse_response.get("body");
			// body 로 부터 items 받아오기
			JSONObject parse_items = (JSONObject) parse_body.get("items");
			// body 로 부터 items 받아오기
			JSONArray parse_item = (JSONArray) parse_items.get("item");
			
			for (Object o : parse_item) {
				JSONObject temp = (JSONObject) o;
				long contentid = Long.parseLong(temp.get("contentid").toString());
				String now = TimeUtils.curTime();
				loadDetail(contentid, now, Servicekey);
				loadImage(contentid, now, Servicekey);
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
	public void loadDetail(long contentid, String now, String Servicekey) throws Exception {
		StringBuilder sb = new StringBuilder();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/detailCommon"
					+ "?ServiceKey="+ Servicekey
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
			String addr1 = null;
			String addr2 = null;
			String zipcode = null;
			String mapx = null;
			String mapy = null;
			String homepage = null;
			String title = null;
			String overview = null;
			String firstimage = null;
	 
			// 컨텐츠마다 태그들의 유무가 다름.
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
			
			try {
				zipcode = tour.get("zipcode").toString();
			} catch (Exception e) {
				 System.out.println("zipcode is null");
			}
			
			try {
				mapx = tour.get("mapx").toString();
			} catch (Exception e) {
				 System.out.println("mapx is null");
			}
			try {
				mapy = tour.get("mapy").toString();
			} catch (Exception e) {
				System.out.println("mapy is null");
			}
			try {
				homepage = tour.get("homepage").toString();
			} catch (Exception e) {
				System.out.println("homepage is null");
			}
			try {
				title = tour.get("title").toString();
			} catch (Exception e) {
				System.out.println("title is null");
			}
			try {
				overview = tour.get("overview").toString();
			} catch (Exception e) {
				System.out.println("overview is null");
			}
			try {
				firstimage = tour.get("firstimage").toString();
			} catch (Exception e) {
				System.out.println("firstimage is null");
			}
			try {
				addr1 = tour.get("addr1").toString();
			} catch (Exception e) {
				System.out.println("addr1 is null");
			}
			
			String sidoCode = null;
			String sigunguName = null;
			String sigunguCode = null;
			try {
				sidoCode = tour.get("areacode").toString();
			} catch (Exception e) {
				System.out.println("areacode is null");
			}
			 
			
			if(addr1 != null && sidoCode!= null) {
				sigunguName = tour.get("addr1").toString().split(" ")[1]; //시군구 이름
				System.out.println(sidoCode +" "+ sigunguName);
				if(sigunguRepository.findBySidoCodeAndSigunguName(sidoCode, sigunguName) != null) // 시군구가 DB에 없는 경우가 있음.
				sigunguCode = sigunguRepository.findBySidoCodeAndSigunguName(sidoCode, sigunguName).getSigunguCode();
			}
			
			tourapiRepository.save(
					Tourapi.builder()
					.contentId(contentid)
					.tourapiContentTypeId(tour.get("contenttypeid").toString())
					.tourapiTitle(title)
					.sidoCode(sidoCode)//
					.sigunguCode(sigunguCode)//
					.tourapiAddr1(addr1)
					.tourapiAddr2(addr2)
					.tourapiZipcode(zipcode)
					.tourapiLat(mapy)
					.tourapiLng(mapx)
					.tourapiTel(tel)
					.tourapiImage(firstimage)
					.tourapiOverview(overview)
					.tourapiHomepage(homepage)
					.delYn('n')
					.regDt(now)
					.regId("admin")
					.modDt(now)
					.modId("admin")
				.build());
			

		} catch (Exception e) {
			System.out.println(contentid);
			e.printStackTrace();
			throw new Exception();
		}
	}
	
	public void loadImage(long contentid, String now, String Servicekey) throws Exception {
		StringBuilder sb = new StringBuilder();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/detailImage"
					+ "?ServiceKey=" + Servicekey			
					+ "&contentId=" + contentid
					+ "&numOfRows=200"
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
			JSONObject parse_items = (JSONObject) parse_body.get("items");
			JSONArray parse_item = (JSONArray) parse_items.get("item");
			
			for (int i = 0; i < parse_item.size(); i++) {
				JSONObject image = (JSONObject) parse_item.get(i); // response key값에 맞는 Value인 JSON객체를
				
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
			System.out.println(contentid);
			e.printStackTrace();
			throw new Exception();
		}
	}
}
