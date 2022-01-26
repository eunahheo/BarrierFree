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
	int physical;
	int visibility;
	int deaf;
	int infant;
	int senior;
}
