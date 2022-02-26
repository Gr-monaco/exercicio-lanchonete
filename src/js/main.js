const head = document.getElementById("header"); //Lembre que só pega o primeiro elemento
const comboBox = document.getElementById("combos");
let comboOptions = [];
function comboOption(id, name, price, description){
    this.id = id
    this.name = name;
    this.price = price;
    this.description = description;
}

document.addEventListener("click", function(e) {
    if(e.target.classList.contains("buttonCalcular")){
        
    } 
})

/** Função para adicionar items no comboBox
 *  Talvez uma implementação para buscar opções em um banco de dados
 *  pode ser implementada depois.
 */
function AddItemsToCombo(){
    let option1 = new comboOption(1,"X-Vegetariano", 25.00, "1 X-Vegetariano e 1 Coca-Cola 350mL");
    let option2 = new comboOption(2,"X-Casal", 40.00, "2 X-Burguer e 1 Coca-Cola 2l");
    let option3 = new comboOption(3,"X-Bacon", 50.00, "1 X-Bacon, 1 porção pequena de Batata Frita e 1 Coca-Cola 350mL");

    comboOptions.push(option1,option2,option3);
    comboOptions.forEach( function(e ,i) {
        //https://www.w3schools.com/jsref/met_select_add.asp
        let option = document.createElement("option");
        option.text = e.name;
        option.id = e.id;
        comboBox.add(option, i);
    })
}


/** Função pega o tempo atual e coloca no header. */
function GetTime(){
    var time = document.createElement("p");
    var today = new Date();
    time.textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    head.appendChild(time);
}

GetTime();
AddItemsToCombo();