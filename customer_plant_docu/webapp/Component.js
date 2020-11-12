sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"Plant_Docu/model/models",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("Plant_Docu.Component", {

		metadata: {
			manifest: "json"
		},

		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
		},

		rfcCall: function (sRfcName, oParameter) {
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
				success: function (oResultData) {
					oDeferred.resolve(oResultData);
				},
				error: function () {
					oDeferred.resolve('오류발생');
				}
			});
			return oDeferred;
		}
	});
});