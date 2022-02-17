package com.weclusive.barrierfree.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.dto.Impairment;
import com.weclusive.barrierfree.dto.UserFind;
import com.weclusive.barrierfree.dto.UserJoin;
import com.weclusive.barrierfree.dto.UserJoinKakao;
import com.weclusive.barrierfree.dto.UserLoginDto;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.service.UserService;
import com.weclusive.barrierfree.util.JwtUtil;
import com.weclusive.barrierfree.util.StringUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/user")
@Api("사용자 컨트롤러 API")
public class UserController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private UserService userService;

	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping("/join")
	@ApiOperation(value = "회원가입", notes = "사용자가 입력한 회원정보를 등록한다.")
	public ResponseEntity<String> join(@RequestBody UserJoin userJoin) {
		try {
			// 이미 가입된 이메일이면
			if(userService.findByUserEmail(userJoin.userEmail) != null){
				return new ResponseEntity(FAIL, HttpStatus.OK);
			}
			userService.registUser(userJoin); // 회원등록 - 회원정보, 장애정보
			userService.sendEmailwithUserKey(userJoin.getUserEmail(), userJoin.getUserId()); // 이메일 인증
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@PostMapping("/join/kakao")
	@ApiOperation(value = "Kakao 회원가입", notes = "사용자가 입력한 회원정보를 등록한다.")
	public ResponseEntity<String> kakaoJoin(@RequestBody UserJoinKakao user, @RequestHeader @ApiParam(value = "kakao 로그인 시 받은 accessToken") String kakaoToken) {
		// userId, userNickname, 불편사항
		// kakao 최초 로그인 시 받은 kakao access token
		try {
			String userEmail = userService.getKakaoEmail(kakaoToken);
			userService.registKakaoUser(user, userEmail); // 회원 등록 - 아이디, 닉네임, 장애정보
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@GetMapping("/login/kakao")
	@ApiOperation(value = "Kakao 로그인", notes = "카카오 로그인 Api로 로그인한다.")
	public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestParam String code) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		User kakaoUser = null;
		try {
			String kakaoToken = userService.getKakaoAccessToken(code);

			String userEmail = userService.getKakaoEmail(kakaoToken);
			kakaoUser = userService.findByUserEmail(userEmail);

			if (kakaoUser == null) { // 최초 로그인이면
				resultMap.put("message", "최초 로그인");
				resultMap.put("accessToken", kakaoToken);
				HttpStatus status = HttpStatus.ACCEPTED;
				return new ResponseEntity<Map<String, Object>>(resultMap, status);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 최초 로그인이 아니면
		User user = userService.findByUserId(kakaoUser.getUserId());
		resultMap.put("accessToken", userService.createAccessToken(user));
		resultMap.put("message", SUCCESS);
		HttpStatus status = HttpStatus.OK;

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	// 이메일 인증 링크 확인
	@PostMapping("/email/certified")
	@ApiOperation(value = "이메일 인증", notes = "사용자 이메일 인증")
	@Transactional
	public ResponseEntity<String> checkEmail(@RequestParam String userNickname, @RequestParam String certified)
			throws MessagingException {
		User user = userService.email_cert_check(userNickname);

		if (user != null && user.getCertKey().equals(certified)) {
			userService.email_certified_update(user);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("이메일 인증에 실패했습니다.", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "사용자 로그인")
	public ResponseEntity<Map<String, Object>> login(@RequestBody UserLoginDto loginUser) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		try {
			if (!userService.encodePassword(loginUser)) {
				status = HttpStatus.BAD_REQUEST;
				resultMap.put("message", "사용자 비밀번호 불일치");
				return new ResponseEntity<Map<String, Object>>(resultMap, status);
			} else {
				User user = userService.findByUserId(loginUser.getUserId());
				if(user.getEnabledYn() == 'n') {
					resultMap.put("message", "이메일 인증이 안 된 사용자입니다.");
					return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.FORBIDDEN);
				}
				resultMap.put("accessToken", userService.createAccessToken(user));
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

//	@PostMapping("/logout")
//	@ApiOperation(value = "로그아웃", notes = "사용자 로그아웃")
//	public ResponseEntity<Map<String, Object>> logout(@RequestHeader("Authorization") String accessToken) {
//		Map<String, Object> resultMap = new HashMap<String, Object>();
//		HttpStatus status = null;
//		userService.logoutUser(accessToken);
//
//		return new ResponseEntity<Map<String, Object>>(resultMap, status);
//	}

	// 사용자 아이디 중복확인
	@PostMapping("/check/id")
	@ApiOperation(value = "아이디 중복 확인", notes = "아이디 중복 여부를 반환한다.")
	public ResponseEntity<String> checkId(@RequestParam String userId) {
		User user = (User) userService.findByUserId(userId);

		if (user == null) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else
			return new ResponseEntity<String>(FAIL, HttpStatus.OK);
	}

	// 사용자 닉네임 중복확인
	@GetMapping("/check/nickname")
	@ApiOperation(value = "닉네임 중복 확인", notes = "닉네임 중복 여부를 반환한다.")
	public ResponseEntity<String> checkNickname(@RequestParam String userNickname) {
		User user = userService.findByUserNickname(userNickname);

		if (user == null) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else
			return new ResponseEntity<String>(FAIL, HttpStatus.OK);
	}

	@GetMapping("/find/id")
	@ApiOperation(value = "아이디 찾기", notes = "아이디 앞 네 자리만 보여준다.")
	public ResponseEntity<String> findId(@RequestParam String userEmail) {
		User user = userService.findByUserEmail(userEmail);

		if (user == null) {
			return new ResponseEntity<String>(FAIL, HttpStatus.OK);
		} else {

			return new ResponseEntity<String>(StringUtils.idString(user.getUserId()), HttpStatus.OK);
		}
	}

	@PostMapping("/find/password")
	@ApiOperation(value = "비밀번호 찾기", notes = "임시 비밀번호를 이메일로 보내준다.")
	public ResponseEntity<String> findPassword(@RequestBody UserFind userFind) {
		User user = userService.findByUserEmail(userFind.getUserEmail());

		if (user != null && user.getUserId().equals(userFind.getUserId())) {
			// 메일 보내기
			userService.sendEmailwithTemp(userFind.getUserEmail(), userFind.getUserId());
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("이메일 혹은 아이디를 다시 확인해주세요", HttpStatus.OK);
		}
	}

	@GetMapping("/info")
	@ApiOperation(value = "사용자 정보 조회", notes = "사용자 정보를 조회한다.")
	public ResponseEntity<Map<String, Object>> getInfo(@RequestHeader("Authorization") String accessToken) {
		Map<String, Object> userinfo = new HashMap<>();
		HttpStatus status = HttpStatus.OK;

		try {
			String userId = jwtUtil.extractUserId(accessToken.substring(7)); // access-token에서 userId 추출
			userinfo = userService.userInfo(userId);
			userinfo.put("message", SUCCESS);

			return new ResponseEntity<Map<String, Object>>(userinfo, status);
		} catch (Exception e) {
			// System.out.println(e.getMessage());
			status = HttpStatus.BAD_REQUEST;
			userinfo.put("message", FAIL);
			return new ResponseEntity<Map<String, Object>>(userinfo, status);
		}
	}

	@PutMapping("/modify")
	@ApiOperation(value = "사용자 정보 수정", notes = "사용자 정보를 수정한다. 수정에 성공하면 true가, 실패하면 fail, API 오류 발생시 FAIL이 반환된다.")
	public ResponseEntity<Map<String, Object>> modifyInfo(@RequestHeader("Authorization") String accessToken,
			@ApiParam(value = "userSeq 필수, 나머지 정보들은 선택사항") @RequestBody User user) {
		Map<String, Object> result = new HashMap<>();
		try {
			result.put("result", userService.modifyUser(user));
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			result.put("result", FAIL);
			return new ResponseEntity<Map<String, Object>>(result, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/withdraw")
	@ApiOperation(value = "사용자 탈퇴", notes = "사용자 정보의 delYn 컬럼을 'y'로 변경한다. 수정에 성공하면 true가, 실패하면 fail, API 오류 발생시 FAIL이 반환된다.")
	public ResponseEntity<Map<String, Object>> withdrawUser(@RequestHeader("Authorization") String accessToken,
			@ApiParam(value = "탈퇴처리할 사용자의  userSeq") @RequestParam int userSeq) {
		Map<String, Object> result = new HashMap<>();
		try {
			result.put("result", userService.withdrawUser(userSeq));
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			result.put("result", FAIL);
			return new ResponseEntity<Map<String, Object>>(result, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping(value = "/updateImpairment")
	@ApiOperation(value = "사용자 장애 정보 수정하기", response = List.class)
	public ResponseEntity<String> updatePostImpairment(@RequestParam int userSeq, @RequestBody Impairment impairment) {
		int res;
		try {
			res = userService.updateUserImpairmentByUserSeq(userSeq, impairment);
			if (res == 1)
				return new ResponseEntity<String>(SUCCESS + " : 수정", HttpStatus.OK);
			else
				return new ResponseEntity<String>(SUCCESS + " : 수정 사항 없음", HttpStatus.OK);
				
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}
}
