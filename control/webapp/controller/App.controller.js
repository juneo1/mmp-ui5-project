sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("control.controller.App", {
		onInit : function() {
			var oData = {
				sToday : "2020-08-01" ,
				oToday : new Date("2020-08-01"),
				oToday2 : new Date("2020-08-10"),
				dateFormat : "yyyy-MM-dd",
				maxDate : new Date(),
				minDate : new Date("2020-07-20"),
				selectedKey : "B",
				selectItems : [
								{ itemKey: "A", itemText: "EU"},
								{ itemKey: "B", itemText: "America"},
								{ itemKey: "C", itemText: "Africa"}]
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		},
		onChangeFirstDate : function(oEvent) {
			MessageToast.show(oEvent.getSource().getMaxDate());
			oEvent.getSource().setMaxDate(new Date("2020-08-30"));
		},
		
		onSelect : function(ABC) {
			MessageToast.show(ABC.getSource().getSelectedKey());
		}
	});
});