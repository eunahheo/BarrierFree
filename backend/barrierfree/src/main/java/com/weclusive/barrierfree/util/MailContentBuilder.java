package com.weclusive.barrierfree.util;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailContentBuilder {

	private final TemplateEngine templateEngine;

	public String build(String message) {
		Context context = new Context();
		context.setVariable("link", message);
		return templateEngine.process("mailTemplate", context);
	}

	public String passBuild(String temp) {
		Context context = new Context();
		context.setVariable("temp", temp);
		return templateEngine.process("mailTemplatePass", context);
	}
}
