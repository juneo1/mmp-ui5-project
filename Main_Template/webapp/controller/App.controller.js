sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";
	return Controller.extend("Main.controller.App", {
		onInit: function() {
			var that = this;

			$.ajax({
				url: "./json/model.json",
				type: "get",
				success: function(oResult) {
					var oModel = new JSONModel(oResult);
					that.getView().setModel(oModel);
				}
			});
		},

		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(item.getKey()));
		},

		onMenuButtonPress: function() {
			var toolPage = this.byId("toolPage");

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		}
	});
});