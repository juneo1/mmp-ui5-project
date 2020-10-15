sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"rfcCallProject/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("rfcCallProject.Component", {

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
		},
		
		// 이 부분을 본인이 개발하고 있는 Component.js에 복사 
		rfcCall : function (sRfcName, oParameter){
			var oDeferred = jQuery.Deferred(), oRfcParameter = oParameter || {};
			oRfcParameter['format'] = 'json';
			$.ajax({
				type : 'POST',
				url : 'http://52.231.207.124:8100/fmcall/' + sRfcName,
				data : oRfcParameter,
				dataType : 'jsonp',
				success : function(oResultData){
					oDeferred.resolve(oResultData);
				},
				error : function(){
					oDeferred.resolve('오류발생');
				}
			});
			return oDeferred;
		}
	});
});