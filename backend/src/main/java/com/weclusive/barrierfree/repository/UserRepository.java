package com.weclusive.barrierfree.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	// 텅 비어있어도 작동한다.
	// JpaRepository를 상속받으면 기본적으로 CRUD가 생성된다.

	User findByUserNickname(String userNickname);

	User findByUserId(String userId);

	User findByUserEmail(String userEmail);

	User findByUserSeq(int userSeq);

	// delyn = n 인 컬럼 수
	public int countByDelYnAndUserSeq(char delYn, int userSeq);

	// 회원 한명 전체 정보 가져오기
	@Query(value = "SELECT u FROM user u WHERE u.delYn='n' AND u.userSeq = ?1")
	public Optional<User> findAllByUserSeq(int userSeq);

	// 검색 - 사용자 닉네임
	public Page<User> findByUserNicknameContaining(String keyword, Pageable pageable);
}
