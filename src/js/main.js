const head = document.getElementById("header"); //Lembre que só pega o primeiro elemento

function comboOption(name, price, description){
    this.name = name;
    this.price = price;
    this.description = description;
}



document.addEventListener("click", function(e) {
    if(e.target.classList.contains("buttonCalcular")){
        
    } 
} )


/** Função pega o tempo atual e coloca no header. */
function GetTime(){
    var time = document.createElement("p");
    var today = new Date();
    time.textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    head.appendChild(time);
}

GetTime();