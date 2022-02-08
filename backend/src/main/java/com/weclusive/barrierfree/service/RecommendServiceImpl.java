package com.weclusive.barrierfree.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Sido;
import com.weclusive.barrierfree.entity.Sigungu;
import com.weclusive.barrierfree.entity.Tourapi;
import com.weclusive.barrierfree.entity.TourapiImpairment;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.SidoRepository;
import com.weclusive.barrierfree.repository.SigunguRepository;
import com.weclusive.barrierfree.repository.TourapiImageRepository;
import com.weclusive.barrierfree.repository.TourapiImpairmentRepository;
import com.weclusive.barrierfree.repository.TourapiRepository;
import com.weclusive.barrierfree.util.ImpairmentUtils;

@Service
public class RecommendServiceImpl implements RecommendService {

	@Autowired
	private ScrapRepository scrapRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private TourapiRepository tRepository;

	@Autowired
	private TourapiImpairmentRepository tiRepository;

	@Autowired
	private TourapiImageRepository timRepository;

	@Autowired
	private SidoRepository sidoRepository;

	@Autowired
	private SigunguRepository sigunguRepository;

	// 상세보기 페이지에 필요한 정보들 반환
	@Override
	public Map<String, Object> loadDetailView(int userSeq, long contentId) throws Exception {
		Map<String, Object> result = new HashMap<>();
		try {
			Tourapi info = tRepository.findByDelYnAndContentId('n', contentId);
			result.put("title", info.getTourapiTitle());
			result.put("firstimage", info.getTourapiImage());
			result.put("images", timRepository.findByDelYnAndContentId('n', contentId));
			result.put("overview", info.getTourapiOverview());
			result.put("impairments", tiRepository.findByDelYnAndContentId('n', contentId));
			result.put("lat", info.getTourapiLat());
			result.put("lng", info.getTourapiLng());
			result.put("regDt", info.getRegDt());
			result.put("modDt", info.getModDt());
			result.put("addr1", info.getTourapiAddr1());
			result.put("addr2", info.getTourapiAddr2());
			result.put("homepage", info.getTourapiHomepage());
			result.put("zipcode", info.getTourapiZipcode());
			result.put("scraptimes", scrapRepository.countByDelYnAndScrapTypeAndScrapData('n', '1', contentId));
			char scrap_yn = 'n';
			if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '1', userSeq, contentId) > 0)
				scrap_yn = 'y';
			result.put("scrap_yn", scrap_yn);
			result.put("posts",
					postRepository.findTop20ByDelYnAndContentIdOrderByPostScrapDesc('n', Long.toString(contentId)));
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

