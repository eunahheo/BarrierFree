package com.weclusive.barrierfree.controller;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.entity.Token;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.TokenRepository;
import com.weclusive.barrierfree.service.UserService;
import com.weclusive.barrierfree.util.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
@Api("사용자 컨트롤러 API")
public class UserController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private UserService userService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private TokenRepository tokenRepository;

	@PostMapping("/join")
	public ResponseEntity<String> join(@RequestBody User user) {
		// userId, userNickname, userPwd, userEmail, userPhoto
		userService.registUser(user); // 회원등록
		userService.sendEmailwithUserKey(user.getUserEmail(), user.getUserId()); // 이메일 인증

		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

// 이메일 인증 링크 확인
	@PostMapping("/email/certified")
	@Transactional
	public ResponseEntity<String> checkEmail(@RequestParam String userNickname, @RequestParam String certified)
			throws MessagingException {
		User user = userService.email_cert_check(userNickname);

		if (user != null) {
			userService.email_certified_update(user);
//            SecurityContextHolder.getContext().setAuthentication(null);
//            session.removeAttribute("Authorization");
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("이메일 인증에 실패했습니다.", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody User loginUser) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		if (!userService.encodePassword(loginUser)) {
			resultMap.put("message", FAIL);
			status = HttpStatus.ACCEPTED;
		} else {
			User user = (User) userService.findByUserId(loginUser.getUserId());
			Token refToken = tokenRepository.findByUserSeq(user.getUserSeq());
			if (refToken == null || !jwtTokenProvider.isValidRefreshToken(refToken.getTokenRefTK())) { // refreshToken이
																										// 유효하지 않다면
				userService.createRefreshToken(user);
			}
			resultMap.put("access-token", userService.createAccessToken(user));
			resultMap.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "회원인증", notes = "회원 정보를 담은 Token을 반환한다.", response = Map.class)
	@GetMapping("/info/{userid}")
	public ResponseEntity<Map<String, Object>> getInfo(
			@PathVariable("userid") @ApiParam(value = "인증할 회원의 아이디.", required = true) String userid,
			HttpServletRequest request) {
//        logger.debug("userid : {} ", userid);
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		if (jwtTokenProvider.isUsable(request.getHeader("access-token"))) {
			System.out.println("사용 가능한 토큰");
//			logger.info("사용 가능한 토큰!!!");
			try {
//                로그인 사용자 정보.
				User loginUser = userService.findByUserId(userid);
				System.out.println(loginUser);
				resultMap.put("userInfo", loginUser);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				System.out.println("정보조회 실패 : {}" + e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			System.out.println("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL); // 사용 불가능 토큰
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

//	@ApiOperation(value = "토큰 재발급", notes = "토큰을 재발급한다")
//	@PostMapping(value = "/refresh")
//	@ApiImplicitParams({
//			@ApiImplicitParam(name = "X-AUTH-TOKEN", value = "access-token", required = true, dataType = "String", paramType = "header")})
//	public ResponseEntity<Map<String, Object>> refreshToken(@RequestHeader(value = "X-AUTH-TOKEN") String token) {
//		Map<String, Object> resultMap = new HashMap<>();
//		HttpStatus status = HttpStatus.ACCEPTED;
//		
//		if(!jwtTokenProvider.isValidRefreshToken(token)) {
//			
//		}
//		
//		return new ResponseEntity<Map<String, Object>>(resultMap, status);
//	}

// 사용자 아이디 중복확인
	@GetMapping("/check/id")
	public ResponseEntity<String> checkId(@RequestParam String userId) {
		User user = (User) userService.findByUserId(userId);

		if (user == null) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else
			return new ResponseEntity<String>("아이디 중복", HttpStatus.CONFLICT);
	}

// 사용자 닉네임 중복확인
	@GetMapping("/check/nickname")
	public ResponseEntity<String> checkNickname(@RequestParam String userNickname) {
		User user = userService.findByUserNickname(userNickname);

		if (user == null) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else
			return new ResponseEntity<String>("닉네임 중복", HttpStatus.CONFLICT);
	}

}
