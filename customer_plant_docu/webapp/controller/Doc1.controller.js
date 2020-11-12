sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("Plant_Docu.controller.Doc1", {
		onInit: function () {

			var oData = {
				oToday: null,
				oToday2: null,
				oInputNum: "",
				oInputPlant: "",
				dateFormat: "yyyy-MM-dd",
				valueFormat: "yyyy-MM-dd",
				buttonType: "",
				statusKey: 0
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel, "Init");
			this.getView().byId("filterBar1")._oSearchButton.setText("검색");
			this.callRfc({});
		},

		onGetList2: function (oEvent) { //SEARCH
			// var sInputNum = this.getView().getModel("Init").getData().oInputNum;
			var sInputPlant = this.getView().getModel("Init").getData().oInputPlant;
			// var sDate = this._DateFormatSet(this.getView().getModel("Init").getData().oToday);

			var oFilterbarModelData = this.getView().getModel("Init").getData();
			var SstatusKey = oFilterbarModelData.statusKey;
			var sFromDate = this._DateFormatSet(this.getView().getModel("Init").getData().oToday);
			var sToDate = this._DateFormatSet(this.getView().getModel("Init").getData().oToday2);

			if (SstatusKey === 1) {
				SstatusKey = "A";
			} else if (SstatusKey === 2) {
				SstatusKey = "B";
			}

			var aFilter = [];
			var aFliterbarFilter = [];

			if (sFromDate && sToDate) {
				aFliterbarFilter.push(new Filter("DATUM", FilterOperator.BT, sFromDate, sToDate));
			}
			if (SstatusKey === "A") {
				aFliterbarFilter.push(new Filter("STATE", FilterOperator.EQ, SstatusKey));
			}
			if (SstatusKey === "B") {
				aFliterbarFilter.push(new Filter("STATE", FilterOperator.GE, SstatusKey));
			}

			aFilter = new Filter({
				filters: aFliterbarFilter,
				and: true
			});

			var oList = this.byId("productTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		callRfc: function (oResult) {
			var that = this;
			that.getView().setBusy(true);
			this.getOwnerComponent().rfcCall("ZMPI230", {
				I_WERKS: oResult.Inputplant,
				I_FROMDATUM: oResult.fromDate,
				I_TODATUM: oResult.toDate,
				TAB2: oResult.tab2
			}).done(function (oResultData) {
				that.getView().setBusy(false);
				var oModel2 = new JSONModel(oResultData);
				that.getView().setModel(oModel2, "ZMPI230");
				// that.getView().getModel().setProperty("/TAB1", oResultData.TAB1);
				// that.getView().getModel().setProperty("/TAB2", oResultData.TAB2);
			}).fail(function (sErrorMessage) {
				that.getView().setBusy(false);
			});
		},

		// callRfc2: function (oResult) { //230
		// 	var that = this;
		// 	this.getView().setBusy(true);
		// 	this.getOwnerComponent().rfcCall("ZMPI242", {
		// 		I_WERKS: oResult.plant
		// 	}).done(function (oResultData) {
		// 		that.getView().setBusy(false);
		// 		var oModel2 = new JSONModel(oResultData);
		// 		that.getView().setModel(oModel2, "ZMPI242");
		// 		that.getView().getModel("ZMPI242").setProperty("/TAB1", oResultData.TAB1);
		// 	}).fail(function (sErrorMessage) {
		// 		that.getView().setBusy(false);
		// 	});
		// },

		callRfc3: function (oResult) { //230
			var that = this;
			this.getOwnerComponent().rfcCall("ZMPI247", {

			}).done(function (oResultData) {
				var oModel2 = new JSONModel(oResultData.E_TAB);
				that.getView().setModel(oModel2, "ZMPI247");
			}).fail(function (sErrorMessage) {});
		},

		_DateFormatSet: function (oDate) {
			var sReturnValue = "";

			if (oDate) {
				var iMonth = oDate.getMonth() + 1;
				var iDate = oDate.getDate();
				sReturnValue = "" + oDate.getFullYear() + "-" + (iMonth > 9 ? iMonth : "0" + iMonth) + "-" + (iDate > 9 ? iDate : "0" + iDate);
			}
			return sReturnValue;
		},

		onSelect: function (oEvent) {
			var oModel = this.getView().getModel("Init");
			var sPlant = oEvent.getSource().getProperty("selectedKey");
			oModel.setProperty("/oInputPlant", sPlant);

			// this.onGetList();
		},

		onSelect2: function (oEvent) {
			var oModel = this.getView().getModel("Init");
			var sPlant = oEvent.getSource().getProperty("selectedKey");
			oModel.setProperty("/oInputPlant", sPlant);

			this.onGetList2();
		},

		textFormatObj: function (STATE) {
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

		formatterObj: function (STATE) {
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