	// 해당 컨텐츠id에 대한 무장애 정보 반환
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> loadImpairment(long contentId) throws Exception {
		Map<String, Object> result = new JSONObject();
		try {
			List<TourapiImpairment> list = tiRepository.findByDelYnAndContentId('n', contentId);

			for (TourapiImpairment ti : list) {
				result.put(ti.getCode(), ti.getTiOverview());
			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

	// 지역 시도 리스트 반환
	@Override
	public List<Map<String, Object>> getSido() throws Exception {
		List<Map<String, Object>> result = new ArrayList<>();
		try {
			List<Sido> list = sidoRepository.findAllByDelYn('n');

			for (Sido sido : list) {
				Map<String, Object> obj = new HashMap<>();
				obj.put("name", sido.getSidoName());
				obj.put("code", sido.getSidoCode());
				result.add(obj);
			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

	// 지역 시군구 리스트 반환
	@Override
	public List<Map<String, Object>> getSigungu(String sidoCode) throws Exception {
		List<Map<String, Object>> result = new ArrayList<>();
		try {
			List<Sigungu> list = sigunguRepository.findByDelYnAndSidoCode('n',sidoCode);

			for (Sigungu sigungu : list) {
				Map<String, Object> obj = new HashMap<>();
				obj.put("name", sigungu.getSigunguName());
				obj.put("code", sigungu.getSigunguCode());
				result.add(obj);
			}
			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

	@Override
	public List<Map<String, Object>> search(int userSeq, String sidoCode, String sigunguCode, String contentTypeId,
			List<String> impairments, int page, int size) throws Exception {
		List<Map<String, Object>> result = new LinkedList<>();
		PageRequest pageRequest = PageRequest.of(page, size);
		Page<Tourapi> pageTours = null;
		try {
			if(sidoCode==null) {
				if(contentTypeId.equals("0")) {
					if(impairments==null) {
						//전체검색
						System.out.println("전체검색");
						pageTours = tRepository.findByDelYn('n',pageRequest);
					}
					else {
						//무장애정보만 입력한 검색결과
						System.out.println("무장애정보만 입력한 검색결과");
						pageTours = tRepository.findByImpariments('n', impairments, pageRequest);
					}
				}
				else {
					if(impairments==null) {
						//컨텐츠타입id만 입력한 검색결과
						System.out.println("컨텐츠타입id만 입력한 검색결과");
						pageTours = tRepository.findByDelYnAndTourapiContenttypeid('n', contentTypeId, pageRequest);
					}
					else {
						//컨텐츠타입id와 무장애정보를 입력한 검색결과
						System.out.println("컨텐츠타입id와 무장애정보를 입력한 검색결과");
						pageTours = tRepository.findByTourapiContenttypeidAndImpariments('n', contentTypeId, impairments, pageRequest);
					}
				}
			}
			else {
				if(sigunguCode==null) {
					if(contentTypeId.equals("0")) {
						if(impairments == null) {
							//시도만 입력한 검색결과
							System.out.println("시도만 입력한 검색결과");
							pageTours =  tRepository.findByDelYnAndSidoCode('n', sidoCode, pageRequest);
						}
						else {
							//시도와 무장애정보를 입력한 검색결과
							System.out.println("시도와 무장애정보를 입력한 검색결과");
							pageTours = tRepository.findBySidoCodeAndImpariments('n', sidoCode, impairments, pageRequest);
						}
					}
					else {
						if(impairments == null) {
							//시도와 컨텐츠타입id를 입력한 검색결과
							System.out.println("시도와 컨텐츠타입id를 입력한 검색결과");
							pageTours = tRepository.findByDelYnAndSidoCodeAndTourapiContenttypeid('n', sidoCode, contentTypeId, pageRequest);
						}
						else {
							//시도,컨텐츠타입id,무장애정보를 입력한 검색결과
							System.out.println("시도,컨텐츠타입id,무장애정보를 입력한 검색결과");
							pageTours = tRepository.findBySidoCodeAndTourapiContenttypeidAndImpariments('n', sidoCode, contentTypeId, impairments, pageRequest);
						}
					}
				}
				else {
					if(contentTypeId.equals("0")) {
						if(impairments == null) {
							//시도와 시군구를 입력한 검색결과
							System.out.println("시도와 시군구를 입력한 검색결과");
							pageTours = tRepository.findByDelYnAndSidoCodeAndSigunguCode('n', sidoCode, sigunguCode, pageRequest);
						}
						else {
							//시도,시군구,무장애정보를 입력한 검색결과
							System.out.println("시도,시군구,무장애정보를 입력한 검색결과");
							pageTours = tRepository.findBySidoCodeAndSigunguCodeAndImpairments('n', sidoCode, sigunguCode, impairments, pageRequest);
						}
					}
					else {
						if(impairments == null) {
							//시도,시군구,컨텐츠타입id를 입력한 검색결과
							System.out.println("시도,시군구,컨텐츠타입id를 입력한 검색결과");
							pageTours =  tRepository.findByDelYnAndSidoCodeAndSigunguCodeAndTourapiContenttypeid('n', sidoCode, sigunguCode, contentTypeId, pageRequest);
						}
						else {
							//시도,시군구,컨텐츠타입id,무장애정보를 입력한 검색결과
							System.out.println("시도,시군구,컨텐츠타입id,무장애정보를 입력한 검색결과");
							pageTours = tRepository.findBySidoCodeAndSigunguCodeAndTourapiContenttypeidAndImpariments('n', sidoCode, sigunguCode, contentTypeId, impairments, pageRequest);
						}
					}
				}
			}
			
			System.out.println(pageTours);
			for(Tourapi t : pageTours) {
				Map<String, Object> obj = new HashMap<>();
				obj.put("title", t.getTourapiTitle());
				obj.put("addr1", t.getTourapiAddr1());
				obj.put("contentid", t.getContentId());
				obj.put("firstimage", t.getTourapiImage());
				char scrap_yn = 'n';
				// 현재 사용자의 seq를 가져오는 api 필요
				if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '1', userSeq, t.getContentId()) > 0)
					scrap_yn = 'y';
				obj.put("scrap_yn", scrap_yn);
				result.add(obj);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

	@Override
	public List<Map<String, Object>> getNearMyLocation(int userSeq, String lat, String lng, String radius,
			String contentTypeId, int page, int size) throws Exception {
		StringBuilder sb = new StringBuilder();
		List<Map<String, Object>> result = new LinkedList<>();
		try {
			String urlstr = "http://api.visitkorea.or.kr/openapi/service/rest/KorWithService/locationBasedList"
					+ "?ServiceKey=90E0OY5f9CUd%2BGSJfMuFpPnny5XZ9Ks6RYqd0gV0LqOFeSC9A4B6VVnxmxDSUdtWx7auKWg2ALhbInFELnK8yQ%3D%3D"
					+ "&numOfRows=" + size + "&pageNo=" + page + "&mapX=" + lng + "&mapY=" + lat + "&radius=" + radius;

			if (!contentTypeId.equals("0"))
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

			for (Object o : parse_item) {
				Map<String, Object> obj = new HashMap<>();
				JSONObject temp = (JSONObject) o;
				obj.put("contentid", temp.get("contentid"));
				obj.put("title", temp.get("title"));
				obj.put("firstimage", temp.get("firstimage"));
				obj.put("addr1", temp.get("addr1"));

				char scrap_yn = 'n';
//				 현재 사용자의 seq를 가져오는 api 필요
				if (scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', '1', userSeq,
						(long) temp.get("contentid")) > 0)
					scrap_yn = 'y';
				obj.put("scrap_yn", scrap_yn);

				result.add(obj);
			}

			System.out.println(result);
		} catch (ClassCastException e) {
			e.printStackTrace();
			throw new ClassCastException();
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

}
