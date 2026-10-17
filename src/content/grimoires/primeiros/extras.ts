import type { SectionExtras } from '@/content/types';

// Cenas e atividades por seção do grimório O Primeiro Pergaminho (grim.primeiros).
// Conteúdo autoral; usa apenas fatos apresentados no texto de cada seção.

export const scenesPrimeiros: Record<string, SectionExtras> = {
  'cap.prim.01:computador': {
    scene: [
      { who: 'Aprendiz', text: 'Bubo, me deram uma mesa no Tribunal com uma dessas máquinas. Eu nunca entendi o que acontece lá dentro.' },
      { who: 'Bubo', text: 'Então começamos pelo começo. Toda máquina dessas faz só quatro coisas: recebe, trabalha, guarda e mostra.' },
      { who: 'Aprendiz', text: 'Só isso? Parece pouco para algo tão complicado.' },
      { who: 'Bubo', text: 'Pouco, mas feito muito rápido, com zeros e uns. Leia a página e me diga qual peça faz cada tarefa.' },
    ],
    truths: [
      { statement: 'O mouse é um dispositivo de entrada.', answer: true, why: 'O mouse leva informação para dentro do computador.' },
      { statement: 'A tela é um dispositivo de entrada.', answer: false, why: 'A tela mostra o resultado: é saída.' },
      { statement: 'Um bit vale 0 ou 1.', answer: true, why: 'O bit é a menor unidade de informação e só tem dois estados.' },
    ],
    blanks: [
      { sentence: 'A peça que faz as contas e toma as decisões é o ___.', options: ['processador', 'monitor', 'teclado', 'cabo'], answer: 'processador', why: 'O processador, ou CPU, é o "cérebro" do computador.' },
      { sentence: 'Um byte é formado por ___ bits.', options: ['8', '2', '10', '100'], answer: '8', why: 'Por convenção, um grupo de 8 bits forma um byte.' },
    ],
    outro: 'Entrada, processamento, memória e saída. Com essas quatro palavras, a máquina da sua mesa já não é um mistério.',
  },

  'cap.prim.01:hardware': {
    scene: [
      { who: 'Aprendiz', text: 'O técnico disse que o problema da minha máquina "não é de hardware, é de software". Fiquei sem saber se devia me preocupar.' },
      { who: 'Bubo', text: 'Hardware é o que você toca. Software é o que dá ordens a ele. Um é o piano, o outro é a partitura.' },
      { who: 'Aprendiz', text: 'E a tal memória que some quando desligo?' },
      { who: 'Bubo', text: 'Essa é a mesa de trabalho, não o armário. Leia e aprenda a distinguir os dois.' },
    ],
    truths: [
      { statement: 'O processador é hardware.', answer: true, why: 'É uma peça física do computador.' },
      { statement: 'A memória RAM guarda os arquivos depois que o computador desliga.', answer: false, why: 'A RAM é volátil; quem guarda depois de desligar é o HD ou o SSD.' },
      { statement: 'Um navegador de internet é um software aplicativo.', answer: true, why: 'Ele resolve uma tarefa do usuário: abrir páginas.' },
    ],
    blanks: [
      { sentence: 'A memória que apaga quando o computador desliga é a ___.', options: ['RAM', 'SSD', 'placa-mãe', 'impressora'], answer: 'RAM', why: 'A RAM é a memória de trabalho, rápida e volátil.' },
      { sentence: 'O sistema operacional é um software de ___.', options: ['sistema', 'entrada', 'saída', 'hardware'], answer: 'sistema', why: 'Ele cuida da própria máquina, por isso é software de sistema.' },
    ],
    outro: 'Agora você sabe separar a peça do programa. Quando o técnico falar de novo, você vai entender a conversa.',
  },

  'cap.prim.01:sistema': {
    scene: [
      { who: 'Arquivista', text: 'Aprendiz, alguém mandou um "relatorio.pdf.exe" para o setor. Abro?' },
      { who: 'Aprendiz', text: 'Tem "pdf" no nome, então deve ser um documento, não?' },
      { who: 'Bubo', text: 'Cuidado. O final do nome é o que conta, e um nome pode mentir. Antes de abrir qualquer coisa, entenda quem organiza os arquivos e as permissões.' },
      { who: 'Bubo', text: 'O gerente da máquina se chama sistema operacional. Leia e volte para decidir.' },
    ],
    truths: [
      { statement: 'Uma pasta pode ficar dentro de outra pasta.', answer: true, why: 'As pastas formam um caminho, como gavetas dentro de um armário.' },
      { statement: 'Renomear um arquivo de ".exe" para ".pdf" transforma o programa em documento.', answer: false, why: 'A extensão é só parte do nome; o conteúdo continua o mesmo.' },
      { statement: 'Quem só tem permissão de leitura pode alterar o arquivo.', answer: false, why: 'Alterar exige permissão de escrita.' },
    ],
    blanks: [
      { sentence: 'A extensão ___ costuma indicar uma planilha do Excel.', options: ['.xlsx', '.jpg', '.exe', '.pdf'], answer: '.xlsx', why: 'O texto lista .xlsx como planilha do Microsoft Excel.' },
      { sentence: 'Ler, gravar e executar são exemplos de ___ de um arquivo.', options: ['permissões', 'extensões', 'pastas', 'bytes'], answer: 'permissões', why: 'Permissões dizem quem pode fazer o quê com cada arquivo.' },
    ],
    outro: 'O arquivo suspeito foi para a quarentena sem ser aberto. O Arquivista agradece, e o setor continua em ordem.',
  },

  'cap.prim.01:programacao': {
    scene: [
      { who: 'Aprendiz', text: 'Bubo, me pediram para conferir mil notas fiscais à mão. Vou levar a semana inteira.' },
      { who: 'Bubo', text: 'Ou você escreve a receita uma vez e deixa a máquina repetir. Programar é isso: dar passos claros, em ordem.' },
      { who: 'Aprendiz', text: 'Mas eu nem sei o que é uma linguagem de programação.' },
      { who: 'Bubo', text: 'Você já sabe "se chover, leve o guarda-chuva". Comece por aí. Leia sobre variáveis, condições e repetições.' },
    ],
    truths: [
      { statement: 'Uma receita de bolo pode ser vista como um algoritmo.', answer: true, why: 'É uma sequência de passos em ordem, com um fim.' },
      { statement: 'O conteúdo de uma variável nunca pode mudar.', answer: false, why: 'O nome fica o mesmo, mas o valor guardado pode ser trocado.' },
      { statement: 'Um laço "enquanto" cuja condição nunca fica falsa não termina.', answer: true, why: 'Esse é o laço infinito, um erro comum.' },
    ],
    blanks: [
      { sentence: 'A estrutura "se... senão" é um exemplo de ___.', options: ['condição', 'variável', 'extensão', 'byte'], answer: 'condição', why: 'A condição faz o programa escolher um caminho.' },
      { sentence: 'Para repetir um passo uma vez para cada nota fiscal, usa-se uma ___.', options: ['repetição', 'senha', 'pasta', 'chave'], answer: 'repetição', why: 'A repetição, ou laço, executa os passos para cada item.' },
    ],
    outro: 'Variável, condição e repetição. Com essas três peças, as mil notas viram um trabalho de minutos.',
  },

  'cap.prim.02:redes': {
    scene: [
      { who: 'Mensageiro', text: 'Trago um pergaminho para o Tribunal, mas a cidade é enorme. Como sei em que porta bater?' },
      { who: 'Aprendiz', text: 'Na rede deve ser parecido. Como uma mensagem acha o computador certo?' },
      { who: 'Bubo', text: 'Cada máquina tem um endereço, e há carteiros em cada esquina que passam a mensagem adiante. Uns pedem, outros atendem.' },
      { who: 'Bubo', text: 'Leia sobre endereços, roteadores, clientes e servidores. O mensageiro espera.' },
    ],
    truths: [
      { statement: 'A internet é uma rede que liga redes do mundo inteiro.', answer: true, why: 'É a definição dada no texto.' },
      { statement: 'O navegador é o servidor que guarda os sites.', answer: false, why: 'O navegador é o cliente; o site fica no servidor.' },
      { statement: 'O endereço que começa com https indica conversa protegida por criptografia.', answer: true, why: 'O "s" indica a proteção entre navegador e site.' },
    ],
    blanks: [
      { sentence: 'O aparelho que liga uma rede a outra e escolhe o caminho dos dados é o ___.', options: ['roteador', 'teclado', 'navegador', 'backup'], answer: 'roteador', why: 'O roteador é o "carteiro da esquina" da rede.' },
      { sentence: 'O serviço que traduz nomes de sites em endereços IP é o ___.', options: ['DNS', 'SSD', 'SQL', 'RAM'], answer: 'DNS', why: 'O DNS funciona como uma agenda telefônica.' },
    ],
    outro: 'O mensageiro achou a porta certa: endereço, rota e alguém para atender. A rede deixou de ser um labirinto.',
  },

  'cap.prim.02:dados': {
    scene: [
      { who: 'Arquivista', text: 'Temos milhares de fichas de fornecedores e contratos. Às vezes duas fichas falam do mesmo fornecedor e ninguém percebe.' },
      { who: 'Aprendiz', text: 'Não daria para pôr tudo em uma grande planilha?' },
      { who: 'Bubo', text: 'Quase. Um banco de dados organiza em tabelas, e cada registro ganha uma identidade que não se repete.' },
      { who: 'Bubo', text: 'Leia sobre linhas, colunas e chaves. Depois ninguém mais duplica fornecedor neste arquivo.' },
    ],
    truths: [
      { statement: 'Em uma tabela, cada coluna é uma característica, como a cidade.', answer: true, why: 'Colunas descrevem; linhas são os registros.' },
      { statement: 'A chave primária pode se repetir em duas linhas da mesma tabela.', answer: false, why: 'Ela existe justamente para identificar cada linha sem repetir.' },
      { statement: 'SQL é a linguagem usada para conversar com bancos relacionais.', answer: true, why: 'Com ela se pede, inclui, altera e apaga dados.' },
    ],
    blanks: [
      { sentence: 'O programa que cuida de um banco de dados se chama ___.', options: ['SGBD', 'DNS', 'CPU', 'IP'], answer: 'SGBD', why: 'SGBD é o sistema gerenciador de banco de dados.' },
      { sentence: 'A coluna que aponta para a chave primária de outra tabela é a chave ___.', options: ['estrangeira', 'primária', 'secreta', 'pública'], answer: 'estrangeira', why: 'A chave estrangeira liga uma tabela a outra.' },
    ],
    outro: 'Cada fornecedor tem agora sua identidade única, e cada contrato aponta para o dono certo. O arquivo está em ordem.',
  },

  'cap.prim.02:seguranca': {
    scene: [
      { who: 'Aprendiz', text: 'Bubo, chegou uma mensagem dizendo que minha conta será bloqueada hoje se eu não digitar a senha neste link.' },
      { who: 'Bubo', text: 'Calma, não clique. Urgência, remetente estranho e pedido de senha são a isca mais velha do reino.' },
      { who: 'Aprendiz', text: 'E se fosse verdade? E se eu perder tudo?' },
      { who: 'Bubo', text: 'Para isso existem as três guardas da informação e as cópias de segurança. Leia antes de clicar em qualquer coisa.' },
    ],
    truths: [
      { statement: 'Disponibilidade significa que a informação está acessível quando quem tem direito precisa dela.', answer: true, why: 'É o pilar que trata de "estar lá quando preciso".' },
      { statement: 'Usar a data de nascimento como senha é uma boa prática.', answer: false, why: 'Dados fáceis de adivinhar enfraquecem a senha.' },
      { statement: 'Confidencialidade trata de manter o sistema no ar.', answer: false, why: 'Confidencialidade é sobre quem pode ver; ficar no ar é disponibilidade.' },
    ],
    blanks: [
      { sentence: 'A cópia dos dados guardada em outro lugar para recuperação se chama ___.', options: ['backup', 'phishing', 'roteador', 'extensão'], answer: 'backup', why: 'Backup é a cópia de segurança.' },
      { sentence: 'Garantir que o valor de um contrato não foi trocado às escondidas é proteger a ___.', options: ['integridade', 'disponibilidade', 'velocidade', 'extensão'], answer: 'integridade', why: 'Integridade é a garantia de que a informação não mudou sem autorização.' },
    ],
    outro: 'O link falso foi denunciado e a senha continua só sua. Primeiro pergaminho concluído: você já fala a língua básica da TI.',
  },
};
