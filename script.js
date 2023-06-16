const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const suggestionsContainer = document.getElementById("suggestions-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click",function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function initApp(category) {
    document.getElementById('selection-menu').style.display = 'none';
    document.querySelector('.todo-app').style.display = 'block';
    document.querySelector('.todo-app h2').innerText = category.charAt(0).toUpperCase() + category.slice(1) + ' List';
    
    let suggestions = [];
    switch (category) {
        case 'supermercado':
            suggestions = ['Arroz', 'Feijão', 'Carne', 'Leite', 'Pão', 'Ovos'];
            break;
        case 'farmacia':
            suggestions = ['Paracetamol', 'Band-aid', 'Antigripal', 'Antialérgico', 'Protetor solar', 'Creme dental'];
            break;
        case 'viagem':
            suggestions = ['Passaporte', 'Carregador', 'Roupas', 'Produtos de higiene', 'Snacks', 'Mapa/localizador'];
            break;
        case 'shopping':
            suggestions = ['Roupas', 'Sapatos', 'Acessórios', 'Perfume', 'Eletrônicos', 'Livros'];
            break;
        default:
            break;
    }

    suggestionsContainer.innerHTML = ''; // Limpar sugestões antigas.
    for (let i = 0; i < suggestions.length; i++) {
        let btn = document.createElement('button');
        btn.innerText = suggestions[i];
        btn.onclick = function() {
            inputBox.value = suggestions[i];
            addTask();
        };
        suggestionsContainer.appendChild(btn);
    }
}


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    suggestionsContainer.innerHTML = '';
}

showTask();
