package com.weclusive.barrierfree.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.TourapiImpairment;

@Repository
public interface TourapiImpairmentRepository extends JpaRepository<TourapiImpairment, Long> {
	@Query(value = "SELECT DISTINCT(ti.code) FROM tourapi_impairment ti WHERE ti.content_id = ?1", nativeQuery = true)
	public String[] selectConentImpairment(long contentId);
}
