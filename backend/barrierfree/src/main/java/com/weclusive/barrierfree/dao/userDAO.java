package com.weclusive.barrierfree.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.weclusive.barrierfree.dto.*;

@Mapper
public interface userDAO {
	public List<User> selectUser();
}
