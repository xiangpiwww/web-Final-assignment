var html = '<div class="u-line">\
    <span class="square">\
    	<div class="u-square"></div>\
    	<div class="u-square-selected"><svg t="1654499243963" class="icon" viewBox="0 0 1497 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3377" width="16" height="16"><path d="M1476.470467 150.422791 688.633041 938.260217C685.780224 950.315666 679.867532 961.795951 670.45784 971.205644L637.926532 1003.736952C610.985823 1030.700667 567.273316 1030.700667 540.332607 1003.736952L533.03952 996.466872C533.016514 996.420859 532.9705 996.397852 532.924487 996.351839L500.393179 963.820531C500.347166 963.774518 500.324159 963.728504 500.278146 963.705498L19.739648 483.167C-7.20106 456.203285-7.20106 412.513784 19.739648 385.550069L52.270956 353.01876C79.234672 326.055045 122.924173 326.055045 149.887888 353.01876L581.744456 784.875329 1346.322227 20.274551C1373.285942-6.689164 1416.975443-6.689164 1443.939158 20.274551L1476.470467 52.805859C1503.434182 79.769575 1503.434182 123.459076 1476.470467 150.422791Z" p-id="3378" fill="#ffffff"></path></svg></div>\
    </span>\
    <input type="text" class="long" placeholder="请添加日程" onfocus=\'fun2(event)\' onblur=\'fun(event)\'></input>\
    <span class="triangle"></span>\
  </div>\
  <div class="m-time">\
  	<div class="timetable">\
  		<span>已花费时间：</span>\
  		<time>00:00</time>\
  		<button onclick="setValueName(event);location.href=\'focus.html\'">开始工作</button>\
  		<button class="delete">删除</button>\
  	</div>\
  </div>';
//从本地取数组
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

var nowValue = "";

function fun2(event){
	nowValue = event.target.value;
}

function check(str){
	var flag = 0;
	for(var i=0;i<str.length;i++){
		if(str[i]!=" ") {
			flag=1;
			break;
		}
	}
	if(flag==1) return true;
	else return false;

}

function fun(event){
	console.log(1);
	var local = getData();
	var f = 1;
	if(nowValue==event.target.value&&nowValue!=""){
		f=1;
	}
	else {
		for(var i=0;i<local.length;i++){
			if(local[i].title==event.target.value){
				f=0;
				alert("任务名不能重复");
				event.target.value=nowValue;
				break;
				
			}

		}
	}
	
	if(f==1){
		if(nowValue==""){
			if(check(event.target.value)==true){
				local.push({title:event.target.value,time:0,flag:false});
			}
			else {
				alert("命名不能为空或无命名");
			}

			
		}
		else {
			for(var i=0;i<local.length;i++){
				if(local[i].title==nowValue){
					if(check(event.target.value)==true){
						local[i].title=event.target.value;
					}
					else {
						alert("命名不能为空或无命名");
					}
				}
			}
		}
	}
	
	setData(local);
	nowValue="";
}



function setCount(event) {
	var obj=0;
	var s=event.target.parentNode.previousElementSibling.lastChild.previousElementSibling;
	var m=event.target.parentNode.previousElementSibling.previousElementSibling.lastChild.previousElementSibling;
	var h=event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.lastChild.previousElementSibling;
	if(h.value==""&&m.value==""&&s.value=="") alert("请输入数字");
	else if(h.value>99){
		alert("时间设置过大，请小于100小时");
	}
	else if(h.value<0||m.value>59||s.value>59||m.value<0||s.value<0){
		alert("请设置正确的时间");
	}
	else {
		console.log(obj);
		obj+=h.value*3600
		console.log(obj);;
		obj+=m.value*60;
		console.log(obj);
		obj+=s.value*1;
		console.log(obj);
		h.value="";
		m.value="";
		s.value="";
		localStorage.setItem("backTime",obj);
		location.href='./timeBack.html'
	}

}
function setValueName(e){
	// console.log(e.target.parentNode.parentNode.previousElementSibling.firstChild.nextElementSibling.nextElementSibling.value);
	var valueName = e.target.parentNode.parentNode.previousElementSibling.firstChild.nextElementSibling.nextElementSibling.value;
	localStorage.setItem("value",valueName);
}

