package com.weclusive.barrierfree.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weclusive.barrierfree.entity.Alarm;
import com.weclusive.barrierfree.entity.Comment;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.AlarmRepository;
import com.weclusive.barrierfree.repository.CommentRepository;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.repository.UserRepository;
import com.weclusive.barrierfree.util.TimeUtils;

@Service
public class AlarmServiceImpl implements AlarmService {

	@Autowired
	AlarmRepository alarmRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PostRepository postRepository;

	@Autowired
	CommentRepository commentRepository;

	@Override
	public List<Map<String, Object>> readAlarm(int userSeq, char type) {
		List<Alarm> alarm = alarmRepository.findByAlarmTypeAndUserSeq(type, userSeq);
		System.out.println(alarm.toString());
		// 알림이 있으면
		if (alarm.size() != 0) {
			List<Map<String, Object>> result = new LinkedList<>();

			// 팔로우 알림
			if (type == '0') {
				for (int i = 0; i < alarm.size(); i++) {
					Map<String, Object> obj = new HashMap<>();

					Alarm cur = alarm.get(i);
					int followerSeq = (int) cur.getAlarmData();

					Optional<User> curUser = userRepository.findAllByUserSeq(followerSeq);

					if (curUser.isPresent()) {
						obj.put("alarm", cur);
						obj.put("userNickname", curUser.get().getUserNickname());
						obj.put("userSeq", curUser.get().getUserSeq());

						result.add(obj);
					}
				}
			}

			// 게시글 알림
			else if (type == '1') {
				for (int i = 0; i < alarm.size(); i++) {
					Map<String, Object> obj = new HashMap<>();

					Alarm cur = alarm.get(i);
					int followerSeq = (int) cur.getAlarmData();

					Optional<Post> curPost = postRepository.findByPostSeq(cur.getAlarmData());
					Optional<User> curUser = userRepository.findAllByUserSeq(followerSeq);

					if (curPost.isPresent() && curUser.isPresent()) {
						obj.put("alarm", cur);
						obj.put("userNickname", curUser.get().getUserNickname());
						obj.put("userSeq", curUser.get().getUserSeq());
						obj.put("postTitle", curPost.get().getPostTitle());
						obj.put("postSeq", curPost.get().getPostSeq());

						result.add(obj);
					}
				}
			}
			// 댓글 알림
			else if (type == '2') {
				for (int i = 0; i < alarm.size(); i++) {
					Map<String, Object> obj = new HashMap<>();

					Alarm cur = alarm.get(i);
					int followerSeq = (int) cur.getAlarmData();

					Optional<Comment> curCmt = commentRepository.findByCmtSeq(cur.getAlarmData());
					Optional<User> curUser = userRepository.findAllByUserSeq(followerSeq);

					if (curCmt.isPresent() && curUser.isPresent()) {
						obj.put("alarm", cur);
						obj.put("userNickname", curUser.get().getUserNickname());
						obj.put("userSeq", curUser.get().getUserSeq());
						obj.put("cmtSeq", curCmt.get().getCmtSeq());
						result.add(obj);
					}
				}
			}

			return result;
		}
		return null;

	}

	// 확인 및 삭제하기
	@Override
	public Optional<Alarm> updateByAlarmSeq(long alarmSeq, int type) {
		Optional<Alarm> updateAlarm = alarmRepository.findByAlarmSeq(alarmSeq);
		String curTime = TimeUtils.curTime();

		if (updateAlarm.isPresent()) {

			// 확인하기
			if (type == 0) {
				updateAlarm.get().setCheckYn('y');
				updateAlarm.get().setModDt(curTime);
//				updateAlarm.get().setModId(returnUserId(userSeq));
				save(updateAlarm.get());
				return updateAlarm;
			}

			// 삭제하기
			else {
				updateAlarm.get().setDelYn('y');
				updateAlarm.get().setModDt(curTime);
//				updateAlarm.get().setModId(returnUserId(userSeq));
				save(updateAlarm.get());
				return updateAlarm;
			}

		} else
			return null;
	}
	
	@Override
	public Alarm save(Alarm alarm) {
		alarmRepository.save(alarm);
		return alarm;
	}

	// 오래된 알림 삭제
	@Override
	public int deleteOldAlarm(int userSeq) {
		List<Alarm> deleteAlarm = alarmRepository.findOldAlarm(userSeq);
		String curTime = TimeUtils.curTime();
		int result = 0;
		
		if (deleteAlarm.size() != 0) {
			for (int i = 0; i < deleteAlarm.size(); i++) {
				deleteAlarm.get(i).setDelYn('y');
				deleteAlarm.get(i).setModDt(curTime);			
				deleteAlarm.get(i).setModId(returnUserId(userSeq));
				save(deleteAlarm.get(i));
				result++;
			}
			return result;
		}

		return result;
	}

	// 알림 저장하기
	@Override
	public int saveAlaram(int userSeq, char type, long data) {
		String curTime = TimeUtils.curTime();

		Alarm a = new Alarm();
		a.setUserSeq(userSeq);
		a.setAlarmType(type);
		a.setAlarmData(data);
		a.setRegDt(curTime);
		a.setRegId(returnUserId(userSeq));
		a.setModDt(curTime);
		a.setModId(returnUserId(userSeq));
		save(a);
	
		return 1;
	}
	
	// userSeq -> userId
	public String returnUserId(int userSeq) {
		Optional<User> list = userRepository.findById(userSeq);
		String userId = list.get().getUserId();
		return userId;
	}
}
