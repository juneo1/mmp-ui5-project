sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"tableExam/model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("tableExam.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			var that = this;
			
			$.ajax({
				url : "./json/products.json",
				type : "get",
				success : function(oResult) {
					var oProductsModel = new JSONModel(oResult);
					that.setModel(oProductsModel, "Products");					
				}
			});
			// component에서 setModel을 해주면 getView없이 사용한다.
		}
	});
});