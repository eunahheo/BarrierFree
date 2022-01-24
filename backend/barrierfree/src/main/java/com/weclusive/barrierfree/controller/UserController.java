package com.weclusive.barrierfree.controller;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.service.UserService;

import io.swagger.annotations.Api;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
@Api("사용자 컨트롤러 API")
public class UserController {

private static final String SUCCESS = "success";
private static final String FAIL = "fail";

@Autowired
private UserService userService;

@PostMapping("/join")
//    @ApiOperation(value = "회원가입", notes = "User 회원가입")
//    @ApiResponses({
//        @ApiResponse(code = 201, message = "회원가입에 성공했습니다."),
//        @ApiResponse(code = 409, message = "회원가입에 실패했습니다."),
//    })
    public ResponseEntity<String> join(@RequestBody User user) {
        // userId, userNickname, userPwd, userEmail, userPhoto
        userService.registUser(user); // 회원등록

    userService.sendEmailwithUserKey(user.getUserEmail(), user.getUserId()); // 이메일 인증

    return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
}

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

// 이메일 인증 링크 확인
@PutMapping("/email/certified")
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

}

