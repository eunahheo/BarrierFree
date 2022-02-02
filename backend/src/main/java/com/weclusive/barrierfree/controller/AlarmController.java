package com.weclusive.barrierfree.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.dto.FollowDto;
import com.weclusive.barrierfree.entity.Alarm;
import com.weclusive.barrierfree.entity.Post;
import com.weclusive.barrierfree.repository.PostRepository;
import com.weclusive.barrierfree.service.AlarmService;
import com.weclusive.barrierfree.service.FollowService;
import com.weclusive.barrierfree.service.MyFeedService;
import com.weclusive.barrierfree.service.PostService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/alarm")
@Api("알람")
public class AlarmController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private AlarmService alarmService;
	
	// 피드 보기
	@GetMapping("/follow")
	@ApiOperation(value = "나를 팔로우한 사용자에 대한 알림", notes = "'팔로워'님이 팔로우를 시작했습니다.", response = List.class)
	public ResponseEntity<Object> follow(@RequestParam int userSeq) {
		List<Map<String, Object>> result = alarmService.readAlarm(userSeq, '0');
		if (result != null) {
			System.out.println(result.toString());
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}
	
	// 게시글 보기
	@GetMapping("/post")
	@ApiOperation(value = "내 게시글에 스크랩에 대한 알림", notes = "'스크랩한 사람'님이 '무슨 게시글'을 스크랩 했습니다.", response = List.class)
	public ResponseEntity<Object> post(@RequestParam int userSeq) {
		List<Map<String, Object>> result = alarmService.readAlarm(userSeq, '1');
		if (result != null) {
			
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	// 댓글 보기
	@GetMapping("/comment")
	@ApiOperation(value = "내 게시글에 달린 댓글에 대한 알림", notes = "'댓글 남긴 사람'님이 '무슨 게시글'에 댓글을 남겼습니다.", response = List.class)
	public ResponseEntity<Object> comment(@RequestParam int userSeq) {
		List<Map<String, Object>> result = alarmService.readAlarm(userSeq, '2');
		if (result != null) {
			
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	// 알림 확인하기
	@PutMapping(value = "/check")
	@ApiOperation(value = "알림 확인하기", response = List.class)
	public ResponseEntity<Object> checkAlarm(@RequestParam long alarmSeq) throws Exception {
		Optional<Alarm> result = alarmService.updateByAlarmSeq(alarmSeq, 0);

		if(result == null)
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}

	// 알림 삭제하기
	@PutMapping(value = "/delete")
	@ApiOperation(value = "알림 삭제하기", response = List.class)
	public ResponseEntity<Object> deleteAlarm(@RequestParam long alarmSeq) throws Exception {
		Optional<Alarm> result = alarmService.updateByAlarmSeq(alarmSeq, 1);
		
		if(result == null)
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}

	// 일정 기간 지난 알림 삭제하기
	@PutMapping(value = "/deleteOld")
	@ApiOperation(value = "특정 기간 지난 알림 삭제하기 - 지금은 하루", response = List.class)
	public ResponseEntity<Object> deleteOldAlarm(@RequestParam int userSeq) throws Exception {
		int result = alarmService.deleteOldAlarm(userSeq);
		
		if(result == 0)
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}
}
