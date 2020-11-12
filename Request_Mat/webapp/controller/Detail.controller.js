sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox"
], function(Controller, JSONModel, History, UIComponent, Fragment, MessageBox) {
	"use strict";
	return Controller.extend("Main.controller.Detail", {
		onInit: function() {

		},

		handleClose: function() {
			this.getView().getModel().setProperty("/layout", "OneColumn");
		},

		formatObj2: function(FLAG) {
			if (FLAG === "1") {
				return "sap-icon://accept";
			}
		},

		textFormatObj: function(STATE) {
			if (STATE === "A") {
				return "출고대기";
			}
			if (STATE === "B") {
				return "출고완료";
			}
			if (STATE === "C") {
				return "출고완료";
			}
		},
		
		textFormatObj2: function(CHECK_CODE) {
			if (CHECK_CODE === "A") {
				return "출고가능";
			}
			if (CHECK_CODE === "N") {
				return "출고불가";
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
		},
		
		formatterObj2: function(STATE) {
			if (STATE === "A") {
				return 8;
			}
			if (STATE === "N") {
				return 9;
			}
		},

		callRfc2: function(oResult) {
			var that = this;
			this.getOwnerComponent().rfcCall("ZMPI241", {
				TAB1: oResult.Data
			}).done(function(oResultData) {
				// that.onGetList();
				that.handleClose();
				that.getOwnerComponent().rfcCall("ZMPI243", {}).done(function(oResultData2) {
					that.getOwnerComponent().getModel("MasterViewModel").setData(oResultData2.TAB1);
				}).fail(function(sErrorMessage) {});
				 var sNum = oResultData.E_MVNR;
				MessageBox.success("전기문서번호 " + sNum + " 가 생성되었습니다.");
			}).fail(function(sErrorMessage) {
				MessageBox.error("문제가 발생했습니다. 관리자에게 문의하세요.");
			});
		},

		onRequest: function(oEvent) {
			var oTable = this.getView().byId("ListTable");
			var oContextObject = {};
			var aSelectedItems = [];
			var aSelectedIndices = oTable.getSelectedIndices();
			aSelectedIndices.forEach(function(v, i) {
				oContextObject = oTable.getContextByIndex(v).getObject();
				aSelectedItems.push(oContextObject);
			});

			var aData = [];
			for (var i = 0; i < aSelectedItems.length; i++) {
				
				if(aSelectedItems[i].CHECK_CODE === "N"){
					MessageBox.error("재고가 부족해 출고가 불가능합니다");
					return;
				}
				
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
			
			oTable.setSelectedIndex();
		}

	});
});