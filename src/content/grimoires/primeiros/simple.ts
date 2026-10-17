import type { SimpleSection } from '@/content/types';

// Versão "do zero" das seções do grimório O Primeiro Pergaminho (grim.primeiros).
// Usa apenas fatos do texto de cada seção.

export const simplePrimeiros: Record<string, SimpleSection> = {
  'cap.prim.01:computador': {
    pages: [
      { title: 'Para que serve isso?', text: 'No Tribunal, quase todo trabalho passa por um computador: contratos, planilhas, relatórios. Entender como a máquina funciona ajuda você a usar melhor as ferramentas e a acompanhar o resto do estudo.' },
      { title: 'As quatro tarefas', text: 'O computador faz quatro coisas. Ele recebe informação, trabalha com ela, guarda o que precisa e mostra o resultado. Pense em uma cozinha: chegam os ingredientes, a cozinheira prepara, a geladeira guarda e o prato vai para a mesa.' },
      { title: 'Entrada e saída', text: '**Entrada** é por onde a informação chega, como o teclado e o mouse. **Saída** é por onde o resultado sai, como a tela e a impressora. Exemplo: você digita 2 + 3 no teclado, e a tela mostra 5.' },
      { title: 'Quem faz as contas?', text: 'O **processador**, também chamado de **CPU**, é a peça que faz as contas e toma as decisões. Ele é o cérebro da máquina. A **memória** é onde a informação fica guardada enquanto é usada ou por muito tempo.' },
      { title: 'Zeros e uns', text: 'Por dentro, o computador só entende ligado ou desligado. Escrevemos isso como 1 ou 0. Cada sinal desses é um **bit**. Um grupo de 8 bits forma um **byte**, que basta para guardar uma letra, como "A".' },
      { title: 'Tamanhos de arquivo', text: 'Os tamanhos crescem em degraus. Um **quilobyte** (KB) é cerca de mil bytes, um texto curto. Um **megabyte** (MB) é cerca de um milhão, uma foto. Um **gigabyte** (GB) é cerca de um bilhão, um filme.' },
      { title: 'Resumindo', text: 'O computador recebe, processa, guarda e mostra. A CPU faz as contas. Tudo vira bits, e 8 bits formam um byte.' },
    ],
    words: [
      { term: 'Entrada', meaning: 'Caminho por onde a informação entra no computador, como o teclado.' },
      { term: 'Saída', meaning: 'Caminho por onde o resultado sai, como a tela ou a impressora.' },
      { term: 'CPU', meaning: 'O processador: a peça que faz as contas.' },
      { term: 'Bit', meaning: 'O menor pedaço de informação: vale 0 ou 1.' },
      { term: 'Byte', meaning: 'Um grupo de 8 bits.' },
    ],
    checks: [
      { statement: 'O teclado é um dispositivo de entrada.', answer: true, why: 'Ele leva a informação para dentro do computador.' },
      { statement: 'A impressora faz as contas do computador.', answer: false, why: 'Quem faz as contas é a CPU; a impressora é saída.' },
      { statement: 'Um byte tem 8 bits.', answer: true, why: 'É assim que se conta em toda a computação.' },
    ],
  },

  'cap.prim.01:hardware': {
    pages: [
      { title: 'Para que serve isso?', text: 'Quando um técnico diz que o problema "é de hardware" ou "é de software", ele está dizendo onde está o defeito. Saber a diferença ajuda você a explicar o problema e entender a solução.' },
      { title: 'O que é hardware?', text: '**Hardware** é a parte física do computador. É tudo o que você pode tocar: a tela, o teclado, os cabos, o processador. Se cai no chão e quebra, é hardware.' },
      { title: 'A mesa de trabalho', text: 'A **memória RAM** é como a mesa onde você abre o processo para ler. Ela é rápida, mas apaga tudo quando o computador desliga. Por isso dizemos que ela é **volátil**.' },
      { title: 'O armário', text: 'O **armazenamento** é como um armário de arquivos. Ele guarda tudo mesmo com a máquina desligada. Pode ser um **HD**, um disco que gira, ou um **SSD**, que não tem partes móveis e é mais rápido.' },
      { title: 'O que é software?', text: '**Software** são as instruções que dizem ao hardware o que fazer. São os programas. O **sistema operacional**, como o Windows, cuida da máquina. Os **aplicativos**, como a planilha e o navegador, fazem as suas tarefas.' },
      { title: 'Os dois juntos', text: 'Um não funciona sem o outro. Pense em um piano e uma partitura. O piano é o hardware. A partitura é o software. A música só sai quando os dois trabalham juntos.' },
      { title: 'Resumindo', text: 'Hardware é o que você toca; software são as instruções. A RAM apaga ao desligar. HD e SSD guardam por muito tempo.' },
    ],
    words: [
      { term: 'Hardware', meaning: 'A parte física do computador, que você pode tocar.' },
      { term: 'Software', meaning: 'Os programas: instruções que dizem à máquina o que fazer.' },
      { term: 'Memória RAM', meaning: 'Memória rápida de trabalho que apaga ao desligar.' },
      { term: 'Volátil', meaning: 'Que perde o conteúdo quando a energia acaba.' },
      { term: 'SSD', meaning: 'Peça que guarda arquivos, sem partes móveis e rápida.' },
      { term: 'Aplicativo', meaning: 'Programa que faz uma tarefa sua, como uma planilha.' },
    ],
    checks: [
      { statement: 'O teclado é hardware.', answer: true, why: 'É uma peça física que você toca.' },
      { statement: 'A memória RAM guarda tudo mesmo com o computador desligado.', answer: false, why: 'A RAM apaga ao desligar; quem guarda é o HD ou o SSD.' },
      { statement: 'Uma planilha é um software.', answer: true, why: 'É um programa, ou seja, um conjunto de instruções.' },
    ],
  },

  'cap.prim.01:sistema': {
    pages: [
      { title: 'Para que serve isso?', text: 'Todo dia você salva, procura e abre arquivos no trabalho. Saber como o computador organiza essas coisas evita perder documentos e ajuda a fugir de arquivos perigosos.' },
      { title: 'O gerente da máquina', text: 'O **sistema operacional** é o programa que gerencia o computador. Ele divide a máquina entre os programas, organiza os arquivos e controla quem entra. Exemplos: Windows, Linux e macOS. No celular, Android e iOS.' },
      { title: 'Arquivos e pastas', text: 'Um **arquivo** é um conjunto de dados com um nome, como um contrato ou uma foto. Uma **pasta** agrupa arquivos, como uma pasta de papel na gaveta. Uma pasta pode ficar dentro de outra.' },
      { title: 'O final do nome', text: 'A **extensão** é o final do nome, depois do ponto. Ela diz o tipo do arquivo. Exemplos: ".pdf" é documento, ".xlsx" é planilha do Excel, ".jpg" é imagem e ".exe" é programa do Windows.' },
      { title: 'Cuidado com nomes', text: 'Trocar o final do nome não muda o que está dentro. Um programa renomeado para ".pdf" continua sendo programa. Golpistas usam esse truque para enganar.' },
      { title: 'Quem pode o quê?', text: 'O sistema guarda **permissões**: regras de quem pode **ler**, **alterar** ou **executar** cada arquivo. Exemplo: o servidor do setor de contratos pode alterar a planilha. O estagiário talvez só possa ler.' },
      { title: 'Resumindo', text: 'O sistema operacional gerencia a máquina e os arquivos. A extensão indica o tipo do arquivo. Permissões dizem quem pode ler, alterar ou executar.' },
    ],
    words: [
      { term: 'Sistema operacional', meaning: 'Programa que gerencia o computador, como Windows ou Linux.' },
      { term: 'Arquivo', meaning: 'Conjunto de dados guardado com um nome.' },
      { term: 'Pasta', meaning: 'Lugar que agrupa arquivos, também chamado de diretório.' },
      { term: 'Extensão', meaning: 'Final do nome do arquivo que indica o seu tipo.' },
      { term: 'Permissão', meaning: 'Regra que diz quem pode ler, alterar ou executar um arquivo.' },
    ],
    checks: [
      { statement: 'Linux é um sistema operacional.', answer: true, why: 'Ele gerencia o computador, como o Windows.' },
      { statement: 'Trocar ".exe" por ".pdf" transforma um programa em documento.', answer: false, why: 'A extensão é só o nome; o conteúdo não muda.' },
      { statement: 'Quem só pode ler um arquivo não pode alterá-lo.', answer: true, why: 'Alterar exige outra permissão.' },
    ],
  },

  'cap.prim.01:programacao': {
    pages: [
      { title: 'Para que serve isso?', text: 'Programas fazem em minutos o que levaria dias à mão, como conferir mil notas fiscais. Entender a lógica deles ajuda você a pedir, testar e avaliar sistemas no Tribunal.' },
      { title: 'A receita', text: 'Um **algoritmo** é uma lista de passos, em ordem, para resolver um problema. Uma receita de bolo é um algoritmo. Os passos precisam ser claros: "asse por 40 minutos" é melhor que "asse até ficar bom".' },
      { title: 'O que é um programa?', text: 'Um **programa** é um algoritmo escrito em uma **linguagem de programação**. A linguagem é um jeito de escrever que o computador consegue seguir. Exemplos: Python, Java e JavaScript.' },
      { title: 'O pote com etiqueta', text: 'Uma **variável** é um lugar na memória com um nome, onde o programa guarda um valor. É como um pote com etiqueta "açúcar". Exemplo: `valor = 1500` guarda 1500 no pote chamado valor. Depois, o conteúdo pode mudar.' },
      { title: 'O "se"', text: 'Uma **condição** faz o programa escolher um caminho. Exemplo: se estiver chovendo, leve o guarda-chuva; senão, leve o boné. No Tribunal: se o contrato passar do limite, marque para análise; senão, arquive.' },
      { title: 'Fazer de novo', text: 'Uma **repetição**, ou **laço**, repete passos. "Para cada nota, confira o valor" repete uma vez por nota. "Enquanto houver fila, atenda" repete até a fila acabar. Se a condição nunca acabar, o laço fica infinito.' },
      { title: 'Resumindo', text: 'Algoritmo é uma receita. Variável guarda um valor. Condição escolhe um caminho, e repetição faz o mesmo passo várias vezes.' },
    ],
    words: [
      { term: 'Algoritmo', meaning: 'Lista de passos em ordem para resolver um problema.' },
      { term: 'Programa', meaning: 'Algoritmo escrito em uma linguagem que o computador segue.' },
      { term: 'Variável', meaning: 'Pote com nome na memória, onde se guarda um valor.' },
      { term: 'Condição', meaning: 'Teste que faz o programa escolher um caminho: se ou senão.' },
      { term: 'Laço', meaning: 'Repetição de passos, uma vez por item ou enquanto algo valer.' },
      { term: 'Laço infinito', meaning: 'Repetição que nunca termina, porque a condição nunca fica falsa.' },
    ],
    checks: [
      { statement: 'Uma receita de bolo é um exemplo de algoritmo.', answer: true, why: 'Ela é uma lista de passos em ordem.' },
      { statement: 'O valor guardado em uma variável nunca muda.', answer: false, why: 'O nome fica, mas o valor pode ser trocado.' },
      { statement: 'A condição faz o programa escolher um caminho.', answer: true, why: 'É o "se... senão".' },
    ],
  },

  'cap.prim.02:redes': {
    pages: [
      { title: 'Para que serve isso?', text: 'Quando você abre um sistema do Tribunal ou manda um e-mail, a informação viaja por uma rede. Entender essa viagem ajuda a perceber por que algo fica lento, cai ou precisa de proteção.' },
      { title: 'O que é uma rede?', text: 'Uma **rede** é um grupo de computadores ligados para trocar informação. A **internet** é a rede gigante que liga redes do mundo inteiro.' },
      { title: 'O endereço da casa', text: 'Para uma carta chegar, ela precisa de endereço. Na rede, cada aparelho tem um **endereço IP**. Exemplo: 192.168.0.10, quatro números separados por pontos. Existe também o **IPv6**, um formato mais novo e mais longo.' },
      { title: 'O carteiro da esquina', text: 'O **roteador** é o aparelho que liga uma rede a outra e escolhe o caminho dos dados. O roteador da sua casa liga seus aparelhos à internet. Na internet, muitos roteadores passam a mensagem adiante até o destino.' },
      { title: 'Quem pede e quem atende', text: 'O **cliente** é quem pede, como seu celular abrindo uma página. O **servidor** é o computador que atende e entrega a resposta. É como no restaurante: você pede e a cozinha entrega o prato.' },
      { title: 'Nomes em vez de números', text: 'O **navegador**, como o Chrome, abre os sites. Você digita um nome, e o **DNS** traduz esse nome para o IP, como uma agenda telefônica. **Nuvem** é usar computadores de outra empresa pela internet, pagando pelo uso.' },
      { title: 'Resumindo', text: 'O IP é o endereço do aparelho. O roteador escolhe o caminho. O cliente pede, o servidor atende, e o DNS troca nome por número.' },
    ],
    words: [
      { term: 'Rede', meaning: 'Computadores ligados entre si para trocar informação.' },
      { term: 'Endereço IP', meaning: 'Número que identifica um aparelho na rede.' },
      { term: 'Roteador', meaning: 'Aparelho que liga redes e escolhe o caminho dos dados.' },
      { term: 'Cliente', meaning: 'Quem faz o pedido na rede, como seu navegador.' },
      { term: 'Servidor', meaning: 'Computador que atende os pedidos e entrega a resposta.' },
      { term: 'DNS', meaning: 'Serviço que troca o nome do site pelo endereço IP.' },
      { term: 'Nuvem', meaning: 'Usar computadores de outra empresa pela internet, pagando pelo uso.' },
    ],
    checks: [
      { statement: 'Cada aparelho na rede tem um endereço IP.', answer: true, why: 'É por esse endereço que os dados chegam ao lugar certo.' },
      { statement: 'O servidor é quem faz o pedido.', answer: false, why: 'Quem pede é o cliente; o servidor atende.' },
      { statement: 'O DNS funciona como uma agenda que troca nome por número.', answer: true, why: 'Ele traduz o nome do site para o IP.' },
    ],
  },

  'cap.prim.02:dados': {
    pages: [
      { title: 'Para que serve isso?', text: 'O Tribunal guarda milhares de contratos, pagamentos e fornecedores. Para achar e conferir essas informações, elas precisam estar bem organizadas. É isso que um banco de dados faz.' },
      { title: 'Dado e informação', text: 'Um **dado** é um registro solto, como "1500" ou "Maria". A **informação** aparece quando o dado ganha sentido: "Maria recebeu R$ 1.500 em 10/03/2026".' },
      { title: 'O arquivo organizado', text: 'Um **banco de dados** é um conjunto de dados guardados em ordem, como um grande arquivo de fichas. O programa que cuida dele se chama **SGBD**. Exemplos: PostgreSQL e MySQL.' },
      { title: 'Tabela, linha e coluna', text: 'Os dados ficam em **tabelas**, parecidas com uma planilha. Cada **coluna** é uma característica, como nome ou cidade. Cada **linha** é um registro completo. Exemplo: na tabela Fornecedores, uma linha é um fornecedor com seu CNPJ, nome e cidade.' },
      { title: 'A identidade do registro', text: 'A **chave primária** é a coluna que identifica cada linha sem repetir. É como o CPF de uma pessoa. Na tabela Fornecedores, o CNPJ pode ser a chave primária.' },
      { title: 'Ligando tabelas', text: 'A **chave estrangeira** é uma coluna que aponta para a chave de outra tabela. Na tabela Contratos, o CNPJ do fornecedor liga cada contrato ao fornecedor certo. Para conversar com o banco, usamos uma linguagem chamada **SQL**.' },
      { title: 'Resumindo', text: 'Tabelas têm colunas e linhas. A chave primária não se repete. A chave estrangeira liga uma tabela a outra.' },
    ],
    words: [
      { term: 'Banco de dados', meaning: 'Conjunto de dados guardados de forma organizada.' },
      { term: 'SGBD', meaning: 'Programa que cuida do banco de dados.' },
      { term: 'Tabela', meaning: 'Quadro com linhas e colunas sobre um assunto.' },
      { term: 'Linha', meaning: 'Um registro completo, como um fornecedor.' },
      { term: 'Coluna', meaning: 'Uma característica do registro, como o nome ou a cidade.' },
      { term: 'Chave primária', meaning: 'Coluna que identifica cada linha sem repetir, como um CPF.' },
      { term: 'Chave estrangeira', meaning: 'Coluna que aponta para a chave de outra tabela.' },
    ],
    checks: [
      { statement: 'Em uma tabela, cada linha é um registro completo.', answer: true, why: 'Uma linha reúne todas as características de um item.' },
      { statement: 'Duas linhas podem ter a mesma chave primária.', answer: false, why: 'A chave primária nunca se repete.' },
      { statement: 'A chave estrangeira liga uma tabela a outra.', answer: true, why: 'Ela aponta para a chave de outra tabela.' },
    ],
  },

  'cap.prim.02:seguranca': {
    pages: [
      { title: 'Para que serve isso?', text: 'Um órgão público guarda dados de pessoas e de dinheiro público. Um vazamento expõe pessoas. Um dado mudado pode esconder uma fraude. Um sistema fora do ar paralisa o atendimento. Segurança evita tudo isso.' },
      { title: 'Os três pilares', text: 'A segurança da informação tem três ideias, a sigla **CID**. **Confidencialidade**: só quem pode vê. **Integridade**: ninguém muda sem autorização. **Disponibilidade**: a informação está lá quando você precisa.' },
      { title: 'Um exemplo de cada', text: 'O salário de um servidor não deve aparecer para qualquer um: confidencialidade. O valor de um contrato não pode ser trocado às escondidas: integridade. O sistema de processos precisa estar no ar no expediente: disponibilidade.' },
      { title: 'Senha forte', text: 'Uma boa **senha** é longa e mistura letras, números e símbolos. Não use sua data de nascimento. Melhor ainda é a **autenticação em dois fatores**: além da senha, o sistema pede outra prova, como um código no celular.' },
      { title: 'A cópia de segurança', text: '**Backup** é uma cópia dos dados guardada em outro lugar. Se um disco queima ou um arquivo é apagado por engano, você recupera pela cópia. Um backup só ajuda se for recente e testado.' },
      { title: 'A isca', text: '**Phishing** é o golpe em que o criminoso finge ser alguém confiável para pegar sua senha. Chega por e-mail, mensagem ou site falso. Desconfie de urgência, remetente estranho e links esquisitos. Na dúvida, não clique.' },
      { title: 'Resumindo', text: 'Confidencialidade é quem vê, integridade é se mudou, disponibilidade é se está lá. Use senha forte, faça backup e desconfie de mensagens urgentes.' },
    ],
    words: [
      { term: 'Confidencialidade', meaning: 'Só quem tem autorização pode ver a informação.' },
      { term: 'Integridade', meaning: 'A informação não foi alterada sem autorização.' },
      { term: 'Disponibilidade', meaning: 'A informação está acessível quando quem tem direito precisa.' },
      { term: 'Dois fatores', meaning: 'Pedir, além da senha, outra prova, como um código no celular.' },
      { term: 'Backup', meaning: 'Cópia dos dados guardada em outro lugar.' },
      { term: 'Phishing', meaning: 'Golpe em que alguém finge ser confiável para roubar seus dados.' },
    ],
    checks: [
      { statement: 'Integridade quer dizer que a informação não foi mudada sem autorização.', answer: true, why: 'É o pilar que trata de alterações.' },
      { statement: 'Usar a data de nascimento como senha é seguro.', answer: false, why: 'É um dado fácil de adivinhar.' },
      { statement: 'Phishing é um golpe que tenta roubar sua senha.', answer: true, why: 'O criminoso finge ser alguém confiável.' },
    ],
  },
};
