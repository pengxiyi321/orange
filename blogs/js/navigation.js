window.onload = function(){
    var nav = document.getElementById("nav");
    var allLi = nav.getElementsByTagName("li");
    for(var i=0; i<allLi.length; i++){
        allLi[i].onclick = function(){
            for(var j=0;j<allLi.length; j++){
                allLi[j].removeChild(".current");
            }
        }
    }
}