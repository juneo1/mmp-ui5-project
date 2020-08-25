sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("gugudan.controller.App", {
		// onInit은 처음에 화면이 그려질때 한 번만 사용되는 함수이다. 따라서 라우팅에서 경로로 지정 할 수 없다.
		onInit: function() {
			this.getView().setModel(new JSONModel({
				inputValue: "",
				gugudanTextArr: ["", "", "", "", "", "", "", "", ""]
			}));
		},

		onGugudan: function() {
			var oView = this.getView(); //this는 controller 객체 본인을 가르킨다.
			var oModel = oView.getModel(); //getModel을 통해 view에 바인딩 된 모델들을 전부 가져온다. 인자가 비어있으면 기본모델을 가져온다. 
			// getProperty는 경로에 있는 데이터만 나오고 getData는 모델에 세팅해준 자바스크립트 객체 전체가 return 된다.
			var sInputValue = oModel.getProperty("/inputValue").trim();

			if (sInputValue === "") {
				MessageBox.error("값을 입력하시기 바랍니다.");
				return;
			}

			if (!(1 <= sInputValue && sInputValue <= 9)) {
				MessageBox.error("1부터 9까지만 입력가능 합니다.");
				return;
			}

			var sSumText = "";

			for (var i = 1; i <= sInputValue; i++) {
				for (var k = 1; k <= 9; k++) {
					sSumText += i + " * " + k + " = " + (i * k) + "\n";
				}
				oModel.setProperty("/gugudanTextArr/" + (i - 1), sSumText);
				sSumText = "";
			}

			if (sInputValue < 9) {
				for (var m = sInputValue; m <= 9; m++) {
					oModel.setProperty("/gugudanTextArr/" + m, "");
				}
			}
		}
	});
});