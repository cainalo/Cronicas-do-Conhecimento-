// Microaula "Sistemas de arquivos e permissões" (cap.infra.03, seção arquivos), no formato aprovado
// pelo usuário em 24/10/2026 com o piloto de Processos. Uma ideia por etapa, checagem imediata e
// recuperação com outro exemplo. Fatos conferidos com o texto do capítulo (02-arquivos-permissoes.md);
// nomes de arquivos, usuários e grupos são exemplos didáticos. Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microInfraArquivos: MicroLesson = {
  id: 'micro.infra.arquivos',
  chapterId: 'cap.infra.03',
  sectionId: 'arquivos',
  title: 'Sistemas de arquivos e permissões',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'No servidor do Tribunal há um arquivo com os achados de uma auditoria. A equipe precisa editar, a coordenação só ler, e os demais servidores não podem nem abrir. Quem garante isso?',
    options: [
      { text: 'O sistema operacional, pelas permissões do arquivo', why: 'Isso. Cada arquivo guarda quem pode ler, alterar ou executar. É o assunto desta aula.' },
      { text: 'O próprio programa de texto, ao abrir o arquivo', why: 'O programa só abre o que o sistema permitir. Quem controla o acesso é o sistema operacional, pelas permissões.' },
      { text: 'Ninguém: quem tem acesso ao computador abre tudo', why: 'Não. O sistema guarda, para cada arquivo, quem pode fazer o quê. Vamos ver como.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'o-que-e',
      part: 'Sistemas de arquivos',
      title: 'O que um sistema de arquivos faz',
      goal: 'Saber as três tarefas de um sistema de arquivos.',
      explain:
        'O **sistema de arquivos** é a parte do sistema operacional que organiza os dados no disco. Ele faz três coisas:\n\n1. Organiza os dados em **arquivos** e **diretórios** (pastas).\n2. Guarda os **metadados** de cada item: dono, datas, tamanho e permissões.\n3. **Controla quem pode ler ou alterar** cada item.\n\nEm provas, o tema aparece em três frentes: os tipos de sistema de arquivos, a estrutura de diretórios do Linux e, principalmente, as **permissões**.',
      example: 'O arquivo `achados.odt` tem conteúdo (o texto da auditoria) e metadados: dono `maria`, tamanho 8192 bytes, data 10/out e quem pode lê-lo.',
      check: {
        kind: 'choice',
        id: 'oq-c',
        prompt: 'Dono, data de alteração e permissões de um arquivo são exemplos de:',
        options: [
          { text: 'Metadados', why: 'Isso. São informações sobre o arquivo, não o conteúdo dele.' },
          { text: 'Conteúdo do arquivo', why: 'O conteúdo é o que está dentro (o texto, a planilha). Dono e datas são informações sobre ele: metadados.' },
          { text: 'Processos', why: 'Processo é programa em execução. Dono e datas de um arquivo são metadados.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **pasta de processo físico** no arquivo do Tribunal. As folhas dentro dela são o **conteúdo**. A etiqueta na capa (número, responsável, data, quem pode consultar) são os **metadados**.',
        check: {
          kind: 'sort',
          id: 'oq-r',
          prompt: 'Classifique cada item do arquivo relatorio.odt.',
          categories: ['Conteúdo', 'Metadado'],
          items: [
            { text: 'O texto do relatório', cat: 0, why: 'É o que está dentro do arquivo.' },
            { text: 'O dono: maria', cat: 1, why: 'Informação sobre o arquivo.' },
            { text: 'Tamanho: 8192 bytes', cat: 1, why: 'Informação sobre o arquivo.' },
          ],
        },
      },
    },
    {
      id: 'tipos-windows',
      part: 'Sistemas de arquivos',
      title: 'NTFS, FAT32, exFAT e ReFS',
      goal: 'Reconhecer os sistemas de arquivos do Windows e das mídias removíveis.',
      explain:
        '| Sistema | Onde aparece | O que lembrar |\n|---|---|---|\n| **NTFS** | Discos do Windows | Permissões por ACL, *journaling*, criptografia (EFS), cotas e compactação. |\n| **FAT32** | Pen drives, cartões | **Sem permissões**; arquivo limitado a **4 GB**. |\n| **exFAT** | Mídias removíveis grandes | Sem o limite de 4 GB, mas também sem as permissões do NTFS. |\n| **ReFS** | Windows Server | Grandes volumes e integridade dos dados. |',
      check: {
        kind: 'choice',
        id: 'tw-c',
        prompt: 'Um vídeo de 6 GB não cabe num pen drive, embora haja espaço livre. Qual sistema de arquivos explica isso?',
        options: [
          { text: 'FAT32, que limita cada arquivo a 4 GB', why: 'Isso. O limite é por arquivo, não do disco.' },
          { text: 'exFAT, que limita cada arquivo a 4 GB', why: 'É o contrário: o exFAT existe justamente para não ter esse limite.' },
          { text: 'NTFS, que não aceita arquivos grandes', why: 'NTFS aceita arquivos grandes. O limite de 4 GB é do FAT32.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Uma forma de lembrar: **FAT32** é o antigo e simples (cabe em todo lugar, mas trava em 4 GB e não tem permissões). **exFAT** é o FAT moderno para pen drives grandes. **NTFS** é o completo do Windows, com permissões.',
        check: {
          kind: 'choice',
          id: 'tw-r',
          prompt: 'Qual destes sistemas permite dar permissão de leitura só para um grupo de usuários?',
          options: [
            { text: 'NTFS', why: 'Isso. O NTFS tem ACLs, com permissões por usuário e grupo.' },
            { text: 'FAT32', why: 'FAT32 não tem permissões.' },
            { text: 'exFAT', why: 'exFAT também não tem as permissões do NTFS.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'tipos-linux',
      part: 'Sistemas de arquivos',
      title: 'ext4, XFS e o journaling',
      goal: 'Reconhecer ext4 e XFS e entender o que é journaling.',
      explain:
        'No Linux, os mais cobrados são:\n\n- **ext4**: padrão em muitas distribuições; usa *journaling*.\n- **XFS**: padrão no Red Hat Enterprise Linux; bom desempenho com arquivos grandes.\n\n***Journaling*** é registrar as alterações num **diário** antes de aplicá-las. Se a energia cair no meio de uma gravação, o sistema consulta o diário e recupera a **consistência** do disco.',
      example: 'Durante a gravação de um relatório, a luz cai. Ao religar, o ext4 lê o diário, vê o que estava pela metade e deixa o sistema de arquivos coerente.',
      check: {
        kind: 'choice',
        id: 'tl-c',
        prompt: 'Para que serve o journaling?',
        options: [
          { text: 'Recuperar a consistência após um desligamento abrupto', why: 'Isso. O diário mostra o que estava em andamento.' },
          { text: 'Criptografar os arquivos do usuário', why: 'Criptografia é outra função (no NTFS, o EFS). Journaling é o diário de alterações.' },
          { text: 'Aumentar o limite de tamanho dos arquivos', why: 'Limite de tamanho não tem a ver com o diário.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine o escrivão que, antes de mudar um livro de registros, **anota num caderno** o que vai fazer. Se for interrompido, olha o caderno e sabe onde parou. O caderno é o *journal*.',
        check: {
          kind: 'sort',
          id: 'tl-r',
          prompt: 'Onde cada sistema de arquivos aparece?',
          categories: ['Linux', 'Windows'],
          items: [
            { text: 'ext4', cat: 0, why: 'Padrão em muitas distribuições Linux.' },
            { text: 'XFS', cat: 0, why: 'Padrão no Red Hat Enterprise Linux.' },
            { text: 'NTFS', cat: 1, why: 'Discos de sistema do Windows.' },
            { text: 'ReFS', cat: 1, why: 'Windows Server.' },
          ],
        },
      },
    },
    {
      id: 'raiz',
      part: 'Diretórios do Linux',
      title: 'Uma raiz só: / e a montagem',
      goal: 'Entender que no Linux tudo parte de / e que discos são montados em diretórios.',
      explain:
        'No Windows, cada disco recebe uma **letra**: `C:`, `D:`.\n\nNo Linux não há letras. Tudo parte de uma **única raiz**, escrita `/`. Um disco ou partição é **montado** (comando `mount`) num diretório, e o conteúdo dele aparece ali dentro.',
      example: 'Um segundo disco montado em `/dados` aparece como uma pasta comum: `/dados/aud2026/achados.odt`.',
      check: {
        kind: 'choice',
        id: 'rz-c',
        prompt: 'No Linux, como um segundo disco fica acessível?',
        options: [
          { text: 'Montado num diretório, por exemplo /dados', why: 'Isso. Ele passa a fazer parte da árvore que começa em /.' },
          { text: 'Recebendo a letra D:', why: 'Letras de unidade são do Windows. No Linux o disco é montado num diretório.' },
          { text: 'Criando uma segunda raiz //', why: 'Só existe uma raiz, /. O disco é montado dentro dela.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **árvore única**: o tronco é `/`. Um disco novo não vira outra árvore; ele é **enxertado num galho** (o ponto de montagem), e daí em diante faz parte da mesma árvore.',
        check: {
          kind: 'choice',
          id: 'rz-r',
          prompt: 'O pen drive foi montado em /media/pen. Onde está o arquivo foto.jpg da raiz do pen drive?',
          options: [
            { text: '/media/pen/foto.jpg', why: 'Isso. O conteúdo aparece dentro do ponto de montagem.' },
            { text: 'E:\\foto.jpg', why: 'Esse é o jeito do Windows. No Linux é o caminho do ponto de montagem.' },
            { text: '/foto.jpg', why: 'Ficaria na raiz do sistema, não no pen drive. O pen drive está em /media/pen.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'diretorios',
      part: 'Diretórios do Linux',
      title: 'Para que serve cada diretório',
      goal: 'Associar /etc, /home, /var/log, /tmp, /dev e /proc ao seu conteúdo.',
      explain:
        '| Diretório | Conteúdo |\n|---|---|\n| `/etc` | Configurações do sistema e dos serviços |\n| `/home` | Pastas pessoais dos usuários (`/root` é a do superusuário) |\n| `/var` | Dados variáveis; **`/var/log`** guarda os logs |\n| `/bin`, `/sbin`, `/usr` | Programas e bibliotecas do sistema |\n| `/tmp` | Temporários, gravável por todos |\n| `/dev` | Dispositivos como arquivos (`/dev/sda` é um disco) |\n| `/proc` | Virtual: informações do núcleo e dos processos |',
      check: {
        kind: 'choice',
        id: 'dr-c',
        prompt: 'O servidor web apresentou erro e você quer ler os registros dele. Em que diretório procurar primeiro?',
        options: [
          { text: '/var/log', why: 'Isso. Logs ficam em /var/log.' },
          { text: '/etc', why: '/etc guarda configurações, não registros.' },
          { text: '/dev', why: '/dev representa dispositivos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Dicas para memorizar: **etc** é "o resto das configurações"; **var** é de "variável" (o que muda o tempo todo, como os logs); **dev** é de *device* (dispositivo); **proc** é de processos; **tmp** é de temporário.',
        check: {
          kind: 'sort',
          id: 'dr-r',
          prompt: 'Onde fica cada coisa?',
          categories: ['/etc', '/home', '/dev'],
          items: [
            { text: 'Configuração do servidor SSH', cat: 0, why: 'Configurações ficam em /etc.' },
            { text: 'Documentos pessoais da usuária maria', cat: 1, why: 'Pastas pessoais ficam em /home.' },
            { text: 'O primeiro disco, sda', cat: 2, why: 'Dispositivos aparecem em /dev.' },
          ],
        },
      },
    },
    {
      id: 'usuarios-espaco',
      part: 'Diretórios do Linux',
      title: 'Usuários, senhas e espaço em disco',
      goal: 'Saber onde ficam usuários e senhas e como ver o espaço em disco.',
      explain:
        '- **`/etc/passwd`**: lista dos usuários.\n- **`/etc/shadow`**: os **hashes** das senhas, legível **apenas pelo root**.\n\nPara espaço em disco:\n\n- **`df -h`**: uso de cada sistema de arquivos montado (o disco todo).\n- **`du -sh diretorio`**: tamanho de **um diretório**.\n\nO `-h` mostra os números em formato legível (K, M, G).',
      example: '`df -h` responde "o disco /dados está 92% cheio". `du -sh /dados/aud2026` responde "esta pasta ocupa 3,1 G".',
      check: {
        kind: 'choice',
        id: 'ue-c',
        prompt: 'Você quer saber quanto espaço ocupa a pasta /var/log. Qual comando?',
        options: [
          { text: 'du -sh /var/log', why: 'Isso. du mede um diretório.' },
          { text: 'df -h', why: 'df mostra o uso de cada sistema de arquivos inteiro, não de uma pasta.' },
          { text: 'cat /etc/shadow', why: 'Esse arquivo guarda hashes de senha, e só o root lê.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**df** = *disk free*: olha o **disco**, de cima. **du** = *disk usage*: mede **uma pasta** por dentro. E as senhas não ficam no `passwd`: os hashes ficam no `shadow`, que só o root lê.',
        check: {
          kind: 'choice',
          id: 'ue-r',
          prompt: 'Onde ficam os hashes das senhas dos usuários?',
          options: [
            { text: '/etc/shadow, legível apenas pelo root', why: 'Isso.' },
            { text: '/etc/passwd, legível por todos', why: 'O passwd lista os usuários; os hashes ficam no shadow.' },
            { text: '/home/senhas', why: 'Não existe esse padrão; o arquivo é /etc/shadow.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'links',
      part: 'Diretórios do Linux',
      title: 'Hard link e link simbólico',
      goal: 'Diferenciar ln de ln -s.',
      explain:
        '- **`ln origem destino`** cria um ***hard link***: outro **nome** para os mesmos dados (o mesmo *inode*). Só vale **dentro do mesmo sistema de arquivos**.\n- **`ln -s origem destino`** cria um **link simbólico**: um **atalho** que aponta para o caminho. Se o original for apagado, o atalho fica **quebrado**.',
      example: '`ln -s /dados/aud2026/achados.odt ~/achados` cria um atalho na pasta pessoal. Apagou o original? O atalho `~/achados` passa a apontar para o nada.',
      check: {
        kind: 'choice',
        id: 'lk-c',
        prompt: 'Qual tipo de link fica quebrado quando o arquivo original é apagado?',
        options: [
          { text: 'O link simbólico (ln -s)', why: 'Isso. Ele aponta para o caminho, que deixou de existir.' },
          { text: 'O hard link (ln)', why: 'O hard link é outro nome para os mesmos dados; os dados continuam acessíveis por ele.' },
          { text: 'Os dois', why: 'Só o simbólico quebra. O hard link continua dando acesso aos dados.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense num livro com **dois títulos na ficha** da biblioteca (hard link): tirar uma ficha não some com o livro. Já o **bilhete "o livro está na estante 3"** (simbólico) fica inútil se alguém tira o livro de lá.',
        check: {
          kind: 'choice',
          id: 'lk-r',
          prompt: 'Qual comando cria um atalho que aponta para o caminho do arquivo?',
          options: [
            { text: 'ln -s origem destino', why: 'Isso. -s de simbólico.' },
            { text: 'ln origem destino', why: 'Sem -s cria hard link, outro nome para os mesmos dados.' },
            { text: 'mount origem destino', why: 'mount monta um sistema de arquivos num diretório.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'ls-l',
      part: 'Permissões no Linux',
      title: 'Lendo a saída de ls -l',
      goal: 'Identificar tipo, trios de permissão, dono e grupo numa linha de ls -l.',
      explain:
        '```\n-rwxr-x---  1 maria auditoria  2048 out 10 09:15 relatorio.sh\n```\n\n1. **Primeiro caractere**: o tipo. `-` arquivo comum, `d` diretório, `l` link simbólico.\n2. **Três trios** de permissões: **dono** (u), **grupo** (g) e **outros** (o).\n3. Depois: número de links, **dono** (`maria`), **grupo** (`auditoria`), tamanho e data.',
      check: {
        kind: 'choice',
        id: 'll-c',
        prompt: 'Na linha "drwxr-xr-x 2 jose ti 4096 out 17 08:00 scripts", o que é "scripts"?',
        options: [
          { text: 'Um diretório, porque a linha começa com d', why: 'Isso. O primeiro caractere indica o tipo.' },
          { text: 'Um arquivo comum', why: 'Arquivo comum começaria com -. Aqui é d, diretório.' },
          { text: 'Um link simbólico', why: 'Link simbólico começaria com l.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia a linha em pedaços: **1 caractere** (tipo) + **3 + 3 + 3** (dono, grupo, outros). Na saída, o **dono vem antes do grupo**.\n\n`-` `rw-` `r--` `---` ... `maria` `auditoria`: arquivo; dono rw; grupo r; outros nada; dono maria; grupo auditoria.',
        check: {
          kind: 'choice',
          id: 'll-r',
          prompt: 'Em "-rw-r----- 1 maria auditoria 8192 out 10 achados.odt", quem é o grupo do arquivo?',
          options: [
            { text: 'auditoria', why: 'Isso. A ordem é dono e depois grupo.' },
            { text: 'maria', why: 'maria é a dona. O grupo vem logo depois: auditoria.' },
            { text: 'Não dá para saber pela saída', why: 'Dá: dono e grupo aparecem nessa ordem, depois do número de links.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'rwx',
      part: 'Permissões no Linux',
      title: 'r, w e x em arquivo e em diretório',
      goal: 'Saber o que r, w e x permitem em arquivos e em diretórios.',
      explain:
        '| Letra | Em arquivo | Em diretório |\n|---|---|---|\n| **r** | Ler o conteúdo | Listar os nomes |\n| **w** | Alterar o conteúdo | Criar, renomear e apagar itens dentro dele |\n| **x** | Executar | Entrar (`cd`) e acessar itens |\n\nO ponto que mais cai: em **diretório**, o `x` é o que deixa **entrar**. Sem `x`, não há `cd`.',
      check: {
        kind: 'choice',
        id: 'rw-c',
        prompt: 'O usuário tem r e w, mas não x, no diretório /dados/relatorios. O que acontece ao tentar cd /dados/relatorios?',
        options: [
          { text: 'É negado: sem x não se entra no diretório', why: 'Isso. Em diretório, x é entrar e acessar.' },
          { text: 'Funciona, porque ele tem r', why: 'Em diretório, r só lista nomes. Para entrar é preciso x.' },
          { text: 'Funciona, porque ele tem w', why: 'w em diretório é criar e apagar itens. Entrar exige x.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no diretório como uma **sala de arquivo**: **r** é ler a lista de pastas na porta; **x** é ter a chave para **entrar**; **w** é poder colocar ou tirar pastas lá dentro.',
        check: {
          kind: 'sort',
          id: 'rw-r',
          prompt: 'Num diretório, qual permissão é necessária para cada ação?',
          categories: ['r', 'w', 'x'],
          items: [
            { text: 'Listar os nomes dos arquivos', cat: 0, why: 'r em diretório é listar.' },
            { text: 'Apagar um arquivo de dentro dele', cat: 1, why: 'w em diretório é criar, renomear e apagar itens.' },
            { text: 'Entrar com cd', cat: 2, why: 'x em diretório é entrar.' },
          ],
        },
      },
    },
    {
      id: 'octal',
      part: 'Permissões no Linux',
      title: 'Notação octal: r=4, w=2, x=1',
      goal: 'Converter um trio de letras em número e vice-versa.',
      explain:
        'Cada letra vale um número: **r = 4**, **w = 2**, **x = 1**. Somando o trio, sai um dígito de 0 a 7. Três trios formam três dígitos.\n\n`rwxr-x---`:\n\n- dono `rwx` = 4+2+1 = **7**\n- grupo `r-x` = 4+0+1 = **5**\n- outros `---` = 0+0+0 = **0**\n\nResultado: **750**. O dono lê, grava e executa; o grupo lê e executa; os outros não têm acesso.',
      check: {
        kind: 'choice',
        id: 'oc-c',
        prompt: 'Quanto vale rw-r----- em octal?',
        options: [
          { text: '640', why: 'Isso. rw- = 6, r-- = 4, --- = 0.' },
          { text: '750', why: '750 seria rwxr-x---. Aqui não há x.' },
          { text: '460', why: 'O dono vem primeiro: rw- = 6. Depois o grupo r-- = 4.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Faça trio por trio, sempre na ordem **dono, grupo, outros**:\n\n| Trio | Conta | Dígito |\n|---|---|---|\n| `rw-` | 4 + 2 + 0 | 6 |\n| `r--` | 4 + 0 + 0 | 4 |\n| `r-x` | 4 + 0 + 1 | 5 |\n| `rwx` | 4 + 2 + 1 | 7 |',
        check: {
          kind: 'choice',
          id: 'oc-r',
          prompt: 'Com permissão 640, o que o grupo pode fazer com o arquivo?',
          options: [
            { text: 'Só ler', why: 'Isso. O dígito do grupo é 4 = r.' },
            { text: 'Ler e gravar', why: 'Ler e gravar é 6, que é o dígito do dono. O do grupo é 4.' },
            { text: 'Nada', why: 'Nada é 0, que é o dígito dos outros.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'octais-tipicos',
      part: 'Permissões no Linux',
      title: 'Os valores que mais aparecem',
      goal: 'Reconhecer 755, 644, 640, 600 e 700 e seus usos.',
      explain:
        '| Octal | Letras | Uso típico |\n|---|---|---|\n| **755** | `rwxr-xr-x` | Scripts e diretórios públicos para leitura |\n| **644** | `rw-r--r--` | Arquivos comuns |\n| **640** | `rw-r-----` | Legível pelo grupo, fechado para outros |\n| **600** | `rw-------` | Chaves privadas e arquivos sigilosos |\n| **700** | `rwx------` | Diretório privado do dono |',
      check: {
        kind: 'choice',
        id: 'ot-c',
        prompt: 'Uma chave privada SSH deve ser lida e gravada só pelo dono. Qual permissão?',
        options: [
          { text: '600', why: 'Isso. rw------- : só o dono lê e grava.' },
          { text: '644', why: '644 deixa grupo e outros lerem. Para chave privada, é demais.' },
          { text: '755', why: '755 deixa todos lerem e executarem.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Olhe o **último dígito**, o dos outros: 755 e 644 terminam em 5 e 4 (outros leem). 640, 600 e 700 terminam em **0**: outros não acessam. Depois veja o do meio (grupo).',
        check: {
          kind: 'sort',
          id: 'ot-r',
          prompt: 'Os outros usuários conseguem ler?',
          categories: ['Outros leem', 'Outros sem acesso'],
          items: [
            { text: '644', cat: 0, why: 'Último dígito 4 = r.' },
            { text: '640', cat: 1, why: 'Último dígito 0.' },
            { text: '755', cat: 0, why: 'Último dígito 5 = r-x.' },
            { text: '700', cat: 1, why: 'Último dígito 0.' },
          ],
        },
      },
    },
    {
      id: 'chmod',
      part: 'Alterando permissões',
      title: 'chmod: octal e simbólico',
      goal: 'Usar chmod em octal, na forma simbólica e de modo recursivo.',
      explain:
        '**Em octal**, define tudo de uma vez: `chmod 750 relatorio.sh`. Com `-R`, vale para a pasta e tudo dentro dela: `chmod -R 750 pasta/`.\n\n**Na forma simbólica**, diz-se quem (`u` dono, `g` grupo, `o` outros, `a` todos), a operação (`+` acrescenta, `-` retira, `=` define) e as letras:\n\n- `chmod u+x script.sh`: dá execução ao dono.\n- `chmod g-w arquivo`: tira a gravação do grupo.\n- `chmod o= arquivo`: zera as permissões dos outros.',
      check: {
        kind: 'choice',
        id: 'cm-c',
        prompt: 'Qual comando retira a permissão de gravação do grupo, sem mexer no resto?',
        options: [
          { text: 'chmod g-w arquivo', why: 'Isso. g = grupo, - = retira, w = gravação.' },
          { text: 'chmod o-w arquivo', why: 'o são os outros, não o grupo.' },
          { text: 'chmod 000 arquivo', why: '000 zera tudo de todos, não só a gravação do grupo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Leia o comando simbólico como uma frase: **quem**, **o que faz**, **qual letra**.\n\n`u+x` = "dono, ganha, execução". `o=` = "outros, ficam com nada". `a+r` = "todos, ganham, leitura".',
        check: {
          kind: 'choice',
          id: 'cm-r',
          prompt: 'O script backup.sh não executa porque o dono não tem x. Qual comando resolve sem alterar grupo e outros?',
          options: [
            { text: 'chmod u+x backup.sh', why: 'Isso. Só o dono ganha execução.' },
            { text: 'chmod a+x backup.sh', why: 'a são todos: daria execução também ao grupo e aos outros.' },
            { text: 'chmod -R 777 backup.sh', why: '777 abre tudo para todos. Exagero e risco.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'chown-umask',
      part: 'Alterando permissões',
      title: 'chown, chgrp e umask',
      goal: 'Trocar dono e grupo e entender o que a umask faz com arquivos novos.',
      explain:
        '- **`chown maria:auditoria arquivo`**: muda o **dono** e o **grupo**. Em geral, só o **root** pode trocar o dono.\n- **`chgrp auditoria arquivo`**: muda só o grupo.\n- **`umask`**: máscara que **retira** permissões dos arquivos **novos**. Com `umask 022`, arquivos nascem **644** e diretórios **755**.',
      example: 'O técnico entrega a pasta da auditoria à equipe: `chown -R lider:aud2026 /dados/aud2026`. Agora o dono é `lider` e o grupo é `aud2026`.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Com umask 022, com qual permissão nasce um arquivo comum novo?',
        options: [
          { text: '644', why: 'Isso. E diretórios nascem 755.' },
          { text: '755', why: '755 é como nascem os diretórios com umask 022. Arquivos nascem 644.' },
          { text: '022', why: '022 é a máscara, o que é retirado; não é a permissão final.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A umask é um **filtro** na porta: ela não dá permissão, ela **tira**. Com 022, o filtro tira a gravação (2) do grupo e dos outros. Por isso um arquivo comum fica `rw-r--r--` (644) e um diretório fica `rwxr-xr-x` (755).',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Qual comando muda apenas o grupo do arquivo para auditoria?',
          options: [
            { text: 'chgrp auditoria arquivo', why: 'Isso. chgrp muda só o grupo.' },
            { text: 'chmod auditoria arquivo', why: 'chmod muda permissões, não dono nem grupo.' },
            { text: 'umask auditoria', why: 'umask é a máscara de permissões dos arquivos novos.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'especiais',
      part: 'Alterando permissões',
      title: 'setuid, setgid e sticky bit',
      goal: 'Reconhecer os três bits especiais e o exemplo de cada um.',
      explain:
        'Um **quarto dígito**, à esquerda, liga permissões especiais:\n\n| Bit | Valor | Efeito |\n|---|---|---|\n| **setuid** | 4 | O executável roda com os privilégios do **dono** (o `passwd` usa isso para gravar em `/etc/shadow`). |\n| **setgid** | 2 | Roda com o grupo do arquivo; em diretório, arquivos novos **herdam o grupo** dele. |\n| **sticky bit** | 1 | Em diretório, um usuário **não apaga arquivos de outros**. |\n\nO sticky é o `t` no fim de `drwxrwxrwt` do `/tmp` (modo **1777**).',
      check: {
        kind: 'choice',
        id: 'es-c',
        prompt: 'No /tmp, todos gravam, mas ninguém apaga o arquivo de outro usuário. Que bit garante isso?',
        options: [
          { text: 'Sticky bit', why: 'Isso. É o t de drwxrwxrwt (1777).' },
          { text: 'setuid', why: 'setuid faz um executável rodar com os privilégios do dono.' },
          { text: 'setgid', why: 'setgid trata do grupo (herança de grupo em diretório).' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Associe cada bit a um exemplo concreto:\n\n- **setuid**: o `passwd`, que precisa gravar no `/etc/shadow` mesmo quando quem o roda é um usuário comum.\n- **setgid**: a pasta de equipe em que tudo que se cria fica no grupo da equipe.\n- **sticky**: o `/tmp`, onde cada um só apaga o que é seu.',
        check: {
          kind: 'sort',
          id: 'es-r',
          prompt: 'Qual bit especial explica cada situação?',
          categories: ['setuid', 'setgid', 'sticky'],
          items: [
            { text: 'O passwd grava em /etc/shadow mesmo rodado por usuário comum', cat: 0, why: 'Roda com os privilégios do dono (root).' },
            { text: 'Arquivos criados na pasta da equipe ficam com o grupo da pasta', cat: 1, why: 'setgid em diretório faz herdar o grupo.' },
            { text: 'No /tmp, ninguém apaga o arquivo de outro', cat: 2, why: 'É o sticky bit.' },
          ],
        },
      },
    },
    {
      id: 'ntfs',
      part: 'Permissões no Windows',
      title: 'NTFS: ACL, herança e Negar',
      goal: 'Entender ACL, herança e a regra do Negar no NTFS.',
      explain:
        'O NTFS usa **listas de controle de acesso (ACL)**: cada arquivo ou pasta tem entradas que **concedem** ou **negam** permissões a usuários e grupos.\n\nPermissões básicas: **Controle total**, **Modificar**, **Ler e executar**, **Listar conteúdo da pasta**, **Ler** e **Gravar**.\n\n- **Herança**: por padrão, arquivos e subpastas herdam as permissões da pasta-mãe.\n- **Negar**: uma negação explícita **prevalece** sobre uma permissão concedida no mesmo nível. Por isso a Microsoft recomenda usar *Negar* com moderação.',
      example: 'Na pasta da auditoria: *Modificar* para o grupo da equipe e *Ler* para o grupo da coordenação, sem dar permissão a cada pessoa individualmente.',
      check: {
        kind: 'choice',
        id: 'nt-c',
        prompt: 'No mesmo nível, o grupo Equipe tem Permitir Ler e o grupo Estagiários tem Negar Ler. Ana está nos dois grupos. Ela consegue ler?',
        options: [
          { text: 'Não, porque o Negar explícito prevalece', why: 'Isso. No mesmo nível, Negar vence Permitir.' },
          { text: 'Sim, porque Permitir sempre vence', why: 'É o contrário: no mesmo nível, Negar explícito prevalece.' },
          { text: 'Sim, porque as permissões se somam', why: 'As permissões concedidas se somam, mas um Negar explícito no mesmo nível bloqueia.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine a portaria com duas listas: a dos **autorizados** e a dos **barrados**. Se o nome está nas duas, quem está na lista de **barrados** não entra. É o Negar explícito. Por isso ele deve ser usado com cuidado: barra até quem deveria entrar por outro grupo.',
        check: {
          kind: 'choice',
          id: 'nt-r',
          prompt: 'Uma subpasta nova criada dentro de Auditorias, sem nenhuma configuração extra, recebe quais permissões?',
          options: [
            { text: 'As da pasta-mãe, por herança', why: 'Isso. A herança é o padrão.' },
            { text: 'Nenhuma: precisa configurar tudo do zero', why: 'Por padrão há herança da pasta-mãe.' },
            { text: 'Controle total para todos', why: 'Não. Ela herda as permissões da pasta-mãe.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'compartilhamento',
      part: 'Permissões no Windows',
      title: 'Compartilhamento + NTFS: vale a mais restritiva',
      goal: 'Calcular o acesso efetivo pela rede e conhecer icacls e Get-Acl.',
      explain:
        'Quem acessa uma pasta **pela rede** passa por **duas verificações**: a permissão do **compartilhamento** e a do **NTFS**. Vale a **mais restritiva** das duas.\n\nNa linha de comando: **`icacls`** exibe e altera ACLs; no PowerShell, **`Get-Acl`** e **`Set-Acl`**.',
      example: 'Compartilhamento: *Controle total* para Equipe. NTFS: *Ler* para Equipe. Pela rede, a Equipe só **lê**.',
      check: {
        kind: 'choice',
        id: 'cp-c',
        prompt: 'Compartilhamento: Ler. NTFS: Modificar. Pela rede, o usuário pode:',
        options: [
          { text: 'Apenas ler', why: 'Isso. Vale a mais restritiva: Ler.' },
          { text: 'Modificar', why: 'Modificar é a mais permissiva. Pela rede vale a mais restritiva.' },
          { text: 'Controle total', why: 'Nenhuma das duas concede Controle total.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **duas portas em sequência**: a do prédio (compartilhamento) e a da sala (NTFS). Você só faz lá dentro o que **as duas** deixarem. Quem manda é a porta mais fechada.\n\nAtenção: isso vale para o acesso **pela rede**. Quem está sentado no próprio servidor passa só pela porta da sala (NTFS).',
        check: {
          kind: 'choice',
          id: 'cp-r',
          prompt: 'Qual comando do PowerShell exibe a ACL de uma pasta?',
          options: [
            { text: 'Get-Acl', why: 'Isso. E Set-Acl altera.' },
            { text: 'Get-Service', why: 'Get-Service mostra serviços, não permissões.' },
            { text: 'chmod', why: 'chmod é do Linux. No Windows: icacls ou Get-Acl.' },
          ],
          answer: 0,
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Preparar no Linux a pasta /dados/aud2026 para a equipe da auditoria. Ponha os passos na ordem.',
      items: [
        'Criar o grupo aud2026 com a equipe',
        'chown -R lider:aud2026 /dados/aud2026',
        'chmod -R 770 /dados/aud2026',
        'setfacl -R -m g:coordenacao:rX /dados/aud2026',
        'Conferir com ls -l',
      ],
      why: 'Primeiro o grupo existe; depois a pasta passa a ser dele; então as permissões fecham para os outros; por fim a coordenação ganha leitura pela ACL, e tudo é conferido.',
      errorKind: 'procedimento',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais afirmações estão corretas? Marque todas.',
      options: [
        { text: 'A permissão 640 deixa o grupo apenas ler o arquivo', correct: true, why: '6 é do dono (rw); 4 é do grupo (r).' },
        { text: 'Em diretório, x permite entrar com cd', correct: true, why: 'Sem x não se entra.' },
        { text: 'FAT32 tem permissões por usuário como o NTFS', correct: false, why: 'FAT32 não tem ACLs.' },
        { text: 'Pela rede, vale a mais permissiva entre compartilhamento e NTFS', correct: false, why: 'Vale a mais restritiva.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites anotou como proteger a chave privada do servidor. Toque na linha errada.',
      lines: ['chown root:root /etc/ssl/servidor.key', 'chmod 644 /etc/ssl/servidor.key   # só o dono lê e grava', 'ls -l /etc/ssl/servidor.key'],
      bug: 1,
      why: '644 deixa grupo e outros lerem. Para só o dono ler e gravar, o valor é 600.',
      fixed: 'chmod 600 /etc/ssl/servidor.key   # só o dono lê e grava',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'O /tmp precisa ser gravável por todos, sem que um usuário apague o arquivo do outro. Qual configuração atende?',
      scenarios: [
        { title: 'Configuração A', body: '```\nchmod 777 /tmp\n```' },
        { title: 'Configuração B', body: '```\nchmod 1777 /tmp\n```' },
      ],
      answer: 1,
      why: 'O 1 à esquerda liga o sticky bit: todos gravam, mas cada um só apaga o que é seu. Com 777 qualquer um apagaria arquivos dos outros.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: no Windows, a pasta Relatórios está compartilhada com Modificar para o grupo Equipe, e o NTFS dá Controle total ao mesmo grupo. O que a Equipe pode fazer pela rede?',
      options: [
        { text: 'Modificar', why: 'Isso. Entre Modificar e Controle total, vale a mais restritiva.' },
        { text: 'Controle total', why: 'Controle total é a mais permissiva. Pela rede vale a mais restritiva: Modificar.' },
        { text: 'Apenas ler', why: 'Nenhuma das duas camadas limita a leitura. A mais restritiva aqui é Modificar.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.infra.03.005' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.infra.03.006' },
  ],
  summary: [
    'O sistema de arquivos organiza dados, guarda metadados e controla o acesso.',
    'NTFS tem permissões por ACL; FAT32 não tem permissões e limita arquivos a 4 GB; exFAT tira esse limite.',
    'ext4 e XFS são do Linux; journaling recupera a consistência após queda de energia.',
    'No Linux tudo parte de /; discos são montados em diretórios. Logs em /var/log, configurações em /etc.',
    'ln cria hard link; ln -s cria atalho, que quebra se o original sumir.',
    'r=4, w=2, x=1; 750 = rwxr-x---. Em diretório, x é entrar.',
    'chmod muda permissões, chown muda dono e grupo; umask 022 faz arquivos 644 e diretórios 755.',
    'setuid (4), setgid (2) e sticky (1); o /tmp é 1777.',
    'NTFS: herança, Negar prevalece no mesmo nível, e pela rede vale a mais restritiva.',
  ],
};
