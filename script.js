document.addEventListener("DOMContentLoaded", carregarSonhos);

function adicionarSonho() {
  var sonho = document.getElementById("sonho").value;
  var prazo = document.getElementById("prazo").value;

  if (sonho === "" || prazo === "") {
    alert("Preencha todos os campos!");
    return;
  }

  var sonhos = JSON.parse(localStorage.getItem("sonhos")) || [];

  sonhos.push({ sonho: sonho, prazo: prazo, concluido: false });

  localStorage.setItem("sonhos", JSON.stringify(sonhos));

  document.getElementById("sonho").value = "";
  document.getElementById("prazo").value = "";

  carregarSonhos();
}

function carregarSonhos() {
  var tabela = document.getElementById("tabelaSonhos");

  // limpa tudo menos o cabeçalho
  tabela.innerHTML = `
    <tr>
      <th>Sonho</th>
      <th>Prazo</th>
      <th>Status</th>
      <th>Ações</th>
    </tr>
  `;

  var sonhos = JSON.parse(localStorage.getItem("sonhos")) || [];

  sonhos.forEach((item, index) => {
    var novaLinha = tabela.insertRow(-1);

    var col1 = novaLinha.insertCell(0);
    var col2 = novaLinha.insertCell(1);
    var col3 = novaLinha.insertCell(2);
    var col4 = novaLinha.insertCell(3);

    col1.innerText = item.sonho;
    col2.innerText = item.prazo;
    col3.innerText = item.concluido ? "✔ Concluído" : "Em andamento";

    if (item.concluido) {
      novaLinha.style.textDecoration = "line-through";
      novaLinha.style.opacity = "0.6";
    }

    // Botão Concluir
    var btnConcluir = document.createElement("button");
    btnConcluir.innerText = "Concluir";
    btnConcluir.onclick = function () {
      sonhos[index].concluido = !sonhos[index].concluido;
      localStorage.setItem("sonhos", JSON.stringify(sonhos));
      carregarSonhos();
    };

    // Botão Editar
    var btnEditar = document.createElement("button");
    btnEditar.innerText = "Editar";
    btnEditar.onclick = function () {
      var novoSonho = prompt("Editar sonho:", item.sonho);
      var novoPrazo = prompt("Editar prazo:", item.prazo);

      if (novoSonho && novoPrazo) {
        sonhos[index].sonho = novoSonho;
        sonhos[index].prazo = novoPrazo;
        localStorage.setItem("sonhos", JSON.stringify(sonhos));
        carregarSonhos();
      }
    };

    // Botão Excluir
    var btnExcluir = document.createElement("button");
    btnExcluir.innerText = "Excluir";
    btnExcluir.onclick = function () {
      sonhos.splice(index, 1);
      localStorage.setItem("sonhos", JSON.stringify(sonhos));
      carregarSonhos();
    };

    col4.appendChild(btnConcluir);
    col4.appendChild(btnEditar);
    col4.appendChild(btnExcluir);
  });
}