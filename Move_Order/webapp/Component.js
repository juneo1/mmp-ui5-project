sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"RFC_TEST/model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("RFC_TEST.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(new JSONModel({}), "detail");

			this.setModel(new JSONModel({
				nameValue: "None",
				idValue: "None",
				afterSaveEdit: true
			}), "state");
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
		
		
		 //rfcCall: function(sRfcName, oParameter) {
   //      var oDeferred = jQuery.Deferred(),
   //         oRfcParameter = {
   //            DestinationName: 'DongaUnivAbap',
   //            FunctionName: sRfcName,
   //            ImportData: JSON.stringify(oParameter)
   //         };
   //      $.ajax({
   //         type: 'POST',
   //         url: 'http://52.231.207.124:8100/sap/bc/zrest/' + sRfcName,
   //         data: oRfcParameter,
   //         success: function(oResultData) {
   //            oDeferred.resolve(oResultData);
   //         },
   //         error: function() {
   //            oDeferred.resolve('오류발생');
   //         }
   //      });
   //      return oDeferred;
   //   }

		// rfcCall: function(sRfcName, oParameter) {
		// 	var oDeferred = jQuery.Deferred(),
		// 		oRfcParameter = oParameter || {};
		// 	oRfcParameter['format'] = 'json';
		// 	$.ajax({
		// 		type: 'POST',
		// 		url: 'http://52.231.207.124:8100/fmcall/' + sRfcName,
		// 		data: oRfcParameter,
		// 		dataType: 'jsonp',
		// 		success: function(oResultData) {
		// 			oDeferred.resolve(oResultData);
		// 		},
		// 		error: function() {
		// 			oDeferred.resolve('오류발생');
		// 		}
		// 	});
		// 	return oDeferred;
		// }
		
		// rfcCall : function(sRfcName, oParameter) {
  //       var oDeferred = jQuery.Deferred(),
  //          oRfcParameter = {
  //             DestinationName: 'MMPC',
  //             FunctionName: sRfcName,
  //             ImportData: JSON.stringify(oParameter)
  //          };
  //       window.callBack = function(oData) {
  //          oDeferred.resolve(oData);
  //       };
  //       $.ajax({
  //          type: 'GET',
  //          url: 'http://52.231.167.16:50000/MPMS/RfcParser',
  //          data: oRfcParameter,
  //          dataType: 'jsonp',
  //          jsonp: 'callBack'
  //       });
  //       return oDeferred;
  //    }
		
		
		
		

	});
});