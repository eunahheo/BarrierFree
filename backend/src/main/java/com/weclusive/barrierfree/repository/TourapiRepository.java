package com.weclusive.barrierfree.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.Tourapi;

@Repository
public interface TourapiRepository extends JpaRepository<Tourapi, Long> {
	// 해당 컨텐츠id에 대한 상세정보 반환
	public Tourapi findByDelYnAndContentId(char delYn, long contentid);

	// 전체 검색 결과
	public Page<Tourapi> findByDelYn(char delYn, Pageable pageable);
	
	// 시도로 검색한 결과
	public Page<Tourapi> findByDelYnAndSidoCode(char delYn, String sidoCode, Pageable pageable);
	
	// 컨텐츠 타입으로 검색한 결과
	public Page<Tourapi> findByDelYnAndTourapiContenttypeid(char delYn, String contentTypeId, Pageable pageable);
	
	// 장애정보로 검색한 결과
	
	// 시도,시군구로 검색한 결과
	public Page<Tourapi> findByDelYnAndSidoCodeAndSigunguCode(char delYn, String sidoCode, String sigunguCode, Pageable pageable);
	
	// 시도,컨텐츠 타입으로 검색한 결과
	public Page<Tourapi> findByDelYnAndSidoCodeAndTourapiContenttypeid(char delYn, String sidoCode, String contentTypeId, Pageable pageable);
	
	// 시도,장애정보로 검색한 결과
	
	// 컨텐츠타입,장애정보로 검색한 결과
	
	// 시도,시군구,컨텐츠타입으로 검색한 결과
	public Page<Tourapi> findByDelYnAndSidoCodeAndSigunguCodeAndTourapiContenttypeid(char delYn, String sidoCode, 
			String sigunguCode, String contentTypeId, Pageable pageable);
	
	// 시도,시군구,장애정보로 검색한 결과
	
	// 시도,컨텐츠타입,장애정보로 검색한 결과
	
	// 시도,시군구,컨텐츠타입,장애정보로 검색한 결과
	
	
//	@Query(value = "SELECT t FROM Tourapi t WHERE t.tourapi_contenttypeid = :contenttypeid AND t.tourapi_title LIKE ")
	public Page<Tourapi> findByTourapiTitleContainingAndTourapiContenttypeid(String keyword, String contenttypeid,
			Pageable pageable);
}
