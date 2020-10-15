sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("addressSelector.controller.App", {
		
		onInit : function() {
			var oAddressData = [{
				KEY : "S", NAME : "서울", GU : [{
					KEY : "J", NAME : "종로구", DONG : [{
						KEY : "M", NAME : "명륜동"
			         }, {
			            KEY : "H1", NAME : "혜화동"
			         }]
				}, {
					KEY : "D", NAME : "동대문구", DONG : [{
						KEY : "H2", NAME : "회기동"
					}, {
			            KEY : "H3", NAME : "휘경동"
					}]
				}]
			}, {
				KEY : "B", NAME : "부산", GU : [{
					KEY : "H", NAME : "해운대구", DONG : [{
						KEY : "W", NAME : "우제동"
			         }, {
			            KEY : "J", NAME : "중제동"
			         }]
				}, {
					KEY : "S", NAME : "사상구", DONG : [{
			            KEY : "H", NAME : "학장동"
					}, {
			            KEY : "U", NAME : "엄궁동"
					}]
				}]
			}];
			
			
			
			this.getView().setModel(new JSONModel(oAddressData));
			this.getView().setModel(new JSONModel({}), "select");
		},
		
		onSelectChange : function (oEvent) {
			
			// default data
			var oView = this.getView();
			var oModel = oView.getModel();
			var oSource = oEvent.getSource();
			var oSelectedData = oSource.getSelectedItem();
			
			
			var Path = oSelectedData.getBindingContext().sPath;
			var sGuPath = Path + "/GU";
		
			var oGu = this.byId("Gu");
			oGu.bindItems(sGuPath, new sap.ui.core.ListItem({key:"{KEY}", text:"{NAME}"}) );
			
			//var sDongPath = Path + "/DONG";
			
			
		}	
		
	});
});