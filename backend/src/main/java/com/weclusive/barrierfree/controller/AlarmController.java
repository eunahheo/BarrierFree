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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.entity.Alarm;
import com.weclusive.barrierfree.service.AlarmService;

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
	
	// 알림 조회
	@GetMapping("/all")
	@ApiOperation(value = "사용자 알림", notes = "전체 알림을 최신순으로 조회", response = List.class)
	public ResponseEntity<Object> follow(@RequestParam int userSeq) {
		List<Map<String, Object>> result = alarmService.readAlarm(userSeq);
		if (result != null) {
			System.out.println(result.toString());
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(FAIL, HttpStatus.OK);
		}
	}
	

	// 알림 확인하기
	@PutMapping(value = "/check")
	@ApiOperation(value = "알림 확인하기", response = List.class)
	public ResponseEntity<Object> checkAlarm(@RequestParam long alarmSeq, @RequestParam int userSeq) throws Exception {
		Optional<Alarm> result = alarmService.updateByAlarmSeq(alarmSeq, 0, userSeq);

		if(result == null)
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}

	// 알림 삭제하기
	@PutMapping(value = "/delete")
	@ApiOperation(value = "알림 삭제하기", response = List.class)
	public ResponseEntity<Object> deleteAlarm(@RequestParam long alarmSeq, @RequestParam int userSeq) throws Exception {
		Optional<Alarm> result = alarmService.updateByAlarmSeq(alarmSeq, 1, userSeq);
		
		if(result == null)
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}

	// 일정 기간 지난 알림 삭제하기
	@PutMapping(value = "/deleteOld")
	@ApiOperation(value = "특정 기간(14일) 지난 알림 삭제하기", response = List.class)
	public ResponseEntity<Object> deleteOldAlarm() throws Exception {
		int result = alarmService.deleteOldAlarm();
		
		if(result == 0)
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}
	
	// 팔로우 알림 저장하기
	@PostMapping(value = "/saveFollow")
	@ApiOperation(value = "팔로우 알림 저장하기", response = List.class)
	public ResponseEntity<Object> saveFollowAlarm(@RequestParam int userSeq, @RequestParam int followingSeq) throws Exception {
		long fSeq = followingSeq;
		int result = alarmService.saveAlaram(userSeq, '0', fSeq);
		
		if(result != 1)
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}
	
	// 게시글 스크랩 알림 저장하기
	@PostMapping(value = "/saveScrap")
	@ApiOperation(value = "스크랩 알림 저장하기", response = List.class)
	public ResponseEntity<Object> saveScrapAlarm(@RequestParam int userSeq, @RequestParam long scrapSeq) throws Exception {
		int result = alarmService.saveAlaram(userSeq, '1', scrapSeq);
		
		if(result != 1)
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}
	
	// 댓글 알림 저장하기
	@PostMapping(value = "/saveComment")
	@ApiOperation(value = "댓글 알림 저장하기", response = List.class)
	public ResponseEntity<Object> saveCommentAlarm(@RequestParam int userSeq, @RequestParam long cmtSeq) throws Exception {
		int result = alarmService.saveAlaram(userSeq, '0', cmtSeq);
		
		if(result != 1)
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}
}
