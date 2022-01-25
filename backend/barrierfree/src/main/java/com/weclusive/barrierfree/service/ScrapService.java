package com.weclusive.barrierfree.service;

import java.util.Map;

public interface ScrapService {
	public Map<String, Integer> insertScrap(int user_seq, char scrap_type, long scrap_data);
	public int getScraptime(char scrap_type, long scrap_data);
	public int getScrapYn(int userSeq, long scrapData);
}
