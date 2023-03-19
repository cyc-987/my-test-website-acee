let myHeading = document.querySelector('#changable-h2');
myHeading.textContent = 'Hello world!';
//alert('hello!');
//document.querySelector("html").addEventListener("click", () => { alert('don\'t touch me!!') })
let myButton = document.querySelector('#changeusr');
function setUserName() {
    let myName = prompt('please enter your name:');
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem('name', myName);
        myHeading.textContent = 'Hello, ' + myName + '!';
    }
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

$(function () {
    refresh();
    var deletebutton = document.querySelector('#shanchu');
})//刷新时加载评论内容
//读取评论数量
if (!localStorage.getItem('storei')) {
    var storei = 0;
} else {
    var storei = localStorage.getItem('storei');
    storei = Number(storei);//转成整型
}

let sendbutton = document.querySelector('#send');
comment = [];

sendbutton.onclick = function () {
    storecomment();
    refresh();
}
var deletebutton = document.querySelector('#shanchu');
deletebutton.onclick = function () {
    var comment = this.parentNode;
    console.log(comment);
    //删除数组特定对象
    var arrRemoveJson = function (arr, attr, value) {
        if (!arr || arr.length == 0) {
            return ""
        }
        let newArr = arr.filter(function (item, index) {
            return item[attr] != value
        })
        return newArr
    }
    refresh();
}

function getTime() {
    var data = new Date();
    return (data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds());
}

function storecomment() {
    var input = document.getElementById("area").value;
    var usrname = localStorage.getItem("name");
    var time = getTime();
    if (!input) {
        alert('不要提交空内容！');
        return;
    }

    comment.push({ name: usrname, time: time, content: input });//创建对象
    var str = JSON.stringify(comment);//转换成字符串
    localStorage.setItem('comment', str);//进存储

    storei = storei + 1;
    localStorage.setItem('storei', storei);
    document.getElementById("area").value = "";
    refresh();
    //dbg();中期调试函数
}
function dbg() {
    var str = localStorage.getItem("comment");
    var comments = JSON.parse(str);
    console.log(comments);
}

function refresh() {
    var k;
    var comments = [];
    var input = [];
    var usrname = [];
    var time = [];
    var str = localStorage.getItem("comment");
    var listr = '';
    comments = JSON.parse(str);
    for (k = 0; k < storei; k++) {
        var object = {}
        object = comments[k];
        input[k] = object.content;
        usrname[k] = comments[k].name;
        time[k] = comments[k].time;
    }
    for (k = 0; k < storei; k++) {
        listr =
            "<div class='comments' id=" + "'" + k + "'" + ">" +
            "<div class='comment-usr'>" +
            "<p class='cid'"+ "id="+k+">id:"+k+"</p>"+
            "<p class='comment-usr-content'>" + usrname[k] + "</p>" +
            "<p class='time' id='commit-time'>" + time[k] + "</p>" +
            "<p class='time'><span class='time' id='to-date-time'>todate time</span>ago</p>" +
            "</div>" +
            "<div class='comment-text'>" +
            "<p class='comment-text-content'>" + input[k] + "</p>" +
            "</div>" +
            "<div>" +
            "<button class='modify' id='xiugai'>修改</button>" +
            "</div>" +
            "</div>"
            + listr;
    }
    //console.log(listr);
    document.getElementById('comment').innerHTML = listr;
    const deletebutton = document.querySelector('#shanchu');
}

