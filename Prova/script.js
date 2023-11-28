// Obtém uma referência à lista de tarefas (ul)
let listaTarefa = document.getElementById('listaTarefas');
// Obtém uma referência ao campo de entrada de texto
const inputTarefa = document.getElementById('tarefaInput');

function adicionarTarefa() {
    if (inputTarefa.value.trim() !== ''){
        // Obtém o texto do campo de entrada
        const texto = inputTarefa.value;

        // Cria um novo elemento <li> para representar a nova tarefa
        let novaTarefa = document.createElement('li');

        // Criação dos botões dentro do parágrafo
        novaTarefa.innerHTML = `
            <p>${texto}</p>
            <button class = 'BotaoTask RemoverTask' onclick='removerTarefa(this)'>Excluir</button>
            <button class = 'BotaoTask ConcluirTask' onclick='ConcluirTarefa(this)'>Concluir</button>
            <button class = 'BotaoTask EditarTask' onclick='EditarTarefa(this)'>Editar</button>
        `;

        // Adiciona o novo elemento <li> à lista de tarefas (listaTarefa)
        listaTarefa.appendChild(novaTarefa);

        // Limpa o campo de entrada, definindo seu valor como uma string vazia
        inputTarefa.value = '';
    }
}

function removerTarefa(button){
    listaTarefa.removeChild(button.parentElement);
}

function ConcluirTarefa(button){
    // Encontre o elemento pai do botão (que é o elemento <li> representando a tarefa)
    const tarefa = button.parentElement;

    // Encontre o elemento <p> dentro da tarefa
    const paragrafo = tarefa.querySelector('p');

    // Definir a cor do texto do parágrafo como verde
    paragrafo.style.color = 'white';

    paragrafo.style.backgroundColor  = 'green';

    // Esconder os botões "Concluir" e "Editar"
    const botoes = tarefa.querySelectorAll('.BotaoTask');
    botoes.forEach(botao => {
        if (!botao.classList.contains('RemoverTask')) {
            botao.style.display = 'none';
        } else {
            // Adicionar propriedades de raio à direita ao botão "Excluir"
            botao.style.borderBottomRightRadius = '7px';
            botao.style.borderTopRightRadius = '7px';
        }
    });
    
    // Você pode querer desabilitar o botão "Concluir" após marcar a tarefa como concluída
    button.disabled = true;
}

function EditarTarefa(button) {
    const tarefa = button.parentElement;
    const paragrafo = tarefa.querySelector('p');

    // Salva o texto original do parágrafo
    const textoOriginal = paragrafo.textContent;

    // Substituir o texto do botão "Editar" para "Salvar"
    button.textContent = 'Salvar';

    button.onclick = function () {
        // Atualizar o texto do parágrafo com o valor da caixa de texto
        paragrafo.textContent = inputEdicao.value;

        // Restaurar o texto original do botão "Editar"
        button.textContent = 'Editar';

        // Remover a caixa de texto e o botão "Salvar"
        inputEdicao.remove();
        button.onclick = function() { EditarTarefa(button); }; // Restaurar o comportamento original do botão

        // Exibir novamente o parágrafo e outros botões
        paragrafo.style.display = 'inline';
        const outrosBotoes = tarefa.querySelectorAll('button:not(.EditarTask)');
        outrosBotoes.forEach(botao => {
            botao.style.display = 'inline';
        });
    };

    // Esconder o parágrafo e outros botões
    paragrafo.style.display = 'none';
    const outrosBotoes = tarefa.querySelectorAll('button:not(.EditarTask)');
    outrosBotoes.forEach(botao => {
        botao.style.display = 'none';
    });

    // Criar a caixa de texto
    const inputEdicao = document.createElement('input');
    inputEdicao.type = 'text';
    inputEdicao.value = textoOriginal; // Preencher a caixa de texto com o texto original
    inputEdicao.style.width = 'calc(100% - 10px)'; // Ajustar a largura para compensar a margem
    inputEdicao.style.height = (button.offsetHeight - 6) + 'px'; // Ajustar a altura para ser um pouco menor que a altura do botão "Salvar"
    inputEdicao.style.border = '2px solid #ccc';
    inputEdicao.style.borderBottomLeftRadius = '7px';
    inputEdicao.style.borderTopLeftRadius = '7px';
    inputEdicao.style.fontFamily = window.getComputedStyle(paragrafo).fontFamily; // Definir a fonte igual à do parágrafo
    inputEdicao.style.fontSize = window.getComputedStyle(paragrafo).fontSize; // Definir o tamanho da fonte igual ao do parágrafo

    // Adicionar a caixa de texto e o botão "Salvar"
    tarefa.appendChild(inputEdicao);
    tarefa.appendChild(button);
}












