package com.weclusive.barrierfree;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BarrierfreeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BarrierfreeApplication.class, args);
	}
	
	@PostConstruct
    public void started(){
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));

    }

}
