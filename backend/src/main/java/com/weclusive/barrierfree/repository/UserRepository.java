package com.weclusive.barrierfree.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUserNickname(String userNickname);
	// 텅 비어있어도 작동한다.
	// JpaRepository를 상속받으면 기본적으로 CRUD가 생성된다.
//
//	// UserSeq로 찾기
//	public User findByUserSeq();
//	public User findByUserNickname(String userNickname);
//
//	public User findByUserId(String userId);

	User findByUserId(String userId);

	User findByUserEmail(String userEmail);

	User findByUserSeq(int userSeq);

	// delyn = n 인 컬럼 수
	public int countByDelYnAndUserSeq(char delYn, int userSeq);
	
	// 회원 한명 전체 정보 가져오기
	@Query(value="SELECT u FROM user u WHERE u.delYn='n' AND u.userSeq = ?1")
	public Optional<User> findAllByUserSeq(int userSeq);

	// 검색 - 사용자 닉네임
	// user_nickname, user_seq, user_photo
//	@Query(nativeQuery = true, value = "SELECT * FROM user WHERE del_yn = 'n' AND user_nickname like '%?1%'")
	public List<User> findByUserNicknameContaining(String keyword);
	
}
