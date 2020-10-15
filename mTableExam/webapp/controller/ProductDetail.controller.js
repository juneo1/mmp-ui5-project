sap.ui.define([
	"sap/ui/core/mvc/Controller" ,
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, UIComponent, MessageToast, History, JSONModel) { // 불러온 controller를 Controller라는 변수에 넣어서 사용
	"use strict";  //	엄격한 구문 사용
		return Controller.extend("mTableExam.controller.ProductDetail", {
		onInit : function() {

		},
		
		onNavBack : function() {
			
			var oStateModel = this.getView().getModel("state");
			var oStateModelData = oStateModel.getData();
			oStateModelData.nameValue = "None";
			oStateModelData.idValue = "None";
			oStateModelData.afterSaveEdit = true;
            oStateModel.refresh();
			
			var oHistory = History.getInstance();
			var sPrevious = oHistory.getPreviousHash();
			
			if( sPrevious !== undefined ) {
				window.history.go(-1);
			} else { 
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("list");
			}
		},
		
		onSave : function() {
			var oView = this.getView();
			var oModel = oView.getModel("detail");
			var oStateModel = oView.getModel("state");
			var oDetailData = oModel.getData();
			var bSaveCheck = true;
			
			if(!oDetailData.Name) {
				oStateModel.setProperty("/nameValue", "Error");
				bSaveCheck = false;
			} else {
				oStateModel.setProperty("/nameValue", "None");
			}
			
			if( !oDetailData.ProductId ) {
            oStateModel.setProperty("/idValue", "Error");
            bSaveCheck = false;
			} else {
	            oStateModel.setProperty("/idValue", "None");
	        }
	         
			if( bSaveCheck ) {
				MessageToast.show("Save Success");
				oStateModel.setProperty("/afterSaveEdit", false);
			}
		}
	});
});