window.onload=function(){

	
	load();
	function load(){
		var local = getData();
		for(var i=0;i<local.length;i++){
			var line = document.createElement("div");
		    line.setAttribute("class","line");
		    line.classList.add("line");
		    line.innerHTML = html;
		    if(local[i].flag==false) {
		    	line.firstChild.firstChild.nextElementSibling.firstChild.nextElementSibling.style.display="flex";
		    	line.firstChild.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.style.display="none";
		    	// console.log(line.firstChild.firstChild.nextElementSibling.firstChild.nextElementSibling.style.display);
		    	document.querySelector("ul").appendChild(line);
		    }
		   	else {
		   		line.firstChild.firstChild.nextElementSibling.firstChild.nextElementSibling.style.display="none";
		    	line.firstChild.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.style.display="flex";
		   		document.querySelector("ol").appendChild(line);
		   	}
		    line.firstChild.lastChild.previousElementSibling.previousElementSibling.value=local[i].title;
		    var timetable = line.lastChild.firstChild.nextElementSibling;
		    timetable.firstChild.nextElementSibling.nextElementSibling.innerHTML=Math.floor(local[i].time/3600) + "小时" + Math.floor((local[i].time%3600)/60) + "分钟";
		}
	}
	// localStorage.clear();
	//JSON.parse();
	// for(var i=0;i<;i++){
		

	// }
	function showList(){
		var tbox = document.querySelector(".m-tbox");
		tbox.addEventListener("click",function(e){
			var e = e || window.event;
        	var target = e.target || e.srcElement;
        	if(e.target&&e.target.className=="triangle"){
        		if(e.target.parentNode.nextElementSibling.style.display=="none"){
					e.target.parentNode.nextElementSibling.style.display="flex";
				}
				else {
					e.target.parentNode.nextElementSibling.style.display="none";
				}
        	}
		})
	}

	function select(){
		var ul = document.querySelector("ul");
		ul.addEventListener("click",function(e){
			var e = e || window.event;
        	var target = e.target || e.srcElement;
        	if(e.target&&e.target.className=="u-square"){
        		e.target.style.display="none";
        		e.target.nextElementSibling.style.display="flex";
        		var clone = e.target.parentNode.parentNode.parentNode.cloneNode(true);
        		var local = getData();
        		for(var i=0;i<local.length;i++){
        			if(local[i].title==clone.firstChild.lastChild.previousElementSibling.previousElementSibling.value){
        				local[i].flag=true;
        			}
        		}
        		setData(local);
				document.querySelector("ol").appendChild(clone);
				document.querySelector("ul").removeChild(e.target.parentNode.parentNode.parentNode);
				onmouse();
		    }
        	
		})
		var ol = document.querySelector("ol");
		ol.addEventListener("click",function(e){
			var e = e || window.event;
        	var target = e.target || e.srcElement;
        	if(e.target&&e.target.nodeName=="svg"){
        		e.target.parentNode.style.display="none";
        		e.target.parentNode.previousElementSibling.style.display="flex";
        		e.target.parentNode.previousElementSibling.style.backgroundColor="white";
        		var clone = e.target.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
        		var local = getData();
        		for(var i=0;i<local.length;i++){
        			if(local[i].title==clone.firstChild.lastChild.previousElementSibling.previousElementSibling.value){
        				local[i].flag=false;
        			}
        		}
        		setData(local);
				document.querySelector("ul").appendChild(clone);
				document.querySelector("ol").removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
				onmouse();
        	}
		})
		onmouse();
	}

	function del(){
		var tbox = document.querySelector(".m-tbox");
		tbox.addEventListener("click",function(e){
			var e = e || window.event;
        	var target = e.target || e.srcElement;
        	if(e.target&&e.target.className=="delete"){
        		var local = getData();
        		var loc = [];
        		for(var i=0;i<local.length;i++){
        			console.log(1);
        			if(local[i].title==e.target.parentNode.parentNode.previousElementSibling.lastChild.previousElementSibling.previousElementSibling.value){
        				;
        			}
        			else {
        				loc.push(local[i]);
        			}
        		}
        		setData(loc);
        		location.reload();
        	}
		})
	}

	function onmouse() {
		var square_white = document.querySelectorAll(".u-square");
		var square_black = document.querySelectorAll(".u-square-selected");
		for(var i=0;i<square_white.length;i++){
			square_white[i].onmouseover=function(){
				this.style.backgroundColor="#c7c5c5";
			}
			square_white[i].onmouseout=function(){
				this.style.backgroundColor="white";
			}
		}
	}

	showList();
	select();
	del();

	var btn = document.querySelector(".add>button");
	btn.addEventListener("click",function(){
		
	    var line = document.createElement("div");

	    line.setAttribute("class","line");
	    line.classList.add("line");
	    line.innerHTML = html;
	    document.querySelector("ul").appendChild(line);
	    onmouse();
	})

}
