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
//	@Query("select t from Tourapi t inner join TourapiImpairment ti on t.contentId = ti.contentId where delYn = ?1 and contentId = ?2")
	public Tourapi findByDelYnAndContentId(char delYn, long contentid);

	// 전체 검색 결과
	public Page<Tourapi> findByDelYn(char delYn, Pageable pageable);

	// 시도로 검색한 결과
	public Page<Tourapi> findByDelYnAndSidoCode(char delYn, String sidoCode, Pageable pageable);

	// 컨텐츠 타입으로 검색한 결과
	public Page<Tourapi> findByDelYnAndTourapiContenttypeidIn(char delYn, String[] contentTypeId, Pageable pageable);

	// 장애정보로 검색한 결과
	@Query("select t from Tourapi t where t.delYn=:delYn and t.contentId in (select ti.contentId from TourapiImpairment ti where ti.code in :impairments)")
	public Page<Tourapi> findByImpariments(char delYn, List<String> impairments, Pageable pageable);

	// 시도,시군구로 검색한 결과
	public Page<Tourapi> findByDelYnAndSidoCodeAndSigunguCode(char delYn, String sidoCode, String sigunguCode, Pageable pageable);

	// 시도,컨텐츠 타입으로 검색한 결과
	public Page<Tourapi> findByDelYnAndSidoCodeAndTourapiContenttypeidIn(char delYn, String sidoCode, String[] contentTypeId, Pageable pageable);

	// 시도,장애정보로 검색한 결과
	@Query("select t from Tourapi t where t.delYn=:delYn and t.sidoCode = :sidoCode and t.contentId in (select ti.contentId from TourapiImpairment ti where ti.code in :impairments)")
	public Page<Tourapi> findBySidoCodeAndImpariments(char delYn, String sidoCode, List<String> impairments, Pageable pageable);

	// 컨텐츠타입,장애정보로 검색한 결과
	@Query("select t from Tourapi t where t.delYn=:delYn and t.tourapiContenttypeid = :contentTypeId and t.contentId in (select ti.contentId from TourapiImpairment ti where ti.code in :impairments)")
	public Page<Tourapi> findByTourapiContenttypeidInAndImpariments(char delYn, String[] contentTypeId, List<String> impairments, Pageable pageable);

	// 시도,시군구,컨텐츠타입으로 검색한 결과
	public Page<Tourapi> findByDelYnAndSidoCodeAndSigunguCodeAndTourapiContenttypeidIn(char delYn, String sidoCode, String sigunguCode, String[] contentTypeId, Pageable pageable);

	// 시도,시군구,장애정보로 검색한 결과
	@Query("select t from Tourapi t where t.delYn=:delYn and t.sidoCode = :sidoCode and t.sigunguCode = :sigunguCode and t.contentId in (select ti.contentId from TourapiImpairment ti where ti.code in :impairments)")
	public Page<Tourapi> findBySidoCodeAndSigunguCodeAndImpairments(char delYn, String sidoCode, String sigunguCode, List<String> impairments, Pageable pageable);

	// 시도,컨텐츠타입,장애정보로 검색한 결과
	@Query("select t from Tourapi t where t.delYn=:delYn and t.sidoCode = :sidoCode and t.tourapiContenttypeid in :contentTypeId and t.contentId in (select ti.contentId from TourapiImpairment ti where ti.code in :impairments)")
	public Page<Tourapi> findBySidoCodeAndTourapiContenttypeidAndImpariments(char delYn, String sidoCode, String[] contentTypeId, List<String> impairments, Pageable pageable);

	// 시도,시군구,컨텐츠타입,장애정보로 검색한 결과
	@Query("select t from Tourapi t where t.delYn=:delYn and t.sidoCode = :sidoCode and t.sigunguCode = :sigunguCode and t.tourapiContenttypeid in :contentTypeId and t.contentId in (select ti.contentId from TourapiImpairment ti where ti.code in :impairments)")
	public Page<Tourapi> findBySidoCodeAndSigunguCodeAndTourapiContenttypeidAndImpariments(char delYn, String sidoCode, String sigunguCode, String[] contentTypeId, List<String> impairments, Pageable pageable);

//	@Query(value = "SELECT t FROM Tourapi t WHERE t.tourapi_contenttypeid = :contenttypeid AND t.tourapi_title LIKE ")
	public Page<Tourapi> findByTourapiTitleContainingAndTourapiContenttypeid(String keyword, String contenttypeid, Pageable pageable);

	// 문화시설 검색용
	public Page<Tourapi> findByTourapiTitleContainingAndTourapiContenttypeidIn(String keyword, String[] contenttypeid, Pageable pageable);

	// 장소 이름으로 검색
	@Query(value = "SELECT t FROM Tourapi t WHERE t.tourapiTitle like %?1% AND t.delYn = 'n'")
	public List<Tourapi> findTourapiTitle(String title);

	@Query(value = "SELECT t FROM Tourapi t WHERE t.tourapiImage Is NULL")
	public List<Tourapi> findByTourapiImage();
}
