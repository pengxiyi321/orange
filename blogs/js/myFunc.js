/**
 *缓动动画
 * @param {Object}obj
 * @param {number}target
 */
function buffer(obj,json,fn){
    clearInterval(obj.timer);
    var begin = 0,speed = 0,target = 0;
    obj.timer = setInterval(function(){
        var flag = true;
        for(var k in json){
            if("opacity" === k){
                begin = Math.round(parseFloat(getCssAttrValue(obj,k) * 100));
                target = parseInt(parseFloat(json[k]) * 100);
            }else if("scrollTop" === k){
                begin = Math.ceil(obj.scrollTop);
                target = parseInt(json[k]);
            }else if("zIndex" === k){
                obj.style[k] = json[k];
            }else{
                begin = parseInt(getCssAttrValue(obj,k));
                target = parseInt(json[k]);
            }
            speed = (target - begin) * 0.2;
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);
            if("opacity" === k){
                obj.style.opacity = (begin + speed) / 100;
                obj.style.filter = "alpha(opacity:" + (begin + speed) + ")";
            }else if("scrollTop" === k){
                obj.scrollTop = begin + speed;
            }else{
                obj.style[k] = begin + speed + "px";
            }
            if(begin !== target){
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },20);
}
/**
 *匀速动画
 * @param {Object}ele
 * @param {number}target
 * @param {number}speed
 */
function constant(ele,target,speed){
    clearInterval(ele.timer);
    var dir = ele.offsetLeft <target ? speed : -speed;
    ele.timer = setInterval(function(){
        ele.style.left = ele.offsetLeft + dir + "px";
        if(Math.abs(target-ele.offsetLeft) <= Math.abs(dir)){
            clearInterval(ele.timer);
            ele.style.left = target + "px";

        }

    },20)
}
/**
 *
 * @param id
 * @returns {any}
 */
function $(id){
    return typeof id === "string" ? document.getElementById(id):null;
}

/**
 * 获取CSS的样式值
 * @param {Object}obj
 * @param {string}attr
 * @returns {*}
 */
function getCssAttrValue(obj, attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj, null)[attr];
    }
}
function throttle(fn,delay){
    var timer = null;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(fn,delay);
    }
}