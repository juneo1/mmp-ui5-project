sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/UIComponent"
	], function(Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator, UIComponent) {
	"use strict";

	return Controller.extend("mTableExam.controller.ProductList", {
		onInit : function() {
				var that = this;
		
				var oData = {
				sDefaultDate : "" ,
				displayFormat : "yyyy-MM-dd",
				valueFormat : "yyyy-MM-dd",
				categoryKey : "",
				statusKey : 0
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel, "filterbar");
				
				$.ajax({
					url : "./json/products.json",
					type : "get",
					success : function(oResult) {
					var oProductsModel = new JSONModel(oResult);
					that.getView().setModel(oProductsModel, "products");	
					// that.getView().setModel(new JSONModel({}), "delmode");
				}
			});		
		},
		
		onSelectionChange : function(oEvent) {
			var sPath = oEvent.getParameter("listItem").getBindingContextPath();
			MessageToast.show(sPath);
		}, 
		
		onRowDelete : function(oEvent) {
			var sPath = oEvent.getParameter("listItem").getBindingContextPath();
			
			var that = this;
			MessageBox.confirm("삭제하시겠습니까?", {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(sAction) {
					if( sAction === "YES") {
						var sSelectedIndex = sPath.substr(sPath.lastIndexOf("/") + 1);
						var oData = that.getView().getModel("products").getData();
						oData.ProductCollection.splice(sSelectedIndex,1);
						that.getView().getModel("products").setData(oData);
						that.getView().getModel("products").refresh();
						MessageBox.success("성공적으로 삭제되었습니다.");
					} else {
						MessageBox.error("취소되었습니다.");
					}
				}
			});
		},
		
		onDeleteMode : function(oEvent) { 
			var bSelected = oEvent.getParameter("selected");
			var sMode = bSelected? "Delete" : "None" ;
			
			this.getView().byId("productMTable").setMode(sMode);
		},
		
		onChangeSwitch : function(oEvent) {
			var bSelected = oEvent.getSource().getState();
			var sMode = bSelected? "Delete" : "None" ;
			
			// this.getView().byId("productMTable").setMode(sMode);
	
			this.getView().getModel("products").setProperty("/tableMode", sMode);
			// this.getView().getModel("delmode").setProperty("/smode", sMode);
		},
		
		onFilterBarSearch : function(oEvent) {
			var oFilterBarModelData = this.getView().getModel("filterbar").getData();
			var sDefaultDate = oFilterBarModelData.sDefaultDate;
			var sCategoryKey = oFilterBarModelData.categoryKey;
			var sStatusKey = oFilterBarModelData.statusKey;
			
			if(sStatusKey === 1) {
				sStatusKey = "Available";
			} else if(sStatusKey === 2) {
				sStatusKey = "Unavailable";
			}
			
			var aFilter = [];
			var aFilterbarFilter = [];
			
			if( sDefaultDate ) {
				aFilterbarFilter.push(new Filter("DateOfSale", FilterOperator.EQ, sDefaultDate));
			}
			if( sCategoryKey ) {
				aFilterbarFilter.push(new Filter("Category", FilterOperator.EQ , sCategoryKey));
			}
			if( sStatusKey ) {
				aFilterbarFilter.push(new Filter("Status", FilterOperator.EQ, sStatusKey));
			}
			
			aFilter = new Filter({
				filters : aFilterbarFilter,
				and : true
			});
			
			var oList = this.byId("productMTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		
		onGoDetail : function(oEvent) {
			// Go to Detail Page
			var oTable = this.byId("productMTable");
			var oProductModel = this.getView().getModel("products");
			var sPath = oEvent.getSource().getBindingContextPath();
			var oSelectedData = oProductModel.getProperty(sPath);
			this.getView().getModel("detail").setData(oSelectedData);
			
			UIComponent.getRouterFor(this).navTo("detail");
		}

	});
});