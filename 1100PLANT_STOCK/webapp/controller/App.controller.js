sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Core",
	"sap/m/GroupHeaderListItem"
], function(Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator, Core, GroupHeaderListItem) {
	"use strict";
	return Controller.extend("1100_stock.controller.App", {
		onInit: function() {
			this.callRfc();
		},

		callRfc: function(oResult) {
			var that = this;
			this.getView().setBusy(true);
			this.getOwnerComponent().rfcCall("ZMPI260", {

			}).done(function(oResultData) {
				that.getView().setBusy(false);
				var oModel = new JSONModel(oResultData);
				that.getView().setModel(oModel, "ZMPI260");
				that.getView().getModel("ZMPI260").setData(oResultData);
				that.getList();
			}).fail(function(sErrorMessage) {
				that.getView().setBusy(false);
			});
		},

		formatObj: function(STATE) {
			if (STATE >= 50) {
				return "Success";
			} else if (STATE >= 30 && STATE < 50) {
				return "Warning";
			} else {
				return "Error";
			}
		},

		onFilterSelect: function(oEvent) {
			var sKey = oEvent.getSource().getSelectedKey();
			var tableId;
			if(sKey === '0001'){
				tableId = this.byId("productTable");
			} else {
				tableId = this.byId("productTable2");
			}
			
			var filterArr = [];
			var items = tableId.getBinding("items");
			var filter1 = new sap.ui.model.Filter("LGORT", FilterOperator.EQ, sKey);
			filterArr = [filter1];
			items.filter(filterArr);
		},

		getList: function() {
			var filterArr = [];
			var tableId = this.byId("productTable");
			var items = tableId.getBinding("items");
			var filter1 = new sap.ui.model.Filter("LGORT", FilterOperator.EQ, "0001");
			filterArr = [filter1];
			items.filter(filterArr);
		}

		// handleSelectChange: function(oEvent) {
		// 	var sKey = oEvent.getSource().getSelectedKey();
		// 	var tableId = this.byId("productTable");
		// 	var filterArr = [];
		// 	var items = tableId.getBinding("items");
		// 	var filter1 = new sap.ui.model.Filter("LGORT", FilterOperator.EQ, sKey);
		// 	filterArr = [filter1];
		// 	items.filter(filterArr);

		// 	var oModel = this.getView().getModel("Init");
		// 	oModel.setProperty("/sKey", sKey);

		// },

		// getGroupHeader: function(oGroup) {
		// 	return new GroupHeaderListItem({
		// 		title: oGroup.key,
		// 		upperCase: false
		// 	});
		// }

	});
});