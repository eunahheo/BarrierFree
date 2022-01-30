-- user
insert into user (user_id, user_nickname, user_pwd, user_email, reg_dt, reg_id, mod_dt, mod_id,enabled_yn)
values('yminsang96','유민상닉네임','1q2w3e4r','yminsang96@gmail.com',now(),'yminsang96',now(),'yminsang96','y');
insert into user (user_id, user_nickname, user_pwd, user_email, user_photo,reg_dt, reg_id, mod_dt, mod_id,enabled_yn)
values('sdi1358','heoeunah','1234abc','sdi1358_@naver.com','heoeunah.jpg',now(),'sdi1358',now(),'sdi1358','y');
insert into user values(0, "blue8959", "hwang", "123qwe", "blue8959@naver.com", "hwang.png", "1", "n", now(), "blue8959", now(), "blue8959",'y',null);
insert into user values(0, "admin", "admin", "123qwe", "admin@naver.com", "admin.png", "1", "n", now(), "admin", now(), "admin",'y',null);

-- common_code
insert into common_code (code_group, code, value, code_order, reg_dt, reg_id, mod_dt, mod_id)
values ('impairment', 'physical', '지체장애', 1, now(), 'admin', now(), 'admin');
insert into common_code (code_group, code, value, code_order, reg_dt, reg_id, mod_dt, mod_id)
values ('impairment', 'visibility', '시각장애', 2, now(), 'admin', now(), 'admin');
insert into common_code (code_group, code, value, code_order, reg_dt, reg_id, mod_dt, mod_id)
values ('impairment', 'deaf', '청각장애', 3, now(), 'admin', now(), 'admin');
insert into common_code (code_group, code, value, code_order, reg_dt, reg_id, mod_dt, mod_id)
values ('impairment', 'infant', '영유아가족', 4, now(), 'admin', now(), 'admin');
insert into common_code (code_group, code, value, code_order, reg_dt, reg_id, mod_dt, mod_id)
values ('impairment', 'senior', '고령자', 5, now(), 'admin', now(), 'admin');

-- user_impairment
insert into user_impairment (user_seq, code, reg_dt, reg_id, mod_dt, mod_id)
values(1, 'physical', now(), 'yminsang96', now(), 'yminsang96');
insert into user_impairment (user_seq, code, reg_dt, reg_id, mod_dt, mod_id)
values(2, 'deaf', now(), 'sdi1358', now(), 'sdi1358');

-- follow
insert into follow(user_seq, following_seq, reg_dt, reg_id, mod_dt, mod_id)
values(1,2,now(),'yminsang96',now(),'yminsang96');
insert into follow(user_seq, following_seq, reg_dt, reg_id, mod_dt, mod_id)
values(2,1,now(),'sdi1358',now(),'sdi1358');

-- post
insert into post(user_seq, post_title, post_content, post_photo, post_location, post_address, post_lat, post_lng, post_point, content_id, reg_dt, reg_id, mod_dt, mod_id)
values (1,'수원오세요','내용','사진.jpg','수원 화성','주소','31.11111','245.42423','4','1234567',now(),'yminsang96',now(),'yminsang96');
insert into post values(0, 3, "첫번째 게시글", "첫번째 게시글 내용입니다.", 0, "photo.jpg", "location", "address", "11.1111", "22.2222", 5, "1111111", "n", now(), "blue8959", now(), "blue8959");
insert into post values(0, 3, "두번째 게시글", "두번째 게시글 내용입니다.", 0, "photo1.jpg", "location", "address", "33.333", "44.444", 5, "2222222", "n", now(), "blue8959", now(), "blue8959");
insert into post values (0,2,'여행 다녀왔습니다.','서울 여행 여행~',0,'post.jpg','멀티캠퍼스','서울 역삼동',34.8234234,128.352345,5,'245345','n',now(),'sdi1358',now(),'sdi1358');

-- post_impairment
insert into post_impairment(post_seq, code, reg_dt, reg_id, mod_dt, mod_id)
values (1,'visibility',now(),'yminsang96',now(),'yminsang96'),
(2,'deaf',now(),'blue8959',now(),'blue8959'),
(3,'infant',now(),'blue8959',now(),'blue8959'),
(4,'senior',now(),'sdi1358',now(),'sdi1358');

-- comment
insert into comment (user_seq, post_seq, cmt_content,reg_dt, reg_id, mod_dt, mod_id)
values (1,2,'우와',now(),'yminsang96',now(),'yminsang96');
insert into comment values(0, 3, 4, "서울 가고 싶네요",  "n", now(), "blue8959", now(), "blue8959");
insert into comment values(0, 3, 1, "오호 멋지네여",  "n", now(), "blue8959", now(), "blue8959");
insert into comment values(0,2,1,'댓글댓글','n',now(),'sdi1358',now(),'sdi1358');

-- scrap
-- 0 : 사용자 게시물, 1 : API 상세글
insert into scrap(user_seq, scrap_type, scrap_data, reg_dt, reg_id, mod_dt, mod_id)
values (1,0,2,now(),'yminsang96',now(),'yminsang96');
update post set post_scrap = 1 where post_seq = 2;
insert into scrap(user_seq, scrap_type, scrap_data,reg_dt, reg_id, mod_dt, mod_id)
values (1,1,1234567,now(),'yminsang96',now(),'yminsang96');
insert into scrap values(0, 3, 0, "4",  "n", now(), "blue8959", now(), "blue8959");
update post set post_scrap = 1 where post_seq = 4;
insert into scrap values (0,2,0,"1","n",now(),'sdi1358',now(),'sdi1358');
update post set post_scrap = 1 where post_seq = 1;

-- alarm
-- 0 : 팔로우알림, 1 : 게시물알림, 2 : 댓글알림
insert into alarm(user_seq, alarm_type, alarm_data, reg_dt, reg_id, mod_dt, mod_id)
values(1,0,2,now(),'yminsang96',now(),'yminsang96'), (1,1,1,now(),'yminsang96',now(),'yminsang96');
insert into alarm values (0,2,0,1,'n','n',now(),'sdi1358',now(),'sdi1358');
insert into alarm values(0, 3, "2", 3, "n",  "n", now(), "blue8959", now(), "blue8959");

select * from user;
select * from common_code;
select * from user_impairment;
select * from follow;
select * from post;
select * from post_impairment;
select * from comment;
select * from scrap;
select * from alarm;