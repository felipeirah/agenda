let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
let contatoAtual = -1;
let emEdicao = false;

function atualizarFormulario() {
    if (contatoAtual >= 0 && contatoAtual < contatos.length) {
        document.getElementById('nome').value = contatos[contatoAtual].nome;
        document.getElementById('sobrenome').value = contatos[contatoAtual].sobrenome;
        document.getElementById('endereco').value = contatos[contatoAtual].endereco;
        document.getElementById('telefone').value = contatos[contatoAtual].telefone;
    } else {
        document.getElementById('nome').value = '';
        document.getElementById('sobrenome').value = '';
        document.getElementById('endereco').value = '';
        document.getElementById('telefone').value = '';
    }
}

function incluirContato() {
    if (emEdicao) return;

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;

    if (nome && sobrenome && endereco && telefone) {
        contatos.push({ nome, sobrenome, endereco, telefone });
        salvarContatos();
        contatoAtual = contatos.length - 1;
        atualizarFormulario();
    }
}

function editarContato() {
    if (contatoAtual < 0 || contatoAtual >= contatos.length) return;

    emEdicao = true;
}

function salvarContato() {
    if (!emEdicao) return;

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;

    if (nome && sobrenome && endereco && telefone) {
        contatos[contatoAtual] = { nome, sobrenome, endereco, telefone };
        salvarContatos();
        emEdicao = false;
    }
}

function cancelarEdicao() {
    emEdicao = false;
    atualizarFormulario();
}

function excluirContato() {
    if (contatoAtual < 0 || contatoAtual >= contatos.length) return;

    contatos.splice(contatoAtual, 1);
    salvarContatos();
    contatoAtual = contatos.length > 0 ? Math.min(contatoAtual, contatos.length - 1) : -1;
    atualizarFormulario();
}

function navegarParaPrimeiro() {
    if (contatos.length > 0) {
        contatoAtual = 0;
        atualizarFormulario();
    }
}

function navegarParaAnterior() {
    if (contatoAtual > 0) {
        contatoAtual--;
        atualizarFormulario();
    }
}

function navegarParaProximo() {
    if (contatoAtual < contatos.length - 1) {
        contatoAtual++;
        atualizarFormulario();
    }
}

function navegarParaUltimo() {
    if (contatos.length > 0) {
        contatoAtual = contatos.length - 1;
        atualizarFormulario();
    }
}

function salvarContatos() {
    localStorage.setItem('contatos', JSON.stringify(contatos));
}

document.addEventListener("DOMContentLoaded", atualizarFormulario);
