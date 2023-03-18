let myHeading = document.querySelector('#changable-h2');
myHeading.textContent = 'Hello world!';
//alert('hello!');
//document.querySelector("html").addEventListener("click", () => { alert('don\'t touch me!!') })
let myButton = document.querySelector('button[class="changeusr"]');
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

function getmessage(){
    
}

let addbutton = document.querySelector('send');
addbutton.onclick = function(){
    getmessage();
    addmessage();
}