package com.weclusive.barrierfree.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Scrap;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.TimeUtils;

@Service
public class ScrapServiceImpl implements ScrapService {

	@Autowired
	ScrapRepository scrapRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public Map<String, Integer> insertScrap(int user_seq, char scrap_type, long scrap_data) throws Exception {
		Map<String, Integer> result = new HashMap<>();
		String regTime = TimeUtils.curTime();
		try {
			scrapRepository.save(Scrap.builder().userSeq(user_seq).scrapType(scrap_type).scrapData(scrap_data)
					.regDt(regTime).regId(returnUserId(user_seq)).modDt(regTime).modId(returnUserId(user_seq)).build());
			result.put("result", 1);
		} catch (Exception e) {
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
		} catch (Exception e) {
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
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		return result;
	}

	// 스크랩 삭제하기 (del_yn을 y로 변경)
	@Override
	public Optional<Scrap> deleteScrap(char scrapType, long scrapData, int userSeq) {
		Optional<Scrap> deleteScrap = scrapRepository.findByUserSeqAndScrapTypeAndScrapDataAndDelYn(userSeq, scrapType, scrapData, 'n');

		if (deleteScrap.isPresent()) {
			String curTime = TimeUtils.curTime();

			deleteScrap.get().setDelYn('y');
			deleteScrap.get().setModDt(curTime);
			deleteScrap.get().setModId(returnUserId(userSeq));
			scrapRepository.save(deleteScrap.get());
			return deleteScrap;
		} else
			return null;
	}

	// userSeq -> userId
	public String returnUserId(int userSeq) {
		Optional<User> list = userRepository.findById(userSeq);
		String userId = list.get().getUserId();
		return userId;
	}
}
