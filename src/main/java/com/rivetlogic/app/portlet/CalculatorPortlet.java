package com.rivetlogic.app.portlet;

import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import javax.portlet.Portlet;

import org.osgi.service.component.annotations.Component;

/**
 * @author rivetlogic
 */
@Component(
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=category.tools",
		"com.liferay.portlet.instanceable=false",
		"com.liferay.portlet.css-class-wrapper=calculator-portlet",
		"com.liferay.portlet.header-portlet-css=/css/calculator.css",
		"com.liferay.portlet.footer-portlet-javascript=/js/calculator.js",
		"com.liferay.portlet.icon=/icon/calculator.png",
		
		"javax.portlet.display-name=Calculator",
		"javax.portlet.portlet-info.short-title=Liferay Calculator",
		"javax.portlet.portlet-info.title=Liferay Calculator",
		"javax.portlet.description=Liferay Calculator Portlet with the basic math and memory functions.",
		"javax.portlet.info.keywords=calculator, accounting, finance, productivity, tool",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=administrator,guest,power-user,user"		
	},
	service = Portlet.class
)
public class CalculatorPortlet extends MVCPortlet {
}