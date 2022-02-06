package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.Tourapi;

@Repository
public interface TourapiRepository extends JpaRepository<Tourapi, Long> {

	// 해당 컨텐츠id에 대한 상세정보 반환
	public Tourapi findByDelYnAndContentId(char delYn, long contentid);

	// 시도로 검색한 결과
	public Tourapi findByDelYnAndSidoCode(char delYn, String sidoCode);
	// 컨텐츠 타입으로 검색한 결과
	public Tourapi findByDelYnAndTourapiContentTypeId(char delYn, String contentTypeId);
	// 장애정보로 검색한 결과
	// 시도,시군구로 검색한 결과
	public Tourapi findByDelYnAndSidoCodeAndSigunguCode(char delYn, String sidoCode, String sigunguCode);
	// 시도,컨텐츠 타입으로 검색한 결과
	// 시도,장애정보로 검색한 결과
	// 컨텐츠타입,장애정보로 검색한 결과
	// 시도,시군구,컨텐츠타입으로 검색한 결과
	// 시도,시군구,장애정보로 검색한 결과
	// 시도,컨텐츠타입,장애정보로 검색한 결과
	// 시도,시군구,컨텐츠타입,장애정보로 검색한 결과
}
