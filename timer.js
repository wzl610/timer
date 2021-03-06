var time = function(el,t,fn){
    var timer = t,_option = {d:0,h:0,m:0,s:0},interval,innerhtml = el.innerHTML;
    function init(){
        if(!isNaN(timer)){
            if(timer.toString().length<13){
                secondToTime();
            }else{
                //时间戳
                stampToTime();
            }
        }else{
            stringToTime();
        }
    }
    function secondToTime(){
        //毫秒数转成时间
        _option.s = timer % 60;
        _option.m = ((timer - _option.s)/60)%60;
        _option.d = parseInt(timer/(60*60*24));
        _option.h = parseInt(timer/3600) - _option.d * 24;
    }
    function stringToTime(){
        if(timer.split("-").length>2){
            //字符串转换成时间 y-m-d-h-m-s-ms
            var tmp = timer.split("-");
            var now = new Date();
            var future = new Date(tmp[0],tmp[1]-1,tmp[2],tmp[3],tmp[4],tmp[5]);
            timer = Math.ceil((future - now)/1000);
            secondToTime();
        }else{
            //字符串转换成时间 d-h:m:s
            _option.d = parseInt(timer.split("-")[0]);
            var tmp = timer.split("-")[1].split(":");
            _option.h = parseInt(tmp[0]);
            _option.m = parseInt(tmp[1]);
            _option.s = parseInt(tmp[2]);
            timer = ((_option.d * 24 + _option.h)*60 + _option.m) * 60 + _option.s;
        }
    }
    function stampToTime(){
        var now = new Date().getTime();
        if(now > timer){
            alert("时间戳不能早于当前时间!");
            return;
        }
        timer = parseInt((timer - now)/1000);
        secondToTime(timer);
    }
    //重置倒计时
    function reset(){
        timer = t;
        init();
        repaint(_option,innerhtml);
    }
    function timeBegin(){
        //开始倒计时
        interval = setInterval(operator,1000);
    }
    function timePause(){
        clearInterval(interval);
    }
    function operator(){
        //倒计时函数
        subtraction();
        secondToTime(); 
        repaint(_option,innerhtml);
    }
    function subtraction(){
        //递减函数
        if(timer==0){
            if(fn && typeof fn == 'function') fn();
            clearInterval(interval);
        }else{
            timer--;
        }
    }
    function repaint(obj,inner){
        //渲染模板
        el.innerHTML = inner.replace(/\{([dhms])\}/g,function(word,$1){
            return format(obj[$1]);
        });
    }
    function format(s){
        return s >= 10 ? s :"0"+s;
    }
    init();
    return{
        reset : reset,
        timeBegin : timeBegin,
        timePause : timePause
    }
}
