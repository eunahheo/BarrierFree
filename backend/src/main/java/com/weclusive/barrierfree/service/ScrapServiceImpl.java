package com.weclusive.barrierfree.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Scrap;
import com.weclusive.barrierfree.repository.ScrapRepository;

@Service
public class ScrapServiceImpl implements ScrapService {

	@Autowired
	ScrapRepository scrapRepository;
	
	@Override
	public Map<String, Integer> insertScrap(int user_seq, char scrap_type, long scrap_data) throws Exception{
		Map<String, Integer> result = new HashMap<>();
		String regTime = LocalDateTime.now().toString().replace("T", " ").substring(0,19);
		try {
		scrapRepository.save(Scrap.builder()
				.userSeq(user_seq)
				.scrapType(scrap_type)
				.scrapData(scrap_data)
				.regDt(regTime)
				.regId("임시")
				.modDt(regTime)
				.modId("임시").build());
		result.put("result",1);
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		
		return result;
	}

	@Override
	public int getScraptime(char scrap_type, long scrap_data) throws Exception {
		int result = 0;
		try {
			result = scrapRepository.countByDelYnAndScrapTypeAndScrapData('n', scrap_type, scrap_data);
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}
	
	@Override
	public int getScrapYn(int userSeq, char scrapType, long scrapData) throws Exception {
		int result = 0;
		try {
			result = scrapRepository.countByDelYnAndScrapTypeAndUserSeqAndScrapData('n', scrapType, userSeq, scrapData);
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

}
