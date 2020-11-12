sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";
	return Controller.extend("Main.controller.Main", {
		onInit: function() {},

		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(item.getKey()));
		},

		onMenuButtonPress: function() {
			var toolPage = this.byId("toolPage");

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		afterNavi: function(oEvent) {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("master");

		}
	});
});