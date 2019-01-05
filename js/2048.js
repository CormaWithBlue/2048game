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
    statusNow[parseInt(second/4)][second%4] = 2 * (Math.floor(Math.random()) + 1 );
    updateUI();
}

var updateDiamond = function(id,number){
    //1.判断参数是否合法
    if(id<0 || id>15){
        return;
    }
    //console.log(Math.log(number)/Math.log(2));
    if(number<0 || (number != 0 && !Number.isInteger(Math.log(number)/Math.log(2))) || number>2048){
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
            divNow.style.backgroundColor = "rgb(195,195,195)";
            break;
        case 2:
            divNow.style.backgroundColor = "rgb(250,235,215)";
            break;
        case 4:
            divNow.style.backgroundColor = "rgb(255,127,80)";
            break;
        case 8:
            divNow.style.backgroundColor = "rgb(222,184,135)";
            break;
        case 16:
            divNow.style.backgroundColor = "rgb(127,215,212)";
            break;
        case 32:
            divNow.style.backgroundColor = "rgb(184,134,11)";
            break;
        case 64:
            divNow.style.backgroundColor = "rgb(233,150,122)";
            break;
        case 128:
            divNow.style.backgroundColor = "rgb(173,255,47)";
            break;
        case 256:
            divNow.style.backgroundColor = "rgb(255,105,180)";
            break;
        case 512:
            divNow.style.backgroundColor = "rgb(72,209,204)";
            break;
        case 1024:
            divNow.style.backgroundColor = "rgb(100.149,237)";
            break;
        case 2048:
            divNow.style.backgroundColor = "rgb(147,112,216)";
            break;
    }
}

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
                temp2[i][temp2[i].length-1] *=2;
                temp3[i][temp2[i].length-1] =1;
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



document.getElementById("up").onclick=function(){
    // init();
    // console.log(statusNow);
    // alert(statusNow);
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

init();