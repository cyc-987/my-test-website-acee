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
//以上为跟着mdn web docs做的切换用户功能

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

//定位发布按钮
let sendbutton = document.querySelector('#send');
let comment = [];

//发布按钮点击事件
sendbutton.onclick = function () {
    storecomment();//存储函数
    refresh();//刷新函数
}

//定位删除按钮
var deletebutton = document.getElementById('delete');

//删除按钮点击事件
deletebutton.onclick = function () {
    var str = localStorage.getItem("comment");//读取已有评论
    var listr = JSON.parse(str);
    var num = document.getElementById('deletenum').value;//读取值
    //判断输入
    if (num == '') {
        alert('输入为空！');
        return;
    }
    //读取已有数量
    numint = Number(num);
    var storei = localStorage.getItem("storei");
    storei = Number(storei);
    //判断合法性
    if (numint >= storei || numint < 0) {
        alert('要删除的评论不存在!')
        document.getElementById('deletenum').value = '';
        return;
    }
    //删除选定评论
    listr.splice(numint, 1);
    //更新数值
    storei = storei - 1;
    //console.log(storei);

    //存进localstorage并清空文本框
    str = JSON.stringify(listr);
    localStorage.setItem("comment", str);
    localStorage.setItem("storei", storei);
    document.getElementById('deletenum').value = '';
    refresh();//重载评论
}

//抓取时间函数
function getTime() {
    var data = new Date();
    return (data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds());
}

//存储函数
function storecomment() {
    //获得用户输入和状态
    var input = document.getElementById("area").value;
    var usrname = localStorage.getItem("name");
    var time = getTime();
    //判断合法性
    if (!input) {
        alert('不要提交空内容！');
        return;
    }
    //获得已有评论
    var commenti = localStorage.getItem("comment");
    if (!commenti) {
        comment = [];
    } else {
        comment = JSON.parse(commenti);
    }

    //正则表达式过滤敏感词在这里
    var unprocessed = input;
    var reg1 = /<|>/g;
    //unprocessed = unprocessed.replace(reg1, '');
    var reg2 = /[a][/*+-]*[c][/*+-]*[e][/*+-]*[e]/g;
    unprocessed = unprocessed.replace(reg2, '*');
    //console.log(unprocessed);
    //debugger;
    //还没写完qaq
    //
    //正则表达式实现部分md
    unprocessed = String(unprocessed);
    unprocessed = md(unprocessed);

    var processed = unprocessed;
    comment.push({ name: usrname, time: time, content: processed });//创建对象
    var str = JSON.stringify(comment);//转换成字符串
    localStorage.setItem('comment', str);//进存储

    //获得已有数量
    if (!localStorage.getItem('storei')) {
        storei = 0;
    } else {
        var temp = localStorage.getItem('storei');
        storei = Number(temp);
    }
    //console.log(storei);
    storei = storei + 1;
    localStorage.setItem('storei', storei);//更新数量
    //重置文本框
    document.getElementById("area").value = "";
    refresh();//重载
    //dbg();//中期调试函数
}
//不要理下面的函数
function dbg() {
    var str = localStorage.getItem("comment");
    var comments = JSON.parse(str);
    console.log(comments);
}

//重载函数
function refresh() {
    var k;
    var comments = [];
    var input = [];
    var usrname = [];
    var time = [];
    //获得已有变量
    var str = localStorage.getItem("comment");
    var storei = localStorage.getItem("storei");
    storei = Number(storei);
    var listr = '';
    comments = JSON.parse(str);
    //赋值
    for (k = 0; k < storei; k++) {
        var object = {}
        object = comments[k];
        input[k] = object.content;
        usrname[k] = comments[k].name;
        time[k] = comments[k].time;
    }
    //写入html
    for (k = 0; k < storei; k++) {
        listr =
            "<div class='comments' id=" + "'" + k + "'" + ">" +
            "<div class='comment-usr'>" +
            "<p class='cid'" + "id=" + k + ">id:" + k + "</p>" +
            "<p class='comment-usr-content'>" + usrname[k] + "</p>" +
            "<p class='time' id='commit-time'>" + time[k] + "</p>" +
            "<!--<p class='time'><span class='time' id='to-date-time'>todate time</span>ago</p>-->" +
            "</div>" +
            "<div class='comment-text'>" +
            "<p class='comment-text-content'>" + input[k] + "</p>" +
            "</div>" +
            "</div>"
            + listr;
    }
    //console.log(listr);
    document.getElementById('comment').innerHTML = listr;
}

//定位修改按钮
var modifybutton = document.getElementById('modify');
//修改按钮点击事件
//大致为先删除再发布，下面不再注释
modifybutton.onclick = function () {
    var str = localStorage.getItem("comment");
    var listr = JSON.parse(str);
    var num = document.getElementById('modifynum').value;
    if (num == '') {
        alert('输入为空！');
        return;
    }
    numint = Number(num);
    var storei = localStorage.getItem("storei");
    storei = Number(storei);

    if (numint >= storei || numint < 0) {
        alert('要修改的评论不存在!')
        document.getElementById('modifynum').value = '';
        return;
    }

    document.getElementById('area').value = listr[numint].content;
    listr.splice(numint, 1);
    storei = storei - 1;
    str = JSON.stringify(listr);
    localStorage.setItem("comment", str);
    localStorage.setItem("storei", storei);
    document.getElementById('modifynum').value = '';
    refresh();
}

//用于实现md的函数
function md(str) {
    var replace_content_before = [];
    var replace_content_after = [];
    var temp = [];
    if (str.match(/(?:(^|(?<=\n))#) .+/g)) {
        replace_content_before = str.match(/(?:(^|(?<=\n))#) .+/g);
        //console.log(replace_content_before);
        //console.log(replace_content_before.length);
        //debugger;
        for (var k = 0; k < replace_content_before.length; k++) {
            replace_content_after[k] = String(replace_content_before[k].match(/[^# ]/g));
        }
        for (var k = 0; k < replace_content_after.length; k++) {
            temp[k] = "<h1>" + replace_content_after[k] + "</h1>"
        }
        //console.log(temp);
        //debugger;
        for (var k = 0; k < temp.length; k++) {
            str = str.replace(/(#{1})(.*)/, temp[k].replace(/,/g, '') + "<p>");
        }
        console.log(str);
        //debugger;
    }

    if (str.match(/(?:(^|(?<=\n))##) .+/g)) {
        replace_content_before = str.match(/(?:(^|(?<=\n))##) .+/g);
        for (var k = 0; k < replace_content_before.length; k++) {
            replace_content_after[k] = String(replace_content_before[k].match(/[^# ]/g));
        }
        for (var k = 0; k < replace_content_after.length; k++) {
            temp[k] = "<h2>" + replace_content_after[k] + "</h2>"
        }
        for (var k = 0; k < temp.length; k++) {
            str = str.replace(/(#{2})(.*)/, temp[k].replace(/,/g, '') + "<p>");
        }
    }

    return str;
}
