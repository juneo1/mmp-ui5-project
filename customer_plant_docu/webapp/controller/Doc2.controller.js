sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("Plant_Docu.controller.Doc2", {
		onInit: function() {
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
			this.getView().byId("filterBar2")._oSearchButton.setText("검색");
			this.callRfc2({});
		},

		onGetList: function(oEvent) { //SEARCH
			var oFilterbarModelData = this.getView().getModel("Init").getData();
			var sDocNum = this.getView().getModel("Init").getData().oInputNum;
			var sFromDate = this._DateFormatSet(this.getView().getModel("Init").getData().oToday);
			var sToDate = this._DateFormatSet(this.getView().getModel("Init").getData().oToday2);

			var aFilter = [];
			var aFliterbarFilter = [];

			if (sFromDate && sToDate) {
				aFliterbarFilter.push(new Filter("ERDAT", FilterOperator.BT, sFromDate, sToDate));
			}

			if (sDocNum) {
				aFliterbarFilter.push(new Filter("GRNB", FilterOperator.EQ, sDocNum));
			}

			aFilter = new Filter({
				filters: aFliterbarFilter,
				and: true
			});

			var oList = this.byId("productTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		callRfc2: function(oResult) { //230
			var that = this;
			that.getView().setBusy(true);
			this.getOwnerComponent().rfcCall("ZMPI246", {

			}).done(function(oResultData) {
				var oModel2 = new JSONModel(oResultData.O_TAB1);
				that.getView().setModel(oModel2, "ZMPI246");
				that.getView().setBusy(false);
			}).fail(function(sErrorMessage) {
				that.getView().setBusy(false);
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