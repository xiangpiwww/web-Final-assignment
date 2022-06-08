function countTime(second,minute,hour) {
	var h_m_s = ["","",""];
	second = parseInt(second);
	minute = parseInt(minute);
	hour = parseInt(hour);
	second += 1;
	if(second == 60){
		minute += 1;
		second = 0;
		if(minute == 60){
			hour += 1; 
			minute = 0;
		}
	}
	if(second < 10){
		h_m_s[2]+="0"+second;
	}
	else{
		h_m_s[2]+=second;
	}
	if(minute < 10){
		h_m_s[1]+="0"+minute;
	}
	else{
		h_m_s[1]+=minute;
	}
	if(hour < 10){
		h_m_s[0]+="0"+hour;
	}
	else{
		h_m_s[0]+=hour;
	}
	return h_m_s;
	//修改网页中的数据
}

function calTime(second,minute,hour){
	second = parseInt(second);
	minute = parseInt(minute);
	hour = parseInt(hour);
	return second + minute * 60 + hour * 3600;
}

function getData(){
	var data = localStorage.getItem("todo");
	if(data!==null) {
		return JSON.parse(data);
	}
	else {
		return [];
	}
}

function setData(obj) {
	localStorage.setItem("todo",JSON.stringify(obj));
}

window.onload = function() {
	var focus = document.querySelector(".u-focus");
	var hour = document.querySelector(".u-hour");
	var minute = document.querySelector('.u-minute');
	var second = document.querySelector(".u-second");
	var flag = 1;
	var exit = document.querySelector(".u-exit");
	var h_m_s = [0,0,0];
	var i,j,k;
	var time;
	focus.addEventListener("click",function() {
		if(flag == 1){
			flag=0;
			focus.innerHTML = "stop";
			time = setInterval(function() {
				h_m_s = countTime(second.innerHTML,minute.innerHTML,hour.innerHTML);
				second.innerHTML = h_m_s[2];
				minute.innerHTML = h_m_s[1];
				hour.innerHTML = h_m_s[0];
			},1000);
		}
		else{
			flag=1;
			focus.innerHTML = "focus";
			clearInterval(time);
			//去掉interval
		}
	});
	
	// console.log(minute.innerHTML)
	// console.log(parseInt(minute.innerHTML));
	exit.addEventListener("click",function() {
		var local = getData();
		var value = localStorage.getItem("value");
		for(var i=0;i<local.length;i++){
			if(local[i].title == value){
				local[i].time += calTime(second.innerHTML,minute.innerHTML,hour.innerHTML);
			}
		}
		setData(local);
		window.location.href = "index.html";
		//跳转并传数据
	})
}
