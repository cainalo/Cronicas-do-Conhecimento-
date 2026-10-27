import type { SectionExtras } from '@/content/types';

// questões complementares por seção do grimório Fundamentos de TI (grim.primeiros).
// Conteúdo autoral; usa apenas fatos apresentados no texto de cada seção.

export const extrasPrimeiros: Record<string, SectionExtras> = {
  'cap.prim.01:computador': {
    truths: [
      { statement: 'O mouse é um dispositivo de entrada.', answer: true, why: 'O mouse leva informação para dentro do computador.' },
      { statement: 'A tela é um dispositivo de entrada.', answer: false, why: 'A tela mostra o resultado: é saída.' },
      { statement: 'Um bit vale 0 ou 1.', answer: true, why: 'O bit é a menor unidade de informação e só tem dois estados.' },
    ],
    blanks: [
      { sentence: 'A peça que faz as contas e toma as decisões é o ___.', options: ['processador', 'monitor', 'teclado', 'cabo'], answer: 'processador', why: 'O processador, ou CPU, é o "cérebro" do computador.' },
      { sentence: 'Um byte é formado por ___ bits.', options: ['8', '2', '10', '100'], answer: '8', why: 'Por convenção, um grupo de 8 bits forma um byte.' },
    ],
  },

  'cap.prim.01:hardware': {
    truths: [
      { statement: 'O processador é hardware.', answer: true, why: 'É uma peça física do computador.' },
      { statement: 'A memória RAM guarda os arquivos depois que o computador desliga.', answer: false, why: 'A RAM é volátil; quem guarda depois de desligar é o HD ou o SSD.' },
      { statement: 'Um navegador de internet é um software aplicativo.', answer: true, why: 'Ele resolve uma tarefa do usuário: abrir páginas.' },
    ],
    blanks: [
      { sentence: 'A memória que apaga quando o computador desliga é a ___.', options: ['RAM', 'SSD', 'placa-mãe', 'impressora'], answer: 'RAM', why: 'A RAM é a memória de trabalho, rápida e volátil.' },
      { sentence: 'O sistema operacional é um software de ___.', options: ['sistema', 'entrada', 'saída', 'hardware'], answer: 'sistema', why: 'Ele cuida da própria máquina, por isso é software de sistema.' },
    ],
  },

  'cap.prim.01:sistema': {
    truths: [
      { statement: 'Uma pasta pode ficar dentro de outra pasta.', answer: true, why: 'As pastas formam um caminho, como gavetas dentro de um armário.' },
      { statement: 'Renomear um arquivo de ".exe" para ".pdf" transforma o programa em documento.', answer: false, why: 'A extensão é só parte do nome; o conteúdo continua o mesmo.' },
      { statement: 'Quem só tem permissão de leitura pode alterar o arquivo.', answer: false, why: 'Alterar exige permissão de escrita.' },
    ],
    blanks: [
      { sentence: 'A extensão ___ costuma indicar uma planilha do Excel.', options: ['.xlsx', '.jpg', '.exe', '.pdf'], answer: '.xlsx', why: 'O texto lista .xlsx como planilha do Microsoft Excel.' },
      { sentence: 'Ler, gravar e executar são exemplos de ___ de um arquivo.', options: ['permissões', 'extensões', 'pastas', 'bytes'], answer: 'permissões', why: 'Permissões dizem quem pode fazer o quê com cada arquivo.' },
    ],
  },

  'cap.prim.01:programacao': {
    truths: [
      { statement: 'Uma receita de bolo pode ser vista como um algoritmo.', answer: true, why: 'É uma sequência de passos em ordem, com um fim.' },
      { statement: 'O conteúdo de uma variável nunca pode mudar.', answer: false, why: 'O nome fica o mesmo, mas o valor guardado pode ser trocado.' },
      { statement: 'Um laço "enquanto" cuja condição nunca fica falsa não termina.', answer: true, why: 'Esse é o laço infinito, um erro comum.' },
    ],
    blanks: [
      { sentence: 'A estrutura "se... senão" é um exemplo de ___.', options: ['condição', 'variável', 'extensão', 'byte'], answer: 'condição', why: 'A condição faz o programa escolher um caminho.' },
      { sentence: 'Para repetir um passo uma vez para cada nota fiscal, usa-se uma ___.', options: ['repetição', 'senha', 'pasta', 'chave'], answer: 'repetição', why: 'A repetição, ou laço, executa os passos para cada item.' },
    ],
  },

  'cap.prim.02:redes': {
    truths: [
      { statement: 'A internet é uma rede que liga redes do mundo inteiro.', answer: true, why: 'É a definição dada no texto.' },
      { statement: 'O navegador é o servidor que guarda os sites.', answer: false, why: 'O navegador é o cliente; o site fica no servidor.' },
      { statement: 'O endereço que começa com https indica conversa protegida por criptografia.', answer: true, why: 'O "s" indica a proteção entre navegador e site.' },
    ],
    blanks: [
      { sentence: 'O aparelho que liga uma rede a outra e escolhe o caminho dos dados é o ___.', options: ['roteador', 'teclado', 'navegador', 'backup'], answer: 'roteador', why: 'O roteador é o "carteiro da esquina" da rede.' },
      { sentence: 'O serviço que traduz nomes de sites em endereços IP é o ___.', options: ['DNS', 'SSD', 'SQL', 'RAM'], answer: 'DNS', why: 'O DNS funciona como uma agenda telefônica.' },
    ],
  },

  'cap.prim.02:dados': {
    truths: [
      { statement: 'Em uma tabela, cada coluna é uma característica, como a cidade.', answer: true, why: 'Colunas descrevem; linhas são os registros.' },
      { statement: 'A chave primária pode se repetir em duas linhas da mesma tabela.', answer: false, why: 'Ela existe justamente para identificar cada linha sem repetir.' },
      { statement: 'SQL é a linguagem usada para conversar com bancos relacionais.', answer: true, why: 'Com ela se pede, inclui, altera e apaga dados.' },
    ],
    blanks: [
      { sentence: 'O programa que cuida de um banco de dados se chama ___.', options: ['SGBD', 'DNS', 'CPU', 'IP'], answer: 'SGBD', why: 'SGBD é o sistema gerenciador de banco de dados.' },
      { sentence: 'A coluna que aponta para a chave primária de outra tabela é a chave ___.', options: ['estrangeira', 'primária', 'secreta', 'pública'], answer: 'estrangeira', why: 'A chave estrangeira liga uma tabela a outra.' },
    ],
  },

  'cap.prim.02:seguranca': {
    truths: [
      { statement: 'Disponibilidade significa que a informação está acessível quando quem tem direito precisa dela.', answer: true, why: 'É o pilar que trata de "estar lá quando preciso".' },
      { statement: 'Usar a data de nascimento como senha é uma boa prática.', answer: false, why: 'Dados fáceis de adivinhar enfraquecem a senha.' },
      { statement: 'Confidencialidade trata de manter o sistema no ar.', answer: false, why: 'Confidencialidade é sobre quem pode ver; ficar no ar é disponibilidade.' },
    ],
    blanks: [
      { sentence: 'A cópia dos dados guardada em outro lugar para recuperação se chama ___.', options: ['backup', 'phishing', 'roteador', 'extensão'], answer: 'backup', why: 'Backup é a cópia de segurança.' },
      { sentence: 'Garantir que o valor de um contrato não foi trocado às escondidas é proteger a ___.', options: ['integridade', 'disponibilidade', 'velocidade', 'extensão'], answer: 'integridade', why: 'Integridade é a garantia de que a informação não mudou sem autorização.' },
    ],
  },
};
