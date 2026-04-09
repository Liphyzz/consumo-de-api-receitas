// Importa prompt-sync para ler a entrada do usuário
const prompt = require("prompt-sync")();

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

function mostrarUnico(dados) {
    console.clear();
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

async function procurarReceitas() {
    while (true) {
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
                const categoria = prompt("Selecione a categoria que deseja buscar \n(doce, salgado, agridoce)\n\nR:").trim().toLowerCase();
                
                if (!['doce', 'salgado', 'agridoce'].includes(categoria)) {
                    console.log("Categoria inválida!");
                    prompt("Pressione Enter para continuar...");
                    continue;
                }

                url = `https://api-receitas-pi.vercel.app/receitas/categoria/${categoria}`;
                break;
            
            case "4":
                console.log("Saindo...");
                return;

            default:
                console.clear();
                console.log("Opção inválida! Por favor, escolha uma opção válida.\n");
                continue;
        }

        try {
            const resposta = await fetch(url);
            if (!resposta.ok) {
                throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
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

procurarReceitas();