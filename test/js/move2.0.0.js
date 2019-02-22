var move = function(ele,targetObj,time,callback){
    if(typeof ele == 'string'){
        ele = document.querySelector(ele);
    }
    clearInterval(ele.timer);
    var speedObj = {};
    for (var attr in targetObj){
        var init = parseFloat(getInit(ele,attr));
        if( attr === 'opacity') init *= 100;
        speedObj[attr] = (targetObj[attr] - init) / time *10;
    }
    ele.timer = setInterval(() => {
        var flag = true;
        for( var attr in targetObj){
            var init = parseFloat(getInit(ele,attr));
            if( attr === 'opacity') init *= 100;
            init += speedObj[attr];
            if ((init >= targetObj[attr] && speedObj[attr] >=0) || (init <= targetObj[attr] && speedObj[attr] <=0)) {
                init = targetObj[attr]; 
            }else {
                flag = false;
            }
            
            if(attr === 'opacity'){
                    ele.style[attr] = init / 100;
                }else{
                    ele.style[attr] = init + 'px';
                }
            }
        if(flag){
            clearInterval(ele.timer);
            if(typeof callback == 'function'){
                callback(ele);
               }
        }
    },10) 
}


function getInit(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return currentStyle[attr];
}