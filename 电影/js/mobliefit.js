let html = document.getElementsByTagName("html")[0];

let w = document.documentElement.clientWidth;
html.style.fontSize = w / 10 + "px";


window.onresize = function () {

    let w = document.documentElement.clientWidth;
    html.style.fontSize = w / 10 + "px";
    

    console.log(html.style.fontSize);
    
    

}