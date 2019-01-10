var step = 0;
var statusNow = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

var init = function(){
    statusNow = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var first = Math.floor(Math.random()*15);
    statusNow[parseInt(first/4)][first%4] = 2;
    var second = Math.floor(Math.random()*14);
    if(second >= first){
        second = second + 1;
        //second++;
        //second =+ 1;
    }
    statusNow[parseInt(second/4)][second%4] = 2 * (Math.round(Math.random()) + 1 );
    updateUI();
}

var updateDiamond = function(id,number){
    //1.判断参数是否合法
    if(id<0 || id>15){
        return;
    }
    //console.log(Math.log(number)/Math.log(2));
    if(number<0 || (number != 0 && !Number.isInteger(Math.log(number)/Math.log(2)))){
        return;
    }

    //2.找到要被赋值的div
    var divId = "diamond"+id;
    var divNow = document.getElementById(divId);
    
    //3.更新div
    if(number == 0){
        divNow.textContent = "";
    }
    else{
        divNow.textContent = number;
    }
    switch(number){
        case 0:
            divNow.style.backgroundColor = "#D9D9D9";
            break;
        case 2:
            divNow.style.backgroundColor = "#FFB3A7";
            break;
        case 4:
            divNow.style.backgroundColor = "#F47983";
            break;
        case 8:
            divNow.style.backgroundColor = "#C93756";
            break;
        case 16:
            divNow.style.backgroundColor = "#FF2D51";
            break;
        case 32:
            divNow.style.backgroundColor = "#FF461F";
            break;
        case 64:
            divNow.style.backgroundColor = "#F00056";
            break;
        case 128:
            divNow.style.backgroundColor = "#836FFF";
            break;
        case 256:
            divNow.style.backgroundColor = "#6CA6CD";
            break;
        case 512:
            divNow.style.backgroundColor = "#32CD32";
            break;
        case 1024:
            divNow.style.backgroundColor = "#00FA9A";
            break;
        case 2048:
            divNow.style.backgroundColor = "#CDB5CD";
            alert("恭喜你达成2048的目标！");
            break;
        case 4096:
            divNow.style.backgroundColor = "#D1EEEE";
            alert("恭喜你达成4096的目标！好棒棒啊~");
            break;
    }
}

//更新显示到页面的格子中
var updateUI = function(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            updateDiamond(i*4+j, statusNow[i][j]);
        }
    }
}

var calculate = function(direction){
    
    //一.根据方向转置矩阵
    var temp1 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            switch(direction){
                case 0:
                    temp1[i][j] = statusNow[j][i];
                    break;
                case 1:
                    temp1[i][j] = statusNow[3-j][i];
                    break;
                case 2:
                    temp1[i][j] = statusNow[i][j];
                    break;
                case 3:
                    temp1[i][j] = statusNow[i][3-j];
                    break;
            }
        }
    }
    
    
    //二.计算结果
    var temp2 = [[],[],[],[]];
    var temp3 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            if(temp1[i][j] == 0)
            {
                continue;
            }
            else if(temp1[i][j] == temp2[i][temp2[i].length-1] && 0 ==temp3[i][temp2[i].length-1])
            {
                temp2[i][temp2[i].length-1] *= 2;
                temp3[i][temp2[i].length-1] = 1;
            }
            else
            {
                temp2[i][temp2[i].length] = temp1[i][j];
            }
        }
    }
    
    //三.随机生成新数据
    var len = 0;
    for(var i=0; i<4; i++)
    {
        len += temp2[i].length;
    }
    var newpos = Math.floor(Math.random()*(15-len));
    var newvalue = 2 * (Math.round(Math.random()) + 1 );
    for(var i=0; i<4; i++)
    {
        if(newpos >= 4-temp2[i].length)
        {
            newpos -= 4-temp2[i].length;
        }
        else
        {
            var ilen = temp2[i].length;
            for(j=ilen;j<ilen+newpos-1;j++)
            {
                temp2[i][j] = 0;
            }
            temp2[i][temp2[i].length] = newvalue;
            break;
        }
    }
    
    //四.回复原有方向
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            switch(direction){
                case 0:
                    if(j >= temp2[i].length)
                    {
                        statusNow[j][i] = 0;
                    }
                    else{
                        statusNow[j][i] = temp2[i][j];
                    }
                    break;
                case 1:
                    if(j >= temp2[i].length)
                    {
                        statusNow[3-j][i] = 0;                            
                    }
                    else{
                        statusNow[3-j][i] = temp2[i][j];
                    }
                    break;
                case 2:
                    if(j >= temp2[i].length)
                    {
                        statusNow[i][j] = 0;                            
                    }
                    else{
                        statusNow[i][j] = temp2[i][j];
                    }
                    break;
                case 3:
                    if(j >= temp2[i].length)
                    {
                        statusNow[i][3-j] = 0;                            
                    }
                    else{
                        statusNow[i][3-j] = temp2[i][j];
                    }
                    break;
            }
        }
    }
    console.log('\n');
    console.log('\n');
    for(var i=0;i<4;i++){
        var str ='';
        for(var j=0;j<4;j++){
            str += statusNow[i][j] + " ";
        }
        for(var z =0;z<i;z++){
            str += " ";
        }
        console.log(str);
    }
    updateUI();
}

//不能移动的提示信息：关闭后，将游戏重置
function gameOver(){   //judge the game is over or not
    var i,j;
    for(i=1;i<=4;i++){//is there any  empty position
        for(j=1;j<=4;j++){
            if(statusNow[i][j] == 0){
                return false;
            }           
        }
    }     
          
    for(i=1;i<=4;i++){// is there any datas can be combinated
        for(j=1;j<=3;j++){
            if(statusNow[i][j] == statusNow[i][j+1]){
                return false;
            }
        }
    }    
                  
    for(j=1;j<=4;j++){
        for(i=1;i<=3;i++){
            if(statusNow[i][j] == statusNow[i+1][j]){
                return false;
            }
        }
    }
            
    return true;
}

if(gameOver()){
    alert("游戏结束！！！");
    init();
}


//增加逻辑：当数字全部在某一侧，且向该侧移动并不会出现数字合并时，点击向该侧移动的按钮，不会增加新的数字




//点击页面上的上下左右按钮实现数字的移动
document.getElementById("up").onclick=function(){
    calculate(0);
    //alert("向上")
}
document.getElementById("down").onclick=function(){
    calculate(1);
    //alert("向下")
}
document.getElementById("left").onclick=function(){
    calculate(2);
    //alert("向左")
}
document.getElementById("right").onclick=function(){
    calculate(3);
    //alert("向右")
}
document.getElementById("reset").onclick=function(){
    var r=confirm("你确认要重新开始吗？");
    if (r==true){
        init();
    }
}

//使用键盘的方向键和W A S D 实现与上下左右按钮点击一样的效果
document.onkeydown = keyboardDirection;
    function keyboardDirection() {
        event.preventDefault();//取消事件的默认动作，通过键盘操作方向键时，浏览器页面不会跟着上下移动
        if (event.keyCode == 38 || event.keyCode == 87){
            calculate(0);
            //alert("向上")
        }
        if (event.keyCode == 40 || event.keyCode == 83){
            event.preventDefault();
            calculate(1);
            //alert("向下")
        }
        if (event.keyCode == 37 || event.keyCode == 65){
            calculate(2);
            //alert("向左")
        }
        if (event.keyCode == 39 || event.keyCode == 68){
            calculate(3);
            //alert("向右")
        }
    }

init();