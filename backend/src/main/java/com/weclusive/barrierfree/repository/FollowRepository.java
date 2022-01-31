 package com.weclusive.barrierfree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.weclusive.barrierfree.entity.Follow;

public interface FollowRepository extends JpaRepository<Follow, Long> {
	
	@Query(value="SELECT followingSeq FROM Follow WHERE userSeq=?1")
	public List<Long> findFollower(int userSeq);
	
	public Follow findByUserSeqAndFollowingSeqAndDelYn(int userSeq, int followingSeq, char delYn);
	
	// 팔로잉 수
	@Query(value="SELECT COUNT(f) FROM Follow f WHERE f.delYn = 'n' AND f.userSeq = ?1")
	public int countFollowing(int userSeq);

	// 팔로워 수
	@Query(value="SELECT COUNT(f) FROM Follow f WHERE f.delYn = 'n' AND f.followingSeq = ?1")
	public int countFollower(int userSeq);
	
}
