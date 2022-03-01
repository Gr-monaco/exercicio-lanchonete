const head = document.getElementById("header"); //Lembre que só pega o primeiro elemento
const comboBox = document.getElementById("combos");
const outputPrice = document.getElementById("priceOutput");
const outputDescription = document.getElementById("textareadecri");
const timer = document.getElementById("timer");
let deliveryOption = document.querySelector('input[name="entrega"]:checked');

let comboOptions = [];
function comboOption(id, name, price, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
}
function pedido(telefone, nome, total,adicionais,entrega, description){
    this.telefone = telefone;
    this.nome = nome;
    this.total = total;
    this.adicionais = [];
    this.entrega = entrega;
    this.description = description;
}

$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

$("#formulario").validate({
    rules: {
        telefone: {
            required: true,
            regex: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/
        },
        nomeCliente: {
            required: true,
            minlength: 3
        },
        entrega: {
            required: true,
        }
    },
    messages: {
        telefone: {
            required: "Coloque um telefone.",
            regex: "Telefone tem que ser valido"
        },
        nomeCliente: {
            required: "Colocar nome.",
            minlength: "Coloque um nome com pelo menos três letras."
        },
        entrega: {
            required: "Modo de entrega é obrigatório"
        }
    }
});

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("buttonCalcular")) {
        if ($("#formulario").valid()) {
            CalculatePrice();
            UpdateDescription();
        }
    }
    if (e.target.classList.contains("buttonNovoPedido")){
        $("#formulario").validate().resetForm();
        //https://stackoverflow.com/questions/6653556/jquery-javascript-function-to-clear-all-the-fields-of-a-form
        $('#formulario').trigger("reset");
    }
    if (e.target.classList.contains("buttonRecibo")){
        if ($("#formulario").valid()) {
            CalculatePrice();
            UpdateDescription();
            OrderToJson();
        }
    }
})

//https://stackoverflow.com/questions/8963693/how-to-create-json-string-in-javascript
function OrderToJson(){
    let pedidosJson = new pedido();

    pedidosJson.nome = $("input[name=nomeCliente]")[0].value;
    pedidosJson.telefone = $("input[name=telefone]")[0].value;
    pedidosJson.description = $("#textareadecri")[0].value;
    pedidosJson.entrega = GetDeliveryDescription(document.querySelector('input[name="entrega"]:checked'));
    pedidosJson.total = $("#priceOutput")[0].value;

    let checkbox = $('.adicionais:checkbox:checked');
    if(checkbox.length !== 0){
        checkbox.each(function(i,e) {
            pedidosJson.adicionais.push(e.name);
        });
    }
    console.log(JSON.stringify(pedidosJson));
    alert(JSON.stringify(pedidosJson))
}

/** 
 *  Função para adicionar items no comboBox
 *  Talvez uma implementação para buscar opções em um banco de dados
 *  pode ser implementada depois.
 */
function AddItemsToCombo() {
    let option1 = new comboOption(1, "X-Vegetariano", 25.00, "1 X-Vegetariano e 1 Coca-Cola 350mL");
    let option2 = new comboOption(2, "X-Casal", 40.00, "2 X-Burguer e 1 Coca-Cola 2l");
    let option3 = new comboOption(3, "X-Bacon", 50.00, "1 X-Bacon, 1 porção pequena de Batata Frita e 1 Coca-Cola 350mL");

    comboOptions.push(option1, option2, option3);
    comboOptions.forEach(function (e, i) {
        //https://www.w3schools.com/jsref/met_select_add.asp
        let option = document.createElement("option");
        option.text = e.name;
        option.id = e.id;
        comboBox.add(option, i);
    })
}

/**
 * Tabela de preços
 * Talvez implementar um GET de um banco de dados?
 */
function PriceTable(checkbox) {
    if (checkbox.id === "bacon") return 3;
    if (checkbox.id === "cheddar") return 5.5;
    if (checkbox.id === "picles") return 2;
    return 0; //Para caso dê algum problema e não ache valor
}

function GetDescriptionFromCheckbox(checkbox) {
    if (checkbox.id === "bacon") return "+ Bacon";
    if (checkbox.id === "cheddar") return "+ Cheddar";
    if (checkbox.id === "picles") return "+ Picles";
}

/**
 * Realmente preciso aprender JQuery...
 */
function GetOptionOfCombo() {
    return comboBox[comboBox.selectedIndex];
}

/**
 * Calcula o preço pegando os items selecionados.
 */
function CalculatePrice() {
    if (comboBox.value !== null || comboBox.value !== undefined) {
        let price = GetPriceFromComboBox();
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

        checkboxes.forEach((e) => {
            price += PriceTable(e);
        })

        let final = parseFloat(price).toFixed(2)
        Number(final).toLocaleString();
        outputPrice.value =   `R$ ${final}`;
    }
}

function GetPriceFromComboBox() {
    for (var combo of comboOptions) {
        if (combo.id === Number(GetOptionOfCombo().id)) {
            return combo.price;
        }
    }
}

function GetDescriptionFromComboBox() {
    for (var combo of comboOptions) {
        if (combo.id === Number(GetOptionOfCombo().id)) {
            return combo.description;
        }
    }
}

function GetDeliveryDescription(delivery) {
    if (delivery.id === "viagem") return "Para viagem."
    if (delivery.id === "balcao") return "Retirada no Balcão."
}

function UpdateDescription() {
    if (comboBox.value !== null || comboBox.value !== undefined) {
        let description = GetDescriptionFromComboBox();
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

        checkboxes.forEach((e) => {
            description += `\n ${GetDescriptionFromCheckbox(e)}`;
        })

        deliveryOption = document.querySelector('input[name="entrega"]:checked');
        description += `\n${GetDeliveryDescription(deliveryOption)}`

        outputDescription.value = description;
    }
}

/** Função pega o tempo atual e coloca no header. */
function GetTime() {
    var today = new Date();
    timer.textContent = today.toLocaleTimeString();
}

GetTime();
setInterval(GetTime, 1000);
AddItemsToCombo();