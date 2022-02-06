package com.weclusive.barrierfree.service;

import java.util.ArrayList;

public interface TestService {
	
	public ArrayList<String> loadAllContentId();
	
	public int loadByContentId(String contentid);
}
