function timeChange(time){
	var h_m_s = ["","",""];
	var second = time[2];
	var minute = time[1];
	var hour = time[0];
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
}

function countTime(second,minute,hour) {
	var h_m_s = ["","",""];
	second = parseInt(second);
	minute = parseInt(minute);
	hour = parseInt(hour);
	second -= 1;
	if(second < 0 && (minute!=0 || hour!=0)){
		minute -= 1;
		second = 59;
		if(minute < 0 && hour!=0){
			hour -= 1; 
			minute = 59;
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

function getTime(backTime){
	var hour = Math.floor(backTime / 3600);
	backTime %= 3600;
	var minute = Math.floor(backTime / 60);
	var second = backTime % 60;
	var h_m_s = [hour,minute,second];
	return h_m_s;
}

window.onload = function() {
	var focus = document.querySelector(".u-focus");
	var hour = document.querySelector(".u-hour");
	var minute = document.querySelector('.u-minute');
	var second = document.querySelector(".u-second");
	var exit = document.querySelector(".u-exit");
	var flag = 1;	
	var h_m_s = [1,1,1];
	var i,j,k;
	var time;

	
	
	var backTime = getTime(localStorage.getItem("backTime"));
	backTime = timeChange(backTime);
	hour.innerHTML = backTime[0];
	minute.innerHTML = backTime[1];
	second.innerHTML = backTime[2];

	console.log(hour.innerHTML)
	focus.addEventListener("click",function() {
		if(flag == 1){
			flag=0;
			focus.innerHTML = "stop";
			time = setInterval(function() {
				if( h_m_s[0] == 0 && h_m_s[1] == 0 && h_m_s[2] == 0 ){
					focus.innerHTML = "perfect";
					clearInterval(time);
				}
				else{
					h_m_s = countTime(second.innerHTML,minute.innerHTML,hour.innerHTML);
					second.innerHTML = h_m_s[2];
					minute.innerHTML = h_m_s[1];
					hour.innerHTML = h_m_s[0];
				}
				
			},1000);
		}
		else{
			flag=1;
			focus.innerHTML = "focus";
			clearInterval(time);
			//去掉interval
		}
	});
	
	exit.addEventListener("click",function() {
		localStorage.removeItem("time");
		localStorage.setItem("time",calTime(second.innerHTML,minute.innerHTML,hour.innerHTML));
		window.location.href = "index.html";
		//跳转并传数据
	})
}
