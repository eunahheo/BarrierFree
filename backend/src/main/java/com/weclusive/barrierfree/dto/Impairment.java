package com.weclusive.barrierfree.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Impairment {
	private int physical = 0;
	private int visibility = 0;
	private int deaf = 0;
	private int infant = 0;
	private int senior = 0;
}
