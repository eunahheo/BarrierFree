package com.weclusive.barrierfree.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.service.RecommendService;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/recommend")
@Api("추천화면 API (한국관광공사 무장애 여행지 API 활용)")
public class RecommendController {
	
	@Autowired
	private RecommendService recommendService;
	
	@GetMapping("/detail")
	public JSONObject detailView(String contentid) {
		JSONObject result = recommendService.loadDetailView(contentid);
		return result;
	}
	
	
}
