package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.Sigungu;

@Repository
public interface SigunguRepository extends JpaRepository<Sigungu, Integer> {
	// 해당 시에 맞는 시군구들 조회
	public List<Sigungu> findBySidoCodeAndDelYn(String sidoCode, char delYn);

	@Query("SELECT s FROM Sigungu s WHERE s.sidoCode =?1 AND s.sigunguName = ?2")
	public Sigungu findBySidoCodeAndSigunguName(String sidoCode, String sigunguName);
}
