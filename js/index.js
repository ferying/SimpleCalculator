

//计算器
function calculate(num1,num2,opr){
	var res = 0;  //存放计算结果
	switch(opr){
		case '+':
			res = num1 + num2;
			break;
		case '-':
			res = num1 - num2;
			break;
		case '*':
			res = num1 * num2;
			break;
		case '/':
			res = num1 / num2;
			break;
	}
	return parseFloat(res.toFixed(8)); //对浮点数的计算结果进行四舍五入处理
}


var num1 ;
var num2 ;
var oper ;
var isClear = false; //是否清空结果栏

//获取输入的数字
function getNum(e){
	var num = e.value;
	var objResult = document.getElementById("result"); //输入框的内容

	//判断小数点只能输入一次
	if(e.value == "." && objResult.value.indexOf(".")!=-1){ 
		num = "";
	}
	
	if(isClear){
		getClear();
	}

	objResult.value += num;  //连接表达式
	//修改算式提示内容
	document.getElementById("tip").innerHTML += num; 
	isClear = false;
}

//获取输入的操作符号
function getOper(e){
	oper = e.value;
	var objResult = document.getElementById("result");
	num1 = parseFloat(objResult.value);
	objResult.value = "";
	//修改算式提示内容
	document.getElementById("tip").innerHTML += oper; 
	isClear = false;
}


//计算结果
function getResult(){
	var objResult = document.getElementById("result");
	num2 = parseFloat(objResult.value);
	if(oper == "/" && num2 == 0){
		document.getElementById("errorTip").innerHTML = "除数不能为0！";
		objResult.value = "NAN";
	}else{
		objResult.value = calculate(num1,num2,oper);
	}
	isClear = true; 
}

//清零
function getClear(){
	num1 = "";
	num2 = "";
	oper = "";
	document.getElementById("result").value = "";
	document.getElementById("tip").innerHTML = "";
	document.getElementById("errorTip").innerHTML = "";
}


//退格
function getBack(){
	var resVal = document.getElementById("result"); 
	var tipVal = document.getElementById("tip");
	if(resVal.value != "" && resVal.value != 0){
		resVal.value = resVal.value.slice(0,-1);//输入的数字倒退一个
		tipVal.innerHTML = tipVal.innerHTML.slice(0,-1);  //算式提示中对应的数字倒退一个
	}
}


//正负值转换
function changeSign(){
	var resVal = document.getElementById("result"); //输入框的内容
	var tipVal = document.getElementById("tip"); //算式提示的内容
	if(resVal.value != "" && resVal.value != 0){
		if(resVal.value.substr(0, 1) == "-"){
			resVal.value = resVal.value.substr(1);
			//如果操作符为空，修改算式提示中的第一数字
			if(oper == undefined || oper == ""){
				tipVal.innerHTML = resVal.value;
			}else{//修改算式提示中的第二个数字
				tipVal.innerHTML = num1 + oper + resVal.value;
			}
		}else{
			resVal.value = "-" + resVal.value;
			if(oper == undefined || oper == ""){
				tipVal.innerHTML = resVal.value;
			}else{
				tipVal.innerHTML = num1 + oper + "(" + resVal.value + ")";
			}
		}
	}
}


//其他公式计算
function funcalc(fun){
	var resInput = document.getElementById("result");
	var tipText = document.getElementById("tip");
	var num = resInput.value;

	if (fun == "recip" && num != 0){
		resInput.value = (1 / num);
		tipText.innerHTML = "1/" + num;
	}
	if (fun == "sqrt"){
		resInput.value = Math.pow(num,2);
		tipText.innerHTML = num + "^2";
	}
	if (fun == "sin"){
		resInput.value = parseFloat(Math.sin(num*Math.PI/180).toFixed(8));
		tipText.innerHTML = "sin(" + num + ")";
	}
	if (fun == "cos"){
		resInput.value = parseFloat(Math.cos(num*Math.PI/180).toFixed(8));
		tipText.innerHTML = "cos(" + num + ")";
	}
	if (fun == "tan"){
		resInput.value = parseFloat(Math.tan(num*Math.PI/180).toFixed(8));
		tipText.innerHTML = "tan(" + num + ")";
	}
}



