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
    
    // switch(向左){
    //     case1:first = second && 在同一行
    //         case1:(first在最左侧)
    //             (first = first + second) && (second = null) && (Math.floor(Math.random()*15))
    //         case2:(second 在最左侧)
    //             (second = first + second) && (first = null) && (Math.floor(Math.random()*15))
    //         case3:(first&&second 都不在最左侧)
    //             (最左侧 = first + second) && (first = null) && (second = null) && (Math.floor(Math.random()*15))

    //     case2: first != second && 在同一行
    //         case1:first在最左侧)
    //             first && newSecond = (second(newSecond在first右一)) && (second = null) && (Math.floor(Math.random()*14))
    //         case2:(second 在最左侧)
    //             second && newFirst = (first(newFirst在second右一)) && (first = null) && (Math.floor(Math.random()*14))
    //         case3:(first&&second 都不在最左侧 first在左)
    //             (最左侧 = first && second) && (first = null) && (second = null) && (Math.floor(Math.random()*14))
    //         case4:(first&&second 都不在最左侧 second在左)
    //             (最左侧 = second && first) && (first = null) && (second = null) && (Math.floor(Math.random()*14))
            
    //     case3: 不在同一行
    //         case1: first在最左侧&&second在最左侧
    //             first && second && Math.floor(Math.random()*14)
    //         case2: first在最左侧&&second不在最左
    //             first && (newSecond最左 = second) && (second = null) && Math.floor(Math.random()*14)
    //         case3: second在最左侧&&first不在最左
    //             (newFirst最左 = first) && (first = null) && second && Math.floor(Math.random()*14)
    //         case4: first&&second都不在最左
    //             (newFirst = first) && (first = null) && (newSecond最左 = second) && (second = null) && Math.floor(Math.random()*14)
                

    //         first（最左） && second（最左）&& Math.floor(Math.random()*14)
    //}

    //一.根据方向转置矩阵
    var temp1 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    
    
    
    //二.计算结果
    var temp2 = [[],[],[],[]];
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            if(temp1[i][j] == 0)
            {
                continue;
            }
            else if(temp1[i][j] == temp2[i][temp2[i].length-1])
            {
                temp2[i][temp2[i].length-1] *=2;
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
    var newpos = Math.floor(Math.random()*(16-len));
    var newvalue = 2 * (Math.round(Math.random()) + 1 );
    for(var i=0; i<4; i++)
    {
        if(newpos > 4-temp2[i].length)
        {
            newpos -= 4-temp2[i].length;
        }
        else
        {
            newpos += i*4;
            break;
        }
    }
    
    //四.回复原有方向

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
