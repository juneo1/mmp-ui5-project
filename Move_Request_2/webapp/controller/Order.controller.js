sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("RFC_TEST.controller.Order", {
		onInit: function() {
			var oData = {
				oToday: null,
				oToday2: null,
				oInputNum: "",
				oInputPlant: "",
				dateFormat: "yyyy-MM-dd",
				valueFormat: "yyyy-MM-dd"
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel, "Init");

			var oPlantData = {
				selectedKey: "",
				selectItems: [{
					itemKey: "",
					itemText: "전체플랜트"
				}, {
					itemKey: "1000",
					itemText: "MMP본사"
				}, {
					itemKey: "1100",
					itemText: "수도권사업부"
				}, {
					itemKey: "1200",
					itemText: "중부사업부"
				}, {
					itemKey: "1300",
					itemText: "남부사업부"
				}]
			};
			var oModel2 = new JSONModel(oPlantData);
			this.getView().setModel(oModel2, "Plant");

		},

		onGetList: function(oEvent) { //SEARCH
			var sInputNum = this.getView().getModel("Init").getData().oInputNum;
			var sInputPlant = this.getView().getModel("Init").getData().oInputPlant;
			var sFrDate = this._DateFormatSet(this.getView().getModel("Init").getData().oToday);
			var sToDate = this._DateFormatSet(this.getView().getModel("Init").getData().oToday2);
			this.callRfc({
				number: sInputNum,
				plant: sInputPlant,
				frdate: sFrDate,
				todate: sToDate
			});
		},

		onGetList2: function(oEvent) { //SEARCH
			// var sInputNum = this.getView().getModel("Init").getData().oInputNum;
			var sInputPlant = this.getView().getModel("Init").getData().oInputPlant;
			// var sDate = this._DateFormatSet(this.getView().getModel("Init").getData().oToday);

			this.callRfc2({
				plant: sInputPlant
			});
		},

		callRfc: function(oResult) {
			var that = this;

			this.getOwnerComponent().rfcCall("ZMPI240", {
				I_MVNR: oResult.number,
				I_WERKS: oResult.plant,
				I_FRDATE: oResult.frdate,
				I_TODATE: oResult.todate
			}).done(function(oResultData) {
				var oModel2 = new JSONModel(oResultData);
				that.getView().setModel(oModel2);
				that.getView().getModel().setProperty("/TAB1", oResultData.TAB1);
			}).fail(function(sErrorMessage) {});
		},

		callRfc2: function(oResult) {
			var that = this;
			this.getOwnerComponent().rfcCall("ZMPI230", {
				I_WERKS: oResult.plant
			}).done(function(oResultData) {
				var oModel2 = new JSONModel(oResultData);
				that.getView().setModel(oModel2, "ZMPI230");
				that.getView().getModel("ZMPI230").setProperty("/TAB1", oResultData.TAB1);
			}).fail(function(sErrorMessage) {
				/*alert(sErrorMessage);*/
			});
		},
		_DateFormatSet: function(oDate) {
			var sReturnValue = "";

			if (oDate) {
				var iMonth = oDate.getMonth() + 1;
				var iDate = oDate.getDate();
				sReturnValue = "" + oDate.getFullYear() + "-" + (iMonth > 9 ? iMonth : "0" + iMonth) + "-" + (iDate > 9 ? iDate : "0" + iDate);
			}
			return sReturnValue;
		},

		onSelect: function(oEvent) {
			var oModel = this.getView().getModel("Init");
			var sPlant = oEvent.getSource().getProperty("selectedKey");
			oModel.setProperty("/oInputPlant", sPlant);

			// this.onGetList();
		},

		onSelect2: function(oEvent) {
			var oModel = this.getView().getModel("Init");
			var sPlant = oEvent.getSource().getProperty("selectedKey");
			oModel.setProperty("/oInputPlant", sPlant);

			this.onGetList2();
		},

		onViewDetail: function() {
			MessageBox.success("DetailView가 들어갈 자리입니다.");
		},

		onFilterBarSearch: function(oEvent) {
			var oFilterBarModelData = this.getView().getModel("filterbar").getData();
			var sInputNum = oFilterBarModelData.oInputNum;
			var sInputPlant = oFilterBarModelData.oInputPlant;
			var sDate = oFilterBarModelData.oToday;

			var aFilter = [];
			var aFilterbarFilter = [];

			if (sInputNum) {
				aFilterbarFilter.push(new Filter("MVNR", FilterOperator.EQ, sInputNum));
			}
			if (sInputPlant) {
				aFilterbarFilter.push(new Filter("WERKS_FR", FilterOperator.EQ, sInputPlant));
			}
			if (sDate) {
				aFilterbarFilter.push(new Filter("ZDATE", FilterOperator.EQ, sDate));
			}

			aFilter = new Filter({
				filters: aFilterbarFilter,
				and: true
			});

			var oList = this.byId("productTable");
			var oBinding = oList.getBinding("rows");
			oBinding.filter(aFilter);
		},

		formatObj: function(STATE) {
			if (STATE === "A") {
				return "Reject";
			}
			if (STATE === "B") {
				return "Ghost";
			}
			if (STATE === "C") {
				return "Emphasized";
			}
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
		},

		ghostFormatObj: function(STATE) {
			if (STATE === "A") {
				return true;
			} else if (STATE === "B" || STATE === "C") {
				return false;
			}
		},
	});
});