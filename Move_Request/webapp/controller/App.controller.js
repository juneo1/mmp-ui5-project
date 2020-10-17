sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("RFC_TEST.controller.ProductList", {
		onInit: function() {
			var oData = {
				oToday: null,
				oToday2: null,
				oInputNum: "",
				oInputPlant: "",
				dateFormat: "yyyy-MM-dd",
				valueFormat: "yyyy-MM-dd",
				oState: ""
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel, "Init");

			var oPlantData = {
				selectedKey: "", //초기화면에서 어떤거 먼저 나오게할건지
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

		onGetList: function(oEvent) {
			var sInputNum = this.getView().getModel("Init").getData().oInputNum;
			var sInputPlant = this.getView().getModel("Init").getData().oInputPlant;
			var sFromDate = this._DateFormatSet(this.getView().getModel("Init").getData().oToday);
			var sToDate = this._DateFormatSet(this.getView().getModel("Init").getData().oToday2);

			this.callRfc({
				wrnrNum: sInputNum,
				plant: sInputPlant,
				fromDate: sFromDate,
				toDate: sToDate
			});
		},

		// callRfc: function(oResult) {
		// 	var that = this;
		// 	this.getOwnerComponent().rfcCall("ZMPI230", {
		// 		I_WERKS: oResult.plant
		// 			// I_MVNR : oResult.wrnrNum,
		// 			// I_FROMRDATUM: oResult.sFromDate,
		// 			// I_TODATUM : oResult.sToDate
		// 	}).done(function(oResultData) {
		// 		var oModel2 = new JSONModel(oResultData);
		// 		that.getView().setModel(oModel2, "ZMPI230");
		// 		that.getView().getModel("ZMPI230").setProperty("/TAB1", oResultData.TAB1);
		// 		that.getView().getModel("ZMPI230").setProperty("/TAB3", oResultData.TAB3);
		// 	}).fail(function(sErrorMessage) {});
		// },

		callRfc: function(oResult) {
			var that = this;
			this.getOwnerComponent().rfcCall("ZMPI242", {
				I_WERKS: oResult.plant,
				I_WRNR: oResult.wrnrNum,
				I_FRDATE: oResult.fromDate,
				I_TODATE: oResult.toDate
			}).done(function(oResultData) {
				var oModel = new JSONModel(oResultData);
				that.getView().setModel(oModel, "ZMPI242");
				that.getView().getModel("ZMPI242").setProperty("/TAB1", oResultData.TAB1);
			}).fail(function(sErrorMessage) {});
		},

		// callRfc2: function(oResult) {
		// 	var that = this;
		// 	this.getOwnerComponent().rfcCall("ZMPI241", {
		// 		I_WRNR: oResult.Number,
		// 		TAB1: [oResult.Data]
		// 	}).done(function(oResultData) {
		// 		var sInputPlant = that.getView().getModel("Init").getData().oInputPlant;
		// 		that.callRfc({
		// 			plant: sInputPlant
		// 		});
		// 		// MessageBox.success("성공했다.");
		// 		var oModel2 = new JSONModel(oResultData);
		// 		that.getView().setModel(oModel2, "ZMPI241");
		// 		that.getView().getModel("ZMPI241").setProperty("/TAB1", oResultData.TAB1);
		// 		var sNum = that.getView().getModel("ZMPI241").getProperty("/TAB1")[0].MVNR;
		// 		MessageBox.success("전기문서번호 " + sNum + " 가 생성되었습니다.");
		// 		// alert("전기문서번호 " + sNum +" 가 생성되었습니다.");
		// 	}).fail(function(sErrorMessage) {
		// 		/*alert(sErrorMessage);*/
		// 		MessageBox.error("실패했습니다.");
		// 	});
		// },

		callRfc2: function(oResult) {
			var that = this;
			this.getOwnerComponent().rfcCall("ZMPI241", {
				TAB1: oResult.Data
			}).done(function(oResultData) {
				that.onGetList();
				var oModel2 = new JSONModel(oResultData);
				that.getView().setModel(oModel2, "ZMPI241");
				that.getView().getModel("ZMPI241").setProperty("/TAB1", oResultData.TAB1);
				var sNum = that.getView().getModel("ZMPI241").getProperty("/E_MVNR");
				MessageBox.success("전기문서번호 " + sNum + " 가 생성되었습니다.");
			}).fail(function(sErrorMessage) {
				MessageBox.error("문제가 발생했습니다. 관리자에게 문의하세요.");
			});
		},

		_DateFormatSet: function(oDate) {
			var sReturnValue = "";

			if (oDate) {
				var iMonth = oDate.getMonth() + 1;
				var iDate = oDate.getDate();
				sReturnValue = "" + oDate.getFullYear() + (iMonth > 9 ? iMonth : "0" + iMonth) + (iDate > 9 ? iDate : "0" + iDate);
				// sReturnValue = "" + oDate.getFullYear() + "-" + (iMonth > 9 ? iMonth : "0" + iMonth) + "-" + (iDate > 9 ? iDate : "0" + iDate);
			}
			return sReturnValue;
		},

		onSelect: function(oEvent) {
			var oModel = this.getView().getModel("Init");
			var sPlant = oEvent.getSource().getProperty("selectedKey");
			oModel.setProperty("/oInputPlant", sPlant);
		},

		onViewDetail: function() {
			MessageBox.success("DetailView가 들어갈 자리입니다.");
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

		// onRequest: function(oEvent) {
		// 	var sPath = oEvent.getSource().oPropagatedProperties.oBindingContexts.ZMPI230.sPath;
		// 	var oSelectedData = this.getView().getModel("ZMPI230").getProperty(sPath);
		// 	// var oReq = this.getView().getModel("ZMPI230").getProperty("/TAB1");

		// 	var oData = {
		// 		MATNR: oSelectedData.MATNR,
		// 		ZDATE: oSelectedData.ZDATE,
		// 		BWART: "301",
		// 		WERKS_FR: "1000",
		// 		LGORT_FR: "0009",
		// 		ZMDAT_FR: oSelectedData.DATUM,
		// 		WERKS_TO: oSelectedData.WERKS,
		// 		LGORT_TO: oSelectedData.LGORT,
		// 		ZMDAT_TO: oSelectedData.DATUM,
		// 		MENGE: oSelectedData.MENGE,
		// 		MEINS: oSelectedData.MEINS
		// 	};

		// 	var that = this;

		// 	MessageBox.confirm("출고를 진행하시겠습니까?", {
		// 		actions: [MessageBox.Action.YES, MessageBox.Action.NO],
		// 		onClose: function(sAction) {
		// 			if (sAction === "YES") {
		// 				that.callRfc2({
		// 					Number: oSelectedData.WRNR,
		// 					Data: oData
		// 				});
		// 			} else {
		// 				MessageBox.error("취소되었습니다.");
		// 			}
		// 		}
		// 	});
		// },

		onRequestTest: function(oEvent) {
			var oTable = this.getView().byId("productTable2");
			var oContextObject = {};
			var aSelectedItems = [];
			var aSelectedIndices = oTable.getSelectedIndices();
			aSelectedIndices.forEach(function(v, i) {
				oContextObject = oTable.getContextByIndex(v).getObject();
				aSelectedItems.push(oContextObject);
			});

			var aData = [];
			for (var i = 0; i < aSelectedItems.length; i++) {
				aData[i] = {
					MATNR: aSelectedItems[i].MATNR,
					ZDATE: aSelectedItems[i].ZDATE,
					BWART: "301",
					WERKS_FR: "1000",
					LGORT_FR: "0001",
					ZMDAT_FR: aSelectedItems[i].DATUM,
					WERKS_TO: aSelectedItems[i].WERKS,
					LGORT_TO: aSelectedItems[i].LGORT,
					ZMDAT_TO: aSelectedItems[i].DATUM,
					MENGE: aSelectedItems[i].MENGE,
					MEINS: aSelectedItems[i].MEINS,
					WRNR: aSelectedItems[i].WRNR
				};
			}

			var that = this;

			MessageBox.confirm("출고를 진행하시겠습니까?", {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(sAction) {
					if (sAction === "YES") {
						if (!(aSelectedIndices.length === 0)) {
							that.callRfc2({
								Data: aData
							});
						} else {
							MessageBox.error("값을 선택해 주세요..");
						}
					} else {
						MessageBox.error("취소되었습니다.");
					}
				}
			});
		}

	});
});