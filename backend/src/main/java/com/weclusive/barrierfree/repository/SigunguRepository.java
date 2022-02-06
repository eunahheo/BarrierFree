package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.Sigungu;

@Repository
public interface SigunguRepository  extends JpaRepository<Sigungu, Integer> {
	// 해당 시에 맞는 시군구들 조회
	public List<Sigungu> findByDelYnAndSidoCode(char delYn, String sidoCode);
}
