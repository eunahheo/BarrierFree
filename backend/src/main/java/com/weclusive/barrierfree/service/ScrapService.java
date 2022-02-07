package com.weclusive.barrierfree.service;

import java.util.Map;

public interface ScrapService {
	public Map<String, Integer> insertScrap(int user_seq, char scrap_type, long scrap_data) throws Exception;
	public int getScraptime(char scrap_type, long scrap_data) throws Exception;
	public int getScrapYn(int userSeq, char scrap_type, long scrapData) throws Exception;
}
