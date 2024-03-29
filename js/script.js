class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }

  salvar() {
    let produto = this.lerDados();

    if (this.validaCampos(produto)) {
      if (this.editId == null) {
        this.adicionar(produto);
      } else {
        this.atualizar(this.editId, produto);
      }
    }

    this.listaTabela();
    this.cancelar();
  }

  listaTabela() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_produto = tr.insertCell();
      let td_preco = tr.insertCell();
      let td_imagem = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_id.innerText = this.arrayProdutos[i].id;
      td_produto.innerText = this.arrayProdutos[i].nomeProduto;
      td_preco.innerText = this.arrayProdutos[i].precoProduto;
      td_imagem.innerText = this.arrayProdutos[i].imagemDoProduto;

      td_id.classList.add("center");
      td_acoes.classList.add("center");

      let imgEdit = document.createElement("img");
      imgEdit.src = "img/editar.svg";
      imgEdit.setAttribute(
        "onClick",
        "produto.edicao(" + JSON.stringify(this.arrayProdutos[i]) + ")"
      );

      let imgDelete = document.createElement("img");
      imgDelete.src = "img/delete.svg";
      imgDelete.setAttribute(
        "onClick",
        "produto.deletar(" + this.arrayProdutos[i].id + ")"
      );

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDelete);
    }
  }

  atualizar(id, produto) {
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id == id) {
        this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
        this.arrayProdutos[i].precoProduto = produto.precoProduto;
        this.arrayProdutos[i].imagemDoProduto = produto.imagemDoProduto;
      }
    }
    this.editId = null;
  }

  edicao(dados) {
    this.editId = dados.id;

    document.getElementById("produto").value = dados.nomeProduto;
    document.getElementById("preco").value = dados.precoProduto;

    document.getElementById("SalvarOuEditar").innerText = "Atualizar";
  }

  lerDados() {
    let produto = {};

    produto.id = this.id;
    produto.nomeProduto = document.getElementById("produto").value;
    produto.precoProduto = document.getElementById("preco").value;
    produto.imagemDoProduto = document.getElementById("imagem").value;

    return produto;
  }

  adicionar(produto) {
    produto.preco = parseFloat(produto.preco);
    this.arrayProdutos.push(produto);
    this.id++;
  }

  validaCampos(produto) {
    let msg = "";

    if (produto.nomeProduto == "") {
      msg += "- Informe o nome do produto \n";
    }

    if (produto.precoProduto == "") {
      msg += "- Informe o preço do produto \n";
    }

    if (produto.imagemDoProduto == "") {
      msg += "- Envie a imagem do produto \n";
    }

    if (msg != "") {
      alert(msg);
      return false;
    }

    return true;
  }

  cancelar() {
    document.getElementById("produto").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("imagem").value = "";

    previewDefaultText.style.display = null;
    previewimage.style.display = null;
    previewimage.setAttribute("src", "");

    document.getElementById("SalvarOuEditar").innerText = "Salvar";
    this.editId == null;
    this.editId = null;
  }

  deletar(id) {
    if (confirm("Deseja Deletar o produto com ID " + id)) {
      let tbody = document.getElementById("tbody");

      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id == id) {
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }
  }
}

var produto = new Produto();
