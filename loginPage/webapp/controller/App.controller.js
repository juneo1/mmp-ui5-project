sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("loginPage.controller.App", {
		onInit : function() {
			var oData = {
				id: "",
				password: ""
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
			
			var that = this;
			
			$.ajax({
				url : "./json/account.json",
				type : "get",
				success : function(oResult) {
					var oAccountModel = new JSONModel(oResult);
					that.getView().setModel(oAccountModel, "account");					
				}
			});
		},
		
		onLogin : function( ){
			var oModel = this.getView().getModel();
			var oAccountModel = this.getView().getModel("account");
			var sId = oModel.getProperty("/id");
			var sPassword = oModel.getProperty("/password");
			var aAccount = oAccountModel.getData();
			var bLoginCheck = false; //	bLoginCheck -> false -> login실패
			
			for(var i=0; i<aAccount.length; i++) {
				if(aAccount[i].id === sId && aAccount[i].password === sPassword) {
					// success login
					bLoginCheck = true;
					break;
				}
			}
			
			if( bLoginCheck ) {
				MessageBox.success("success login");
			} else {
				MessageBox.error("login fail");
			}
		}
	});
});