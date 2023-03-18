let myHeading = document.querySelector('#changable-h2');
myHeading.textContent = 'Hello world!';
//alert('hello!');
//document.querySelector("html").addEventListener("click", () => { alert('don\'t touch me!!') })
let myButton = document.querySelector('.changeusr');
function setUserName() {
    let myName = prompt('please enter your name:');
    if(!myName){
        setUserName();
    }else{
    localStorage.setItem('name', myName);
    myHeading.textContent = 'Hello, ' + myName + '!';}
}
if (!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'Hello, ' + storedName + '!';
}
myButton.onclick = function () {
    setUserName();
}

var storei = 0;
let sendbutton = document.querySelector('#send');
comment = [];

sendbutton.onclick = function(){
    storecomment();
    refresh();
}
let deletebutton = document.querySelector('#xiugai');
deletebutton.onclick = function(){
    deletecomment();
    refresh();
}

function storecomment(){
    var input = document.getElementById("area").value;
    var usrname = localStorage.getItem("name");
    var time = 00;
    
    comment.push({name:usrname,time:time,content:input});//创建对象
    var str = JSON.stringify(comment);//转换成字符串
    localStorage.setItem('comment', str);//进存储

    storei = storei+1;
    document.getElementById("area").value = "";
    //refresh();
    dbg();
}
function dbg(){
    var str = localStorage.getItem("comment");
    var comments = JSON.parse(str);
    console.log(comments);
}

function refresh(){
    var k;
    var comments = [];
    var input = [];
    var usrname = [];
    var time = [];
    var str = localStorage.getItem("comment");
    var listr = null;
    comments = JSON.parse(str);
    for(k=0;k<storei;k++){
        var object = {} 
        object = comments[k];
        input[k] = object.content;
        usrname[k] = comments[k].name;
        time[k] = comments[k].time;
    }
    for(k=0;k<storei;k++){
        listr = 
        "<div class='comments' id='c'"+storei+">"+
      "<div class='comment-usr'>"+
        "<p class='comment-usr-content'>"+usrname[k]+"</p>"+
        "<p class='time' id='commit-time'>"+time[k]+"</p>"+
        "<p class='time'><span class='time' id='to-date-time'>todate time</span>ago</p>"+
      "</div>"+
      "<div class='comment-text'>"+
        "<p class='comment-text-content'>"+input[k]+"</p>"+
      "</div>"+
      "<div>"+
        "<button class='modify' id='xiugai'>修改</button>"+
        "<button class='modify' id='shanchu'>删除</button>"+
      "</div>"+
    "</div>"
        +listr;
    }
    console.log(listr);
}