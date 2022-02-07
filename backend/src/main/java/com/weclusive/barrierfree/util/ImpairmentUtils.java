package com.weclusive.barrierfree.util;

import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class ImpairmentUtils {

	/*
	 * RecommendServiceImple의 loadImpairment() 메서드의 실행결과 JSONObject를 받아서 JSONObject에
	 * 있는 태그명에 따라 어떤 장애에 속하는지를 반환해주는 메서드 ex) parking 태그가 JSONObject에 포함되어 있을경우
	 * physical 항목에 포함되었음을 알려줌
	 * 
	 * boolean[] impairments impairments[0] = physical impairments[1] = visibility
	 * impairments[2] = deaf impairments[3] = infant impairments[4] = senior
	 * 
	 */
	
	@SuppressWarnings("unchecked")
	public ArrayList<String> getImpairment(JSONObject jobj) {
		ArrayList<String> result = new ArrayList<>();
		boolean[] impairments = new boolean[5];
		
		ArrayList<String> physical_info = new ArrayList<>();
		ArrayList<String> visibility_info = new ArrayList<>();
		ArrayList<String> deaf_info = new ArrayList<>();
		ArrayList<String> infant_info = new ArrayList<>();
		ArrayList<String> senior_info = new ArrayList<>();
		
		physical_info.add("parking"); physical_info.add("route"); physical_info.add("publictransport"); physical_info.add("ticketoffice"); 
		physical_info.add("promotion"); physical_info.add("wheelchair"); physical_info.add("exit"); physical_info.add("elevator");
		physical_info.add("restroom"); physical_info.add("audiotorium"); physical_info.add("room"); physical_info.add("handicapetc");
		
		visibility_info.add("braileblock"); visibility_info.add("helpdog"); visibility_info.add("guidehuman"); visibility_info.add("audioguide");
		visibility_info.add("bigprint"); visibility_info.add("brailepromotion"); visibility_info.add("guidesystem"); visibility_info.add("blindhandcapetc");
		
		deaf_info.add("signguide"); deaf_info.add("videoguide"); deaf_info.add("hearingroom"); deaf_info.add("hearinghandicapetc");
		
		infant_info.add("stroller"); infant_info.add("lactationroom"); infant_info.add("babyspacechair"); infant_info.add("infantsfamilyetc");
		
		senior_info.add("elevator"); senior_info.add("restroom"); senior_info.add("guidehuman"); senior_info.add("audioguide"); senior_info.add("videoguide"); senior_info.add("bigprint"); senior_info.add("guidesystem");
		jobj.keySet().forEach((cur) -> {
			if(!impairments[0] && physical_info.contains(cur)) {
				impairments[0] = true;
				result.add("physical");
			}
			if(!impairments[1] && visibility_info.contains(cur)) {
				impairments[1] = true;
				result.add("visibility");
			}
			if(!impairments[2] && deaf_info.contains(cur)) {
				impairments[2] = true;
				result.add("deaf");
			}
			if(!impairments[3] && infant_info.contains(cur)) {
				impairments[3] = true;
				result.add("infant");
			}
			if(!impairments[4] && senior_info.contains(cur)) {
				impairments[4] = true;
				result.add("senior");
			}
			});
		
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public JSONObject getImpairmentDetail(JSONObject jobj) {
		JSONObject result = new JSONObject();
		
		ArrayList<String> physical_info = new ArrayList<>();
		ArrayList<String> visibility_info = new ArrayList<>();
		ArrayList<String> deaf_info = new ArrayList<>();
		ArrayList<String> infant_info = new ArrayList<>();
		ArrayList<String> senior_info = new ArrayList<>();
		
		physical_info.add("parking"); physical_info.add("route"); physical_info.add("publictransport"); physical_info.add("ticketoffice"); 
		physical_info.add("promotion"); physical_info.add("wheelchair"); physical_info.add("exit"); physical_info.add("elevator");
		physical_info.add("restroom"); physical_info.add("audiotorium"); physical_info.add("room"); physical_info.add("handicapetc");
		
		visibility_info.add("braileblock"); visibility_info.add("helpdog"); visibility_info.add("guidehuman"); visibility_info.add("audioguide");
		visibility_info.add("bigprint"); visibility_info.add("brailepromotion"); visibility_info.add("guidesystem"); visibility_info.add("blindhandcapetc");
		
		deaf_info.add("signguide"); deaf_info.add("videoguide"); deaf_info.add("hearingroom"); deaf_info.add("hearinghandicapetc");
		
		infant_info.add("stroller"); infant_info.add("lactationroom"); infant_info.add("babysparechair"); infant_info.add("infantsfamilyetc");
		
		senior_info.add("elevator"); senior_info.add("restroom"); senior_info.add("guidehuman"); senior_info.add("audioguide"); senior_info.add("videoguide"); senior_info.add("bigprint"); senior_info.add("guidesystem");
		
		ArrayList<String> physical = new ArrayList<>();
		ArrayList<String> visibility = new ArrayList<>();
		ArrayList<String> deaf = new ArrayList<>();
		ArrayList<String> infant = new ArrayList<>();
		ArrayList<String> senior = new ArrayList<>();
		
		jobj.keySet().forEach((cur) -> {
			if(physical_info.contains(cur)) physical.add((String) jobj.get(cur));
			if(visibility_info.contains(cur)) visibility.add((String) jobj.get(cur));
			if(deaf_info.contains(cur)) deaf.add((String) jobj.get(cur));
			if(infant_info.contains(cur)) infant.add((String) jobj.get(cur));
			if(senior_info.contains(cur)) senior.add((String) jobj.get(cur));
		});
		result.put("physical", physical);
		result.put("visibility", visibility);
		result.put("deaf", deaf);
		result.put("infant", infant);
		result.put("senior", senior);
		
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public JSONArray getImpairmentInt(JSONObject jobj) {
		JSONObject result = new JSONObject();
		
		ArrayList<String> physical_info = new ArrayList<>();
		ArrayList<String> visibility_info = new ArrayList<>();
		ArrayList<String> deaf_info = new ArrayList<>();
		ArrayList<String> infant_info = new ArrayList<>();
		ArrayList<String> senior_info = new ArrayList<>();
		
		physical_info.add("parking"); physical_info.add("route"); physical_info.add("publictransport"); physical_info.add("ticketoffice"); 
		physical_info.add("promotion"); physical_info.add("wheelchair"); physical_info.add("exit"); physical_info.add("elevator");
		physical_info.add("restroom"); physical_info.add("audiotorium"); physical_info.add("room"); physical_info.add("handicapetc");
		
		visibility_info.add("braileblock"); visibility_info.add("helpdog"); visibility_info.add("guidehuman"); visibility_info.add("audioguide");
		visibility_info.add("bigprint"); visibility_info.add("brailepromotion"); visibility_info.add("guidesystem"); visibility_info.add("blindhandcapetc");
		
		deaf_info.add("signguide"); deaf_info.add("videoguide"); deaf_info.add("hearingroom"); deaf_info.add("hearinghandicapetc");
		
		infant_info.add("stroller"); infant_info.add("lactationroom"); infant_info.add("babyspacechair"); infant_info.add("infantsfamilyetc");
		
		senior_info.add("elevator"); senior_info.add("restroom"); senior_info.add("guidehuman"); senior_info.add("audioguide"); senior_info.add("videoguide"); senior_info.add("bigprint"); senior_info.add("guidesystem");
		
		ArrayList<String> physical = new ArrayList<>();
		ArrayList<String> visibility = new ArrayList<>();
		ArrayList<String> deaf = new ArrayList<>();
		ArrayList<String> infant = new ArrayList<>();
		ArrayList<String> senior = new ArrayList<>();
		
		jobj.keySet().forEach((cur) -> {
			if(physical_info.contains(cur)) physical.add((String) jobj.get(cur));
			if(visibility_info.contains(cur)) visibility.add((String) jobj.get(cur));
			if(deaf_info.contains(cur)) deaf.add((String) jobj.get(cur));
			if(infant_info.contains(cur)) infant.add((String) jobj.get(cur));
			if(senior_info.contains(cur)) senior.add((String) jobj.get(cur));
		});
		result.put("physical", physical);
		result.put("visibility", visibility);
		result.put("deaf", deaf);
		result.put("infant", infant);
		result.put("senior", senior);
		
		JSONArray array = new JSONArray();
		if(!physical.isEmpty()) array.add("physical");
		if(!visibility.isEmpty()) array.add("visibility");
		if(!deaf.isEmpty()) array.add("deaf");
		if(!infant.isEmpty()) array.add("infant");
		if(!senior.isEmpty()) array.add("senior");
		
		return array;
	}
}
