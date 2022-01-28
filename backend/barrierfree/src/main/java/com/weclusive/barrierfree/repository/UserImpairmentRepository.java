package com.weclusive.barrierfree.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.weclusive.barrierfree.entity.User;
import com.weclusive.barrierfree.entity.UserImpairment;

@Repository
public interface UserImpairmentRepository extends JpaRepository<UserImpairment, Integer> {

}
