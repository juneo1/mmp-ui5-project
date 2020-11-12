sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, JSONModel) {
	"use strict";

	return UIComponent.extend("Main.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
			
				var oData = {
				oToday: null,
				oToday2: null,
				oInputNum: "",
				oInputPlant: "",
				dateFormat: "yyyy-MM-dd",
				valueFormat: "yyyy-MM-dd",
				docNum : ""
			};
			
			var oPlantData = {
				selectedKey: "", //초기화면에서 어떤거 먼저 나오게할건지
				selectItems: [{
					itemKey: "",
					itemText: "전체플랜트"
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
			var oModel = new JSONModel(oData);
			this.setModel(oModel, "Init");
			
			var oModel2 = new JSONModel(oPlantData);
			this.setModel(oModel2, "Plant");
			this.setModel(new JSONModel({}));
			this.setModel(new JSONModel({}), "MasterViewModel");
			this.setModel(new JSONModel({}), "detail");
			this.setModel(new JSONModel({}), "detailWait");
			this.setModel(new JSONModel({}), "detailGo");
		},

		rfcCall: function(sRfcName, oParameter) {
			var oDeferred = jQuery.Deferred(),
				oRfcParameter = {
					DestinationName: 'DongaUnivAbap',
					FunctionName: sRfcName,
					ImportData: JSON.stringify(oParameter)
				};
			$.ajax({
				type: 'POST',
				url: 'https://rfcprojectcngdlrcatf.eu2.hana.ondemand.com/rfcProject/RFCManager',
				data: oRfcParameter,
				success: function(oResultData) {
					oDeferred.resolve(oResultData);
				},
				error: function() {
					oDeferred.resolve('오류발생');
				}
			});
			return oDeferred;
		}
	});
});