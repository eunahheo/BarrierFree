DROP SCHEMA IF EXISTS barrierfree;
CREATE SCHEMA IF NOT EXISTS barrierfree DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
use barrierfree;

-- 회원 테이블
CREATE TABLE `user` (
  `user_seq` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `user_nickname` varchar(8) NOT NULL,
  `user_pwd` varchar(100) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_photo` varchar(100) DEFAULT NULL,
  `user_role` varchar(1) NOT NULL DEFAULT '0',
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_dt` varchar(20) NOT NULL,
  `reg_id` varchar(20) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  `mod_id` varchar(20) NOT NULL,
  `enabled_yn` varchar(1) NOT NULL DEFAULT 'n',
  `cert_key` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `user_nickname` (`user_nickname`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- token 테이블 (일자 추가 여부 정하기)
CREATE TABLE `token` (
  `user_seq` int NOT NULL,
  `token_ref_tk` varchar(100) NOT NULL,
  PRIMARY KEY (`user_seq`),
  CONSTRAINT `token_user_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 공통 코드 테이블
CREATE TABLE `common_code` (
  `code_seq` int NOT NULL AUTO_INCREMENT,
  `code_group` varchar(20) NOT NULL COMMENT '장애 그룹',
  `code` varchar(15) NOT NULL COMMENT '장애 종류\n',
  `value` varchar(45) NOT NULL COMMENT '장애 설명',
  `code_order` int NOT NULL COMMENT '장애 순서\n',
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_dt` varchar(20) NOT NULL,
  `reg_id` varchar(20) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  `mod_id` varchar(20) NOT NULL,
  PRIMARY KEY (`code_seq`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 회원 장애 정보 테이블
CREATE TABLE `user_impairment` (
  `ui_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `code`  varchar(15) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_dt` varchar(20) NOT NULL,
  `reg_id` varchar(20) NOT NULL,
  `mod_dt` varchar(20) NOT NULL,
  `mod_id` varchar(20) NOT NULL,
  PRIMARY KEY (`ui_seq`),
  CONSTRAINT `user_impairment_user_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`),
  CONSTRAINT `user_impairment_common_code_fk` FOREIGN KEY (`code`) REFERENCES `common_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 팔로잉 테이블
CREATE TABLE `follow` (
  `follow_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `following_seq` int NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_dt` varchar(20) NOT NULL, 
  `reg_id` varchar(20) NOT NULL, 
  `mod_dt` varchar(20) NOT NULL,
  `mod_id` varchar(20) NOT NULL,
  PRIMARY KEY (`follow_seq`),
  KEY `follow_user_seq_fk_idx` (`user_seq`),
  KEY `follow_user_following_seq_fk_idx` (`following_seq`),
  CONSTRAINT `follow_user_following_seq_fk` FOREIGN KEY (`following_seq`) REFERENCES `user` (`user_seq`),
  CONSTRAINT `follow_user_user_seq_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 게시글 테이블
CREATE TABLE post (
  post_seq bigint NOT NULL AUTO_INCREMENT,
  user_seq int NOT NULL,
  post_title varchar(30) NOT NULL,
  post_content varchar(1000) NOT NULL,
  post_scrap int NOT NULL DEFAULT 0,
  post_photo varchar(100) NOT NULL,
  post_location varchar(30) NOT NULL,
  post_address varchar(60) NOT NULL,
  post_lat  varchar(30) DEFAULT NULL,
  post_lng  varchar(30) DEFAULT NULL,
  post_point int NOT NULL,
  content_id varchar(12) DEFAULT NULL,
  del_yn varchar(1) NOT NULL DEFAULT 'n',
  reg_dt varchar(20) NOT NULL, 
  reg_id varchar(20) NOT NULL, 
  mod_dt varchar(20) NOT NULL,
  mod_id varchar(20) NOT NULL,
  PRIMARY KEY (post_seq),
  KEY id_idx (user_seq),
  CONSTRAINT post_user_fk FOREIGN KEY (user_seq) REFERENCES user (user_seq)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 게시글 장애 정보 테이블
CREATE TABLE `post_impairment` (
  `pi_seq` bigint NOT NULL AUTO_INCREMENT,
  `post_seq` bigint NOT NULL,
  `code`  varchar(15) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_dt` varchar(20) NOT NULL, 
  `reg_id` varchar(20) NOT NULL, 
  `mod_dt` varchar(20) NOT NULL,
  `mod_id` varchar(20) NOT NULL,
  PRIMARY KEY (`pi_seq`),
  CONSTRAINT `post_impairment_post_fk` FOREIGN KEY (`post_seq`) REFERENCES `post` (`post_seq`),
  CONSTRAINT `post_impairment_common_code_fk` FOREIGN KEY (`code`) REFERENCES `common_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 댓글 테이블
CREATE TABLE `comment` (
  `cmt_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `post_seq` bigint NOT NULL,
  `cmt_content` varchar(200) NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_dt` varchar(20) NOT NULL, 
  `reg_id` varchar(20) NOT NULL, 
  `mod_dt` varchar(20) NOT NULL,
  `mod_id` varchar(20) NOT NULL,
  PRIMARY KEY (`cmt_seq`),
  KEY `comment_user_fk_idx` (`user_seq`),
  KEY `comment_post_fk_idx` (`post_seq`),
  CONSTRAINT `comment_post_fk` FOREIGN KEY (`post_seq`) REFERENCES `post` (`post_seq`),
  CONSTRAINT `comment_user_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 스크랩한 게시물 테이블
CREATE TABLE `scrap` (
  `scrap_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `scrap_type` varchar(1) NOT NULL,
  `scrap_data` bigint NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_dt` varchar(20) NOT NULL, 
  `reg_id` varchar(20) NOT NULL, 
  `mod_dt` varchar(20) NOT NULL,
  `mod_id` varchar(20) NOT NULL,
  PRIMARY KEY (`scrap_seq`),
  KEY `scrap_user_fk_idx` (`user_seq`),
  CONSTRAINT `scrap_user_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 알림 테이블
CREATE TABLE `alarm` (
  `alarm_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `alarm_type` varchar(1) NOT NULL,
  `alarm_data` bigint NOT NULL,
  `check_yn` varchar(1) NOT NULL DEFAULT 'n',
  `del_yn` varchar(1) NOT NULL DEFAULT 'n',
  `reg_dt` varchar(20) NOT NULL, 
  `reg_id` varchar(20) NOT NULL, 
  `mod_dt` varchar(20) DEFAULT NULL,
  `mod_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`alarm_seq`),
  KEY `alarm_user_fk_idx` (`user_seq`),
  CONSTRAINT `alarm_user_fk` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

alter table alarm auto_increment=1;
alter table comment auto_increment=1;
alter table common_code auto_increment=1;
alter table follow auto_increment=1;
alter table post auto_increment=1;
alter table post_impairment auto_increment=1;
alter table scrap auto_increment=1;
alter table user auto_increment=1;
alter table user_impairment auto_increment=1;