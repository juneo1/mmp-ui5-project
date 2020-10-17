sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/NumberFormat",
	"sap/base/strings/formatMessage"
], function(Controller, JSONModel, NumberFormat, formatMessage) {
	"use strict";

	return Controller.extend("Main.controller.Startpage", {
		onInit: function() {
			var that = this;

			$.ajax({
				url: "./json/ProcessFlowData.json",
				type: "get",
				success: function(oResult) {
					var oModel = new JSONModel(oResult);
					that.getView().setModel(oModel, "process");
				}
			});
		},

		formatMessage: formatMessage,

		getProgress: function(aNodes) {
			if (!aNodes || aNodes.length === 0) {
				return 0;
			}
			var iSum = 0;
			for (var i = 0; i < aNodes.length; i++) {
				iSum += aNodes[i].state === "Positive";
			}
			var fPercent = (iSum / aNodes.length) * 100;
			return fPercent.toFixed(0);
		},

		getEntityCount: function(entities) {
			return entities && entities.length || 0;
		},

		formatNumber: function(value) {
			var oFloatFormatter = NumberFormat.getFloatInstance({
				style: "short",
				decimals: 1
			});
			return oFloatFormatter.format(value);
		}
	});
});