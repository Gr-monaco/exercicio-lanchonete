const head = document.querySelector(".header"); //Lembre que só pega o primeiro elemento


document.addEventListener("click", function(e) {
    if(e.target.classList.contains("buttonCalcular")){
        
    } 
} )

function GetTime(){s
    var time = document.createElement("p");
    var today = new Date();
    time.textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    head.appendChild(time);
}

GetTime();