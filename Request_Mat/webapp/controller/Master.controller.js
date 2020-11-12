sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	'sap/f/library'
], function(Controller, JSONModel, MessageBox, library) {
	"use strict";

	return Controller.extend("Main.controller.Master", {
		onInit: function() {
			var that = this;
			this.getOwnerComponent().rfcCall("ZMPI243", {}).done(function(oResultData) {
				that.getOwnerComponent().getModel("MasterViewModel").setData(oResultData.TAB1);
			}).fail(function(sErrorMessage) {});

		},

		onSelect: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("Init");
			var sPlant = oEvent.getSource().getProperty("selectedKey");
			oModel.setProperty("/oInputPlant", sPlant);
		},

		onGoDetail: function(oEvent) {
			var sPath = oEvent.getSource().getBindingContextPath();
			var sIndex = sPath.lastIndexOf("/") + 1;
			var sSubString = sPath.substring(sIndex);
			var oSelectedData = this.getOwnerComponent().getModel("MasterViewModel").getData()[sSubString];
			var that = this;
			this.getOwnerComponent().rfcCall("ZMPI244", {
				I_WRNR: oSelectedData.WRNR
			}).done(function(oResultData) {
				// var oData = oResultData.O_TAB1;
				// that.getOwnerComponent().getModel("detail").setData(oData);
				var wrnr = oResultData.E_WRNR;
				that.getOwnerComponent().getModel("Init").setProperty("/wrnr", wrnr);
				that.getOwnerComponent().getModel("detailWait").setData(oResultData.O_TAB1);
				that.getOwnerComponent().getModel("detailGo").setData(oResultData.O_TAB2);
				that.getView().getModel().setProperty("/layout", "TwoColumnsMidExpanded");
			}).fail(function(sErrorMessage) {});

		},

		onGetList: function(oEvent) {
			var sInputNum = this.getOwnerComponent().getModel("Init").getData().oInputNum;
			var sInputPlant = this.getOwnerComponent().getModel("Init").getData().oInputPlant;
			var sFromDate = this._DateFormatSet(this.getOwnerComponent().getModel("Init").getData().oToday);
			var sToDate = this._DateFormatSet(this.getOwnerComponent().getModel("Init").getData().oToday2);
			
			var that = this;
			
			this.getOwnerComponent().rfcCall("ZMPI243", {
				I_WRNR: sInputNum,
				I_WERKS: sInputPlant,
				I_FRDATE: sFromDate,
				I_TODATE: sToDate
			}).done(function(oResultData) {
				that.getOwnerComponent().getModel("MasterViewModel").setData(oResultData.TAB1);
			}).fail(function(sErrorMessage) {});
		},

		_DateFormatSet: function(oDate) {
			var sReturnValue = "";

			if (oDate) {
				var iMonth = oDate.getMonth() + 1;
				var iDate = oDate.getDate();
				// sReturnValue = "" + oDate.getFullYear() + (iMonth > 9 ? iMonth : "0" + iMonth) + (iDate > 9 ? iDate : "0" + iDate);
				sReturnValue = "" + oDate.getFullYear() + "-" + (iMonth > 9 ? iMonth : "0" + iMonth) + "-" + (iDate > 9 ? iDate : "0" + iDate);
			}
			return sReturnValue;
		},

		textFormatObj: function(STATE) {
			if (STATE === "A") {
				return "문서접수중";
			}
			if (STATE === "B") {
				return "출고준비중";
			}
			if (STATE === "C") {
				return "출고완료";
			}
			if (STATE === "D") {
				return "입고완료";
			}
		},

		formatterObj: function(STATE) {
			if (STATE === "A") {
				return 3;
			}
			if (STATE === "B") {
				return 8;
			}
			if (STATE === "C") {
				return 5;
			}
			if (STATE === "D") {
				return 1;
			}
		}

	});

});