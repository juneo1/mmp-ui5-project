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
	return Controller.extend("main_stock.controller.ProductList", {
		onInit: function() {
			this.callRfc();
			this.callRfc2();
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
		
		callRfc2: function(oResult) {
			var that = this;
			this.getView().setBusy(true);
			this.getOwnerComponent().rfcCall("ZMPI261", {

			}).done(function(oResultData) {
				that.getView().setBusy(false);
				var oModel = new JSONModel(oResultData);
				that.getView().setModel(oModel, "ZMPI261");
				that.getView().getModel("ZMPI261").setData(oResultData);
			}).fail(function(sErrorMessage) {
				that.getView().setBusy(false);
			});
		},

		formatObj: function(STATE) {
			if (STATE >= 60) {
				return "Success";
			} else if (STATE >= 30 && STATE < 60) {
				return "Warning";
			} else {
				return "Error";
			}
		},

		getList: function() {
			var filterArr = [];
			var tableId = this.byId("productTable");
			var items = tableId.getBinding("items");
			var filter1 = new sap.ui.model.Filter("LGORT", sap.ui.model.FilterOperator.EQ, "0001");
			filterArr = [filter1];
			items.filter(filterArr);
		},

		handleSelectChange: function(oEvent) {
			var sKey = oEvent.getSource().getSelectedKey();
			var tableId = this.byId("productTable");
			var filterArr = [];
			var items = tableId.getBinding("items");
			var filter1 = new sap.ui.model.Filter("LGORT", sap.ui.model.FilterOperator.EQ, sKey);
			filterArr = [filter1];
			items.filter(filterArr);
		},
		
		handleSelectChange2: function(oEvent) {
			var sKey = oEvent.getSource().getSelectedKey();
			
			
			
			
			var tableId = this.byId("productTable");
			var filterArr = [];
			var items = tableId.getBinding("items");
			var filter1 = new sap.ui.model.Filter("LGORT", sap.ui.model.FilterOperator.EQ, sKey);
			filterArr = [filter1];
			items.filter(filterArr);
		},
		
		getGroupHeader: function (oGroup){
			return new GroupHeaderListItem({
				title: oGroup.key,
				upperCase: false
			});
		}

	});
});