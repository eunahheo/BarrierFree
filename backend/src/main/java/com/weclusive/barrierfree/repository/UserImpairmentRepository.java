package com.weclusive.barrierfree.repository;

 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.UserImpairment;

@Repository
public interface UserImpairmentRepository extends JpaRepository<UserImpairment, Integer> {

	// 회원의 장애 공통코드만 반환
	@Query(value = "SELECT code FROM UserImpairment WHERE userSeq = ?1 AND delYn = 'n'")
	public List<String> findImpairment(int userSeq);
 
}
