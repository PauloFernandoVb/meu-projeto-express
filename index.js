const express = require('express');
const app = express();
let listaClientes=[];

//processando o formualario, ele pega os dados
app.use(express.urlencoded({ extended: true }));


app.get('/', (requisicao, resposta) => {
  resposta.send(`
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    <title>Página Inicial do Trabalho</title>
  </head>
  <body>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link" href="/">Menu principal</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="/cadastroClientes">Cadastro de Cliente</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/clientes">Clientes Cadastrados</a>
      </li>
    </ul>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" crossorigin="anonymous"></script>
  </body>
</html>
  `);
});

app.get('/cadastroClientes', (requisicao, resposta) => {
  resposta.send(`
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    <title>Cadastro de clientes</title>
  </head>
  <body>
    <div class="container w-80 mb-4 mt-4">
      <form method="POST" action="/cadastroClientes" class="border p-2">
        <fieldset>
          <legend class="text-center">Cadastro de Clientes</legend>
        </fieldset>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control" id="email" placeholder="Email" >
          </div>
          <div class="form-group col-md-6">
            <label for="senha">Senha</label>
            <input type="password" class="form-control" id="senha" placeholder="Senha">
          </div>
        </div>
        <div class="form-group">
          <label for="nome">Nome completo</label>
          <input type="text" name="nome" class="form-control" id="nome" placeholder="Nome completo" >
        </div>
        <div class="form-group">
          <label for="endereco">Endereço</label>
          <input type="text" class="form-control" id="endereco" placeholder="Rua dos Lobos, nº 90" name="endereco" >
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="cidade">Cidade</label>
            <input type="text" class="form-control" id="cidade" placeholder="Presidente Prudente" name="cidade">
          </div>
          <div class="form-group col-md-4">
            <label for="estado">Estado</label>
            <select id="estado" class="form-control" name="estado">
              <option value="">Escolher...</option>
                  <option>AC</option>
                  <option>AL</option>
                  <option>AP</option>
                  <option>AM</option>
                  <option>BA</option>
                  <option>CE</option>
                  <option>DF</option>
                  <option>ES</option>
                  <option>GO</option>
                  <option>MA</option>
                  <option>MT</option>
                  <option>MS</option>
                  <option>MG</option>
                  <option>PA</option>
                  <option>PB</option>
                  <option>PR</option>
                  <option>PE</option>
                  <option>PI</option>
                  <option>RJ</option>
                  <option>RN</option>
                  <option>RS</option>
                  <option>RO</option>
                  <option>RR</option>
                  <option>SC</option>
                  <option>SP</option>
                  <option>SE</option>
                  <option>TO</option>

            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="inputCEP">CEP</label>
            <input type="text" class="form-control" id="inputCEP" placeholder="99.999-99" name="cep">
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck">
            <label class="form-check-label" for="gridCheck">
              Aceito receber ligações
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Cadastrar</button>
        <a href="/" class="btn btn-secondary">Início</a>
      </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" crossorigin="anonymous"></script>
  </body>
</html>
  `);
});
app.post("/cadastroClientes", (requisicao, resposta) => {
  let email = requisicao.body.email;
  let nome = requisicao.body.nome;
  let endereco = requisicao.body.endereco;
  let cidade = requisicao.body.cidade;
  let estado = requisicao.body.estado;
  let cep = requisicao.body.cep;

  if (!email || !nome || !endereco || !cidade || !estado || !cep) {
    return resposta.send(`<p style="color:red; text-align:center;">Erro: Todos os campos devem ser preenchidos.</p><p style="text-align:center;"><a href="/cadastroClientes">Voltar ao formulário</a></p>`);
  }

  listaClientes.push({
    email: email,
    nome: nome,
    endereco: endereco,
    cidade: cidade,
    estado: estado,
    cep: cep
  });

  console.log("Lista atualizada:", listaClientes);
  resposta.redirect('/clientes');
});
app.get('/clientes', (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Clientes Cadastrados</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    </head>
    <body>
      <div class="container mt-5">
        <h2 class="mb-4 text-center">Clientes Cadastrados</h2>
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>CEP</th>
            </tr>
          </thead>
          <tbody>`;

  if (listaClientes.length === 0) {
    html += `
      <tr>
        <td colspan="6" class="text-center">Nenhum cliente cadastrado.</td>
      </tr>`;
  } else {
        for (let i = 0; i < listaClientes.length; i++) {
          let cliente = listaClientes[i];
          html += `
            <tr>
              <td>${cliente.nome}</td>
              <td>${cliente.email}</td>
              <td>${cliente.endereco}</td>
              <td>${cliente.cidade}</td>
              <td>${cliente.estado}</td>
              <td>${cliente.cep}</td>
            </tr>`;
            }
  }

  html += `
          </tbody>
        </table>
        <a href="/" class="btn btn-secondary">Voltar ao Início</a>
      </div>
    </body>
  </html>`;

  res.send(html);
});



const PORT = process.env.PORT || 4550;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
console.log("Servidor funcionando!");
