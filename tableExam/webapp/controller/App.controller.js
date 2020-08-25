sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment"
], function(Controller, JSONModel, MessageToast, Fragment) {
	"use strict";

	return Controller.extend("tableExam.controller.App", {
		onInit : function() {
				
		},
		
		onSelect : function(oEvent) {
			var sSelectedKey = oEvent.getSource().getSelectedKey();
			var oTable = this.byId("productTable");
			var aColumns = oTable.getColumns();
			
			
			if( sSelectedKey === "A") {
				aColumns[2].setVisible(true);			
				aColumns[4].setVisible(true);			
			} else {
				aColumns[2].setVisible(false);			
				aColumns[4].setVisible(false);			
			}
		},
		
		onDetailDialog : function(oEvent) {
			// fragment에서 dialog를 쓸 때 UI5는 id중복을 허락하지 않기 때문에 View의 id를 붙여서 호출해서 중복이 일어나지 않게 호출한다.
			var oView = this.getView();
			var oModel = oView.getModel("Products");
			var sSelectedPath = oEvent.getSource().getBindingContext("Products").getPath();
			var oSelectedData = oModel.getProperty(sSelectedPath);
			oModel.setProperty("/detailData", oSelectedData);
			
			// view에서 helloDiaglog라는 id를 찾는 메소드
			if(!this.byId("detailDialog")) { // 안만들어졌기에 객체가 없어서 false, !이 붙어서 true가 되면 구문 실행
				// 구문이 실행되면 Fragment객체를 가져와서 Load함수를 실행, 함수의 기능은 파일을 읽어온다. HelloDialog.xml을 읽어오는 것.
				// if구문을 사용해서 하지 않으면 처음에는 diglog가 아예 없어서 load되지만, 다시 실행하면 똑같은 id의 dialog가 이미 생성되서(숨어있어서 안보임) duplicate id 오류가 떨어진다.
				Fragment.load({
					id: oView.getId(),
					name: "tableExam.view.Dialog",
					controller: this // 닫는 이벤트가 필요하기 때문에 Fragment인데 controller를 지정해준 것.
				}).then(function(oDialog) { // load함수가 끝나면 then함수 실행
					oView.addDependent(oDialog);//dialog를 해당 뷰에다가 넘겨서 dependent해준다는 구문.
						oDialog.open();
				});
			} else {
				this.byId("dialog").open(); // id로 찾아서 open해주면 화면에 보여주게 됨
			}
		},
		
		onCloseDialog : function() {
			this.byId("detailDialog").close();
		}
	});
});