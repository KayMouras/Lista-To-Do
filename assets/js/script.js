const inputTarefa = document.getElementById("tarefa-input");
const btnAdd = document.getElementById("add-btn");
const lista = document.getElementById("lista-tarefas");


const somAdd = new Audio("add.mp3"); 
const somDelete = new Audio("delete.mp3"); 


let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


function renderizarTarefas() {
  lista.innerHTML = "";
  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;

    if(tarefa.completa) li.classList.add("completed");

    
    const btnDeletar = document.createElement("button");
    btnDeletar.textContent = "❌";
    btnDeletar.addEventListener("click", () => {
      tarefas.splice(index, 1);
      salvarTarefas();
      somDelete.play();
      renderizarTarefas();
    });

    
    li.addEventListener("click", () => {
      tarefas[index].completa = !tarefas[index].completa;
      salvarTarefas();
      renderizarTarefas();
    });

    li.appendChild(btnDeletar);
    lista.appendChild(li);

    
    setTimeout(() => li.classList.add("fade-in"), 10);
  });
}


function adicionarTarefa() {
  const texto = inputTarefa.value.trim();
  if (texto === "") return;

  tarefas.push({ texto: texto, completa: false });
  salvarTarefas();
  renderizarTarefas();
  somAdd.play();
  inputTarefa.value = "";
}


btnAdd.addEventListener("click", adicionarTarefa);
inputTarefa.addEventListener("keydown", (e) => {
  if (e.key === "Enter") adicionarTarefa();
});

renderizarTarefas();

const themeBtn = document.getElementById("theme-btn");


if(localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    
    if(document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("dark-mode", "true");
    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("dark-mode", "false");
    }
});
