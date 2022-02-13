package com.weclusive.barrierfree.repository;

 
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.UserImpairment;

@Repository
public interface UserImpairmentRepository extends JpaRepository<UserImpairment, Integer> {

	// 회원의 장애 공통코드만 반환
	@Query(value = "SELECT code FROM UserImpairment WHERE userSeq = ?1 AND delYn = 'n'")
	public List<String> findImpairment(int userSeq);
	
	// 입력한 사용자 번호의 장애 정보 반환
	public List<UserImpairment> findByDelYnAndUserSeq(char delYn, int userSeq);
 
	// 입력한 게시글 번호와 코드를 가진 장애 정보 반환
	@Query(value="SELECT ui FROM UserImpairment ui WHERE ui.delYn = 'n' AND ui.userSeq = ?1 AND ui.code = ?2")
	public Optional<UserImpairment> findOneByUserSeqCode(int userSeq, String code);
}
