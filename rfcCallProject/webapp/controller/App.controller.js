sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("rfcCallProject.controller.App", {
		onGetData : function() {
			
			this.getOwnerComponent().rfcCall("zbsfm20_03", {	// 본인이 호출하고 싶은 RFC명 입력. 여기서는 예제로 zbsfm20_03를 사용
				//RFC Import 데이터
				I_TKNUM: "0000001060"
			}).done(function(oResultData){	// RFC호출 완료
				console.log(oResultData);
			}).fail(function(sErrorMessage){// 호출 실패
				alert(sErrorMessage);
			});
			
			/*this.getOwnerComponent().rfcCall("BAPI_FLIGHT_GETDETAIL", {
				AIRLINEID : 'LH',
				CONNECTIONID :'0400',
				FLIGHTDATE : '20200228'
			}).done(function(oResultData){	// RFC호출 완료
				console.log(oResultData);
			}).fail(function(sErrorMessage){// 호출 실패
				alert(sErrorMessage);
			});*/
		}
	});
});