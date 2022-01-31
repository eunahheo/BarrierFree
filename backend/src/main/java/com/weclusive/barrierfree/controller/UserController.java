package com.weclusive.barrierfree.controller;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.dto.UserFind;
import com.weclusive.barrierfree.dto.UserJoin;
import com.weclusive.barrierfree.dto.UserJoinKakao;
import com.weclusive.barrierfree.dto.UserLoginDto;
import com.weclusive.barrierfree.entity.Token;
import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.repository.TokenRepository;
import com.weclusive.barrierfree.service.CustomUserDetailsService;
import com.weclusive.barrierfree.service.UserService;
import com.weclusive.barrierfree.util.JwtUtil;
import com.weclusive.barrierfree.util.StringUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

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
	private JwtUtil jwtUtil;
	
	@Autowired
	private TokenRepository tokenRepository;
	
	@Autowired
	private CustomUserDetailsService service;

	@PostMapping("/join")
	@ApiOperation(value = "회원가입", notes = "사용자가 입력한 회원정보를 등록한다.")
	public ResponseEntity<String> join(@RequestBody UserJoin userJoin) {
		try {
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
	public ResponseEntity<String> kakaoJoin(@RequestBody UserJoinKakao user, HttpServletRequest request) {
		// userId, userNickname, 불편사항
		String accessToken = request.getHeader("access-token"); // kakao 최초 로그인 시 받은 kakao access token
		System.out.println(accessToken);

		try {
			String userEmail = userService.getKakaoEmail(accessToken);
			userService.registKakaoUser(user, userEmail); // 회원 등록 - 아이디, 닉네임, 장애정보
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@PostMapping("/login/kakao")
	@ApiOperation(value = "Kakao 로그인", notes = "카카오 로그인 Api로 로그인한다.")
	public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestParam String code) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		System.out.println(code);
		String kakaoToken = userService.getKakaoAccessToken(code);
		User kakaoUser = null;
		try {
			String userEmail = userService.getKakaoEmail(kakaoToken);
			kakaoUser = userService.findByUserEmail(userEmail);

			if (kakaoUser == null) { // 최초 로그인이면
				resultMap.put("message", "최초 로그인");
				resultMap.put("access-token", kakaoToken);
				HttpStatus status = HttpStatus.NO_CONTENT;
				return new ResponseEntity<Map<String, Object>>(resultMap, status);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

//		System.out.println(kakaoToken);
		User user = (User) userService.findByUserId(kakaoUser.getUserId());
		Token refToken = tokenRepository.findByUserSeq(user.getUserSeq());

		UserDetails userDetails = service.loadUserByUsername(user.getUserId());
		if (refToken == null || !jwtUtil.validateToken(refToken.getTokenRefTK(), userDetails)) { // refreshToken이
																									// 유효하지 않다면
			userService.createRefreshToken(user);
		} // db에 저장하기

		resultMap.put("access-token", userService.createAccessToken(user));
		resultMap.put("message", SUCCESS);
		HttpStatus status = HttpStatus.ACCEPTED;

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
				User user = (User) userService.findByUserId(loginUser.getUserId());
				Token refToken = tokenRepository.findByUserSeq(user.getUserSeq());
				UserDetails userDetails = service.loadUserByUsername(user.getUserId());
				if (refToken == null || !jwtUtil.validateToken(refToken.getTokenRefTK(), userDetails)) { // refreshToken이
																											// 유효하지 않다면
					userService.createRefreshToken(user);
				}
				resultMap.put("access-token", userService.createAccessToken(user));
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	// 사용자 아이디 중복확인
	@GetMapping("/check/id")
	@ApiOperation(value = "아이디 중복 확인", notes = "아이디 중복 여부를 반환한다.")
	public ResponseEntity<String> checkId(@RequestParam String userId) {
		User user = (User) userService.findByUserId(userId);

		if (user == null) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else
			return new ResponseEntity<String>("아이디 중복", HttpStatus.BAD_REQUEST);
	}

	// 사용자 닉네임 중복확인
	@GetMapping("/check/nickname")
	@ApiOperation(value = "닉네임 중복 여부", notes = "닉네임 중복 여부를 반환한다.")
	public ResponseEntity<String> checkNickname(@RequestParam String userNickname) {
		User user = userService.findByUserNickname(userNickname);

		if (user == null) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else
			return new ResponseEntity<String>("닉네임 중복", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/find/id")
	@ApiOperation(value = "아이디 찾기", notes = "아이디 앞 네 자리만 보여준다.")
	public ResponseEntity<String> findId(@RequestBody String userEmail) {
		User user = userService.findByUserEmail(userEmail);

		if (user == null) {
			return new ResponseEntity<String>("이메일을 다시 확인해주세요", HttpStatus.BAD_REQUEST);
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
			return new ResponseEntity<String>("이메일 혹은 아이디를 다시 확인해주세요", HttpStatus.BAD_REQUEST);
		}
	}
}
