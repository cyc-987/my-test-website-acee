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
    
    var comment = {name:usrname,time:time,content:input};//创建对象
    var str = JSON.stringify(comment);//转换成字符串
    localStorage.setItem('comment', str);//进存储

    storei++;
    document.getElementById("area").value = "";
    refresh();
}