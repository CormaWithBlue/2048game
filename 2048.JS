var step = 0;
var statusNow = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var init = function(){
    statusNow = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var first = Math.floor(Math.random()*16);
    statusNow[first] = 2;
    var second = Math.floor(Math.random()*15);
    if(second >= first){
        second = second + 1;
        //second++;
        //second =+ 1;
    }
    statusNow[second] = 2 * (Math.round(Math.random()) + 1 );
}

var calculate = function(direction){

}



document.getElementById("up").onclick=function(){
    // init();
    // console.log(statusNow);
    // alert(statusNow);
    calculate(0);
    alert("向上")
}
document.getElementById("down").onclick=function(){
    calculate(1);
    alert("向下")
}
document.getElementById("left").onclick=function(){
    calculate(2);
    alert("向左")
}
document.getElementById("right").onclick=function(){
    calculate(3);
    alert("向右")
}
