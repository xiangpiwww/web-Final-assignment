function tomatoTime(second,minute) {
	var m_s = ["",""];
	second = parseInt(second);
	minute = parseInt(minute);
	second -= 1;
	if(second < 0){
		minute -= 1;
		second = 59;
	}
	if(second < 10){
		m_s[1] += "0"+second;
	}
	else{
		m_s[1] += second;
	}
	if(minute < 10){
		m_s[0] += "0"+minute;
	}
	else{
		m_s[0] += minute;
	}
	return m_s;
}



window.onload = function() {
	var focus = document.querySelector(".u-focus");
	var minute = document.querySelector('.u-minute');
	var second = document.querySelector(".u-second");
	var flag = 1;
	var exit = document.querySelector(".u-exit");
	var m_s = [1,1];
	var i,j,k;
	var time;
	focus.addEventListener("click",function() {
		if(flag == 1){
			flag = 0;
			focus.innerHTML = "stop";
			time = setInterval(function() {
				if(m_s[1] == 0 && m_s[0] == 0 ){
					focus.innerHTML = "again";
					flag = 2;
					m_s = [1,1]
					clearInterval(time);
				}
				else{
					m_s = tomatoTime(second.innerHTML,minute.innerHTML);
					second.innerHTML = m_s[1];
					minute.innerHTML = m_s[0];
				}
			},1000);
		}
		else if(flag == 0){
			flag=1;
			focus.innerHTML = "focus";
			clearInterval(time);
		}
		else {
			minute.innerHTML = "25";
			flag = 0;
			focus.innerHTML = "stop";
			time = setInterval(function() {
				if(m_s[1] == 0 && m_s[0] == 0 ){
					clearInterval(time);
					focus.innerHTML = "again";
					flag = 2;
					m_s = [1,1];
					clearInterval(time);
				}
				else{
					m_s = tomatoTime(second.innerHTML,minute.innerHTML);
					second.innerHTML = m_s[1];
					minute.innerHTML = m_s[0];
				}
			},1000);
		}
	});

	exit.addEventListener("click",function() {
		window.location.href = "index.html";
		//跳转
	})
}
