window.onload = function(){
    var carousel_lis = $("carousel").children;
    $("carousel").appendChild(carousel_lis[0].cloneNode(true));
    var currentIndex = 0,indiccatorIndex = 0;
    for(var i=0;i<carousel_lis.length-1;i++){
        var li = document.createElement("li");
        $("dot").appendChild(li);
    }
    $("dot").children[0].className = "current";
    var dotLis = $("dot").children;
    for(var i=0;i<dotLis.length;i++){
        (function(i){
            var li = dotLis[i];
            li.onmouseover = function(){
                for(var j=0;j<dotLis.length;j++){
                    dotLis[j].className = "";
                }
                this.className = "current";
                constant($("carousel"),-824 * i,60);
                currentIndex = i;
                indiccatorIndex = i;
            }
        })(i);
    }
    var timer = window.setInterval(autoPlay,3000);
    $("carousel").onmouseover = function(){
        clearInterval(timer);
    }
    $("carousel").onmouseout = function(){
        timer = setInterval(autoPlay,3000);
    }
    /* var carBtn = document.getElementsByClassName("carBtn");
     carBtn[0].onmousedown = function(){
         currentIndex--;
         if(currentIndex < 0){
             currentIndex = dotLis.length-1;
             constant($("carousel"),-824 * currentIndex,60);
         }else {
             constant($("carousel"), 824 * currentIndex, 60);
         }
     }
     carBtn[1].onmousedown = function(){
         currentIndex++;
         if(currentIndex > dotLis.length - 1){
             currentIndex = 1;
         }
         constant($("carousel"),-824 * currentIndex,60);
     }*/
    /**
     *
     * @param ele
     * @param target
     * @param speed
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
    function autoPlay(){
        currentIndex++;
        if(currentIndex > carousel_lis.length -1){
            $("carousel").style.left = 0;
            currentIndex = 1;
        }
        constant($("carousel"),-currentIndex * 824,60);
        indiccatorIndex++;
        if(indiccatorIndex > dotLis.length -1){
            indiccatorIndex = 0;
        }
        for(var j=0;j<dotLis.length;j++){
            dotLis[j].className = "";
        }
        dotLis[indiccatorIndex].className = "current";
    }
    /**
     *
     * @param id
     * @returns {any}
     */
    function $(id){
        return typeof id === "string" ? document.getElementById(id):null;
    }
}