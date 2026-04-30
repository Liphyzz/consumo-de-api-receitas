// Importa prompt-sync para ler a entrada do usuário
const prompt = require("prompt-sync")();

// Função para mostrar lista de receitas (primeiramente ela limpa a tela, então printa o título (RESULTADOS DA BUSCA) e inicia um laço forEach, onde para cada item da lista de receitas, ele vai printar no console cada informação de cada item/receita)
function mostrarLista(lista) {
    console.clear();
    console.log("=========================");
    console.log("   RESULTADOS DA BUSCA");
    console.log("=========================\n");

    lista.forEach((items) => {
        console.log(
          "----------------------------------------------------------------------------------------------------------------------------------\n",
        );
        console.log(`ID: ${items.id}\n`);
        console.log(`NOME: ${items.receita}\n`);
        console.log(`INGREDIENTES: ${items.ingredientes}\n`);
        console.log(`MODO DE PREPARO: ${items.modo_preparo}\n`);
        console.log(`LINK DA IMAGEM: ${items.link_imagem}\n`);
        console.log(`CATEGORIA: ${items.tipo}\n`);
        console.log(`DATA DE CRIAÇÃO: ${items.created_at}\n`);
    });
    console.log(
      "----------------------------------------------------------------------------------------------------------------------------------\n",
    );
}

// Função para mostrar uma única receita (essa função se assemelha muito com a de mostrar a lista de receitas, porém, sem o forEach, já que essa função servirá para pegar o da do de uma única receita pelo id)
function mostrarUnico(dados) {
    console.clear(); // limpa o console
    console.log("=========================");
    console.log("   RESULTADOS DA BUSCA");
    console.log("=========================\n");

    console.log(
      "----------------------------------------------------------------------------------------------------------------------------------\n",
    );
    console.log(`ID: ${dados.id}\n`);
    console.log(`NOME: ${dados.receita}\n`);
    console.log(`INGREDIENTES: ${dados.ingredientes}\n`);
    console.log(`MODO DE PREPARO: ${dados.modo_preparo}\n`);
    console.log(`LINK DA IMAGEM: ${dados.link_imagem}\n`);
    console.log(`CATEGORIA: ${dados.tipo}\n`);
    console.log(`DATA DE CRIAÇÃO: ${dados.created_at}\n`);
    console.log(
      "----------------------------------------------------------------------------------------------------------------------------------\n",
    );
}

// Função principal (main), que é assíncrona para impedir que o body retorne promisse (promessa de resposta, pois não deu tempo de consultar e pegar as coisas da api antes do código seguir em frente)
async function procurarReceitas() {
    while (true) { // loop para sempre retornar ao menu
        // MENU
        console.clear();
        console.log("=========================");
        console.log("    BUSCA DE RECEITAS");
        console.log("=========================\n");
        console.log("1. Buscar todas as receitas");
        console.log("2. Buscar por ID ");
        console.log("3. Buscar por categoria");
        console.log("4. Sair\n");
        
        let url;
        const opcao = prompt("Escolha uma opção: ").trim();

        // switch case para identificar a opção que o usuário digitar e: 
        // caso digite 1: define a url para buscar todas as receitas (no caso coloquei máx. 10 apenas);
        // caso digite 2: pergunta o ID de receita desejado, faz a verificação de validade e define a url para buscar a receita que contém aaquele ID;
        // caso digite 3: pergunta a categoria que deseja buscar, verifica a validade da resposta e se estiver tudo certo define a url para buscar todas as receitas da categoria selecionada pelo usuário;
        // caso digite 4: encerra o loop principal, e com isso, para o programa;
        // caso digite qualquer outra coisa: avisa que a opção é inválida e volta ao início do loop.
        switch (opcao) {
            case "1":
                url =  "https://api-receitas-pi.vercel.app/receitas/todas?page=1&limit=10";
                break;

            case "2":
                const id = parseInt(prompt("Digite o ID da receita: ").trim());

                if (isNaN(id)) {
                    console.log("ID inválido!");
                    prompt("Pressione Enter para continuar...");
                    continue;
                }

                url = `https://api-receitas-pi.vercel.app/receitas/${id}`;
                break;

            case "3":
                console.log("Selecione a categoria que deseja buscar \n(doce, salgado, agridoce)\n\n")

                const categoria = prompt("R: ").trim().toLowerCase();
                
                if (!['doce', 'salgado', 'agridoce'].includes(categoria)) {
                    console.log("Categoria inválida!");
                    prompt("Pressione Enter para continuar...");
                    continue;
                }

                url = `https://api-receitas-pi.vercel.app/receitas/tipo/${categoria}`;
                break;
            
            case "4":
                console.log("Saindo...");
                return;

            default:
                console.clear();
                console.log("Opção inválida! Por favor, escolha uma opção válida.\n");
                continue;
        }

        // tenta buscar os dados e exibílos, caso der qualquer erro, avisa o erro e volta para o início do loop
        try {
            const resposta = await fetch(url);
            if (!resposta.ok) {
                throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`); // tipo o raise ValueError (retorna um erro para o except)
            }
            const dados = await resposta.json();

            if (Array.isArray(dados)) {
              mostrarLista(dados);

            } else if (Array.isArray(dados.items)) {
              mostrarLista(dados.items);

            } else {
              mostrarUnico(dados);
            }

            prompt("Pressione Enter para continuar...");
            
        } catch (error) {
            console.error("Erro ao buscar receitas:", error.message);
            prompt("Pressione Enter para continuar...");
        }
    }
}

procurarReceitas(); // para executar a função principal (procurarReceitas())