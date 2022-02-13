package com.weclusive.barrierfree.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.Scrap;
import com.weclusive.barrierfree.entity.Tourapi;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.ScrapRepository;
import com.weclusive.barrierfree.repository.TourapiRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.TimeUtils;

@Service
public class ScrapServiceImpl implements ScrapService {

	@Autowired
	ScrapRepository scrapRepository;
	
	@Autowired
	PostRepository postRepository;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TourapiRepository tRepository;

	//스크랩하기
	@Override
	public Map<String, Integer> insertScrap(int user_seq, char scrap_type, long scrap_data) throws Exception {
		Map<String, Integer> result = new HashMap<>();
		String regTime = TimeUtils.curTime();
		Scrap check = scrapRepository.findByUserSeqAndScrapDataAndScrapTypeAndDelYn(user_seq,scrap_data, scrap_type, 'n');
		System.out.println(check);
		if(check==null) {
			try {
				scrapRepository.save(Scrap.builder().userSeq(user_seq).scrapType(scrap_type).scrapData(scrap_data)
						.regDt(regTime).regId(returnUserId(user_seq)).modDt(regTime).modId(returnUserId(user_seq)).build());
				result.put("result", 1);
				if(scrap_type=='0') {
					Post post = postRepository.findByPostSeqP(scrap_data);
					post.setPostScrap(post.getPostScrap()+1);
					postRepository.save(post);
				}
				else {
					Tourapi tourapi = tRepository.findByDelYnAndContentId('n', scrap_data);
					tourapi.setTourapiScrap(tourapi.getTourapiScrap()+1);
					tRepository.save(tourapi);
				}
			} catch (Exception e) {
				e.printStackTrace();
				throw new Exception();
			}
		}
		else {
			result.put("result", 0);
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

	// 스크랩 취소하기 (del_yn을 y로 변경)
	@Override
	public Map<String, Integer> deleteByScrapSeq(char scrap_type, long scrap_data, int user_seq) {
		Map<String, Integer> result = new HashMap<>();
		Scrap deleteScrap = scrapRepository.findByUserSeqAndScrapDataAndScrapTypeAndDelYn(user_seq, scrap_data, scrap_type, 'n');

		if (deleteScrap != null) {
			String curTime = TimeUtils.curTime();
			deleteScrap.setDelYn('y');
			deleteScrap.setModDt(curTime);
			deleteScrap.setModId(returnUserId(user_seq));
			scrapRepository.save(deleteScrap);
			if(scrap_type=='0') {
				Post post = postRepository.findByPostSeqP(scrap_data);
				post.setPostScrap(post.getPostScrap()-1);
				postRepository.save(post);
			}
			else {
				Tourapi tourapi = tRepository.findByDelYnAndContentId('n', scrap_data);
				tourapi.setTourapiScrap(tourapi.getTourapiScrap()-1);
				tRepository.save(tourapi);
			}
			result.put("result",1);
			return result;
		} else {
			result.put("result",0);
			return result;
		}
	}

	// userSeq -> userId
	public String returnUserId(int userSeq) {
		Optional<User> list = userRepository.findById(userSeq);
		String userId = list.get().getUserId();
		return userId;
	}
}
