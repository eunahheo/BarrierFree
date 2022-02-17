package com.weclusive.barrierfree.service;

import java.util.Map;

public interface ScrapService {
	public Map<String, Integer> insertScrap(int user_seq, char scrapType, long scrap_data) throws Exception;
	public int getScraptime(char scrapType, long scrap_data) throws Exception;
	public int getScrapYn(int userSeq, char scrapType, long scrapData) throws Exception;
	public Map<String, Integer> deleteByScrapSeq(char scrapType, long scrapSeq, int userSeq);
}
