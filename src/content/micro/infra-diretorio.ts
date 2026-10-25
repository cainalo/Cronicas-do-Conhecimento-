// Microaula "Active Directory, LDAP, virtualização e containers" (cap.infra.03, seção diretorio), no
// formato aprovado em 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro
// exemplo. Fatos conferidos com o texto do capítulo (04-diretorio-virtualizacao.md). Nomes de domínio,
// usuários e setores são exemplos didáticos. Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microInfraDiretorio: MicroLesson = {
  id: 'micro.infra.diretorio',
  chapterId: 'cap.infra.03',
  sectionId: 'diretorio',
  title: 'Active Directory, LDAP, virtualização e containers',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'O Tribunal tem 900 servidores e 1.200 computadores. Uma pessoa troca a senha uma vez e passa a entrar com ela em qualquer máquina. Onde essa senha precisa estar guardada?',
    options: [
      { text: 'Num cadastro central da rede, consultado por todas as máquinas', why: 'Isso. É o serviço de diretório, como o Active Directory. É por ele que começamos.' },
      { text: 'Em cada um dos 1.200 computadores, copiada à mão', why: 'Seria impossível manter. A rede usa um cadastro central, o serviço de diretório.' },
      { text: 'No pen drive de cada servidor', why: 'Não. Contas e senhas ficam num cadastro central da rede.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'servico-diretorio',
      part: 'Active Directory',
      title: 'O que é um serviço de diretório',
      goal: 'Saber o que um serviço de diretório guarda e quais o edital cita.',
      explain:
        'Um **serviço de diretório** é um banco de dados **hierárquico** e **otimizado para leitura** que guarda informações sobre **usuários, grupos, computadores** e outros recursos da rede.\n\nEle responde perguntas como: "quem é este usuário, qual a senha dele e a que grupos pertence?".\n\nO edital cita o **Active Directory** (da Microsoft) e o **LDAP**, o protocolo padrão de acesso a diretórios. O serviço central do AD se chama **AD DS** (*Active Directory Domain Services*).',
      check: {
        kind: 'choice',
        id: 'sd-c',
        prompt: 'Um serviço de diretório é otimizado principalmente para:',
        options: [
          { text: 'Leitura: responder rápido quem é quem na rede', why: 'Isso. Consultas são muito mais frequentes que alterações.' },
          { text: 'Gravar vídeos e arquivos grandes', why: 'Não. Ele guarda dados de usuários, grupos e computadores, e é otimizado para leitura.' },
          { text: 'Executar programas dos usuários', why: 'Ele guarda informações de identidade; não executa programas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense no **catálogo de servidores do Tribunal**: nome, matrícula, setor, a que equipes pertence. É consultado o dia todo e atualizado de vez em quando. O diretório é esse catálogo, só que da rede, e consultado pelas máquinas a cada logon.',
        check: {
          kind: 'choice',
          id: 'sd-r',
          prompt: 'Qual é o protocolo aberto padrão para acessar diretórios?',
          options: [
            { text: 'LDAP', why: 'Isso. O AD o implementa, assim como o OpenLDAP.' },
            { text: 'NTFS', why: 'NTFS é um sistema de arquivos.' },
            { text: 'cron', why: 'cron agenda tarefas no Linux.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'dominio-dc',
      part: 'Active Directory',
      title: 'Domínio e controlador de domínio',
      goal: 'Diferenciar o domínio do servidor que o hospeda.',
      explain:
        '- **Domínio**: unidade administrativa com um banco de dados de diretório próprio e políticas comuns. Tem nome DNS, como `tribunal.local`.\n- **Controlador de domínio (DC)**: o **servidor** que hospeda uma cópia do banco do AD e **autentica** os usuários. Com vários DCs, as alterações são **replicadas** entre eles.\n\nO AD depende do **DNS**: os computadores encontram os DCs por **registros SRV**.',
      check: {
        kind: 'choice',
        id: 'dc-c',
        prompt: 'Qual servidor autentica os usuários no logon do domínio?',
        options: [
          { text: 'O controlador de domínio (DC)', why: 'Isso. Ele guarda uma cópia do AD e autentica.' },
          { text: 'O servidor de arquivos', why: 'O servidor de arquivos guarda pastas; quem autentica é o DC.' },
          { text: 'Qualquer computador do domínio', why: 'Só os controladores de domínio hospedam o AD e autenticam.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O **domínio** é a "jurisdição" (tribunal.local, com suas regras). O **DC** é o **cartório** que guarda o livro de registros dessa jurisdição. Com vários cartórios, cada anotação feita num é **replicada** nos outros.',
        check: {
          kind: 'choice',
          id: 'dc-r',
          prompt: 'Como os computadores encontram os controladores de domínio na rede?',
          options: [
            { text: 'Pelo DNS, com registros SRV', why: 'Isso. Por isso o AD depende do DNS.' },
            { text: 'Pelo endereço físico gravado em cada máquina', why: 'Não. A localização é feita pelo DNS, com registros SRV.' },
            { text: 'Pelo pen drive de instalação', why: 'Não. É pelo DNS.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'arvore-floresta',
      part: 'Active Directory',
      title: 'Árvore e floresta',
      goal: 'Distinguir árvore de floresta e saber qual é o limite de segurança.',
      explain:
        '- **Árvore**: domínios que compartilham um **espaço de nomes DNS contíguo**, como `tribunal.local` e `auditoria.tribunal.local`.\n- **Floresta**: uma ou mais árvores que compartilham o mesmo **esquema** e o mesmo **catálogo global**. É o **limite de segurança** do AD. O primeiro domínio criado é o **domínio raiz da floresta**.\n\nNo **esquema** ficam as classes de objetos e os atributos aceitos. O **catálogo global** é um índice parcial de todos os objetos da floresta, usado em buscas e no logon.',
      check: {
        kind: 'choice',
        id: 'af-c',
        prompt: 'Qual é o limite de segurança do Active Directory?',
        options: [
          { text: 'A floresta', why: 'Isso. Os domínios dela compartilham esquema e catálogo global.' },
          { text: 'A OU', why: 'A OU organiza objetos dentro de um domínio; não é limite de segurança.' },
          { text: 'O grupo', why: 'Grupo reúne contas para receber permissões.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'De dentro para fora: **domínio** (tribunal.local) → **árvore** (tribunal.local e auditoria.tribunal.local, nomes "da mesma família") → **floresta** (uma ou mais árvores com as **mesmas regras de cadastro**, o esquema, e o **mesmo índice**, o catálogo global).',
        check: {
          kind: 'choice',
          id: 'af-r',
          prompt: 'tribunal.local e auditoria.tribunal.local, com espaço de nomes contíguo, formam:',
          options: [
            { text: 'Uma árvore', why: 'Isso. Nomes DNS contíguos.' },
            { text: 'Uma OU', why: 'OU fica dentro de um domínio.' },
            { text: 'Um grupo de distribuição', why: 'Grupo de distribuição serve a listas de e-mail.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'ou-grupo',
      part: 'Active Directory',
      title: 'OU organiza; grupo recebe permissão',
      goal: 'Não confundir OU com grupo, e grupo de segurança com distribuição.',
      explain:
        '- **Unidade organizacional (OU)**: contêiner dentro de um domínio para **organizar** objetos (por setor, por exemplo), **delegar administração** e **vincular GPOs**.\n- **Grupo**: reúne contas para **receber permissões** em recursos. Grupos de **segurança** recebem permissões; grupos de **distribuição** servem a listas de **e-mail**.\n\nDistinção cobrada: **não se concede permissão numa pasta a uma OU**. A permissão vai para usuários e grupos.',
      check: {
        kind: 'choice',
        id: 'og-c',
        prompt: 'A coordenação precisa ler a pasta Auditorias. A quem se dá a permissão NTFS?',
        options: [
          { text: 'A um grupo de segurança com os coordenadores', why: 'Isso. Permissões vão para usuários e grupos.' },
          { text: 'À OU Coordenação', why: 'Não se concede permissão NTFS a uma OU. Ela organiza, delega e recebe GPO.' },
          { text: 'A um grupo de distribuição', why: 'Grupo de distribuição serve a listas de e-mail, não a permissões.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A **OU** é a **gaveta** onde se guardam as fichas (para arrumar, entregar a gaveta a um responsável e aplicar regras a tudo o que está nela). O **grupo** é a **lista de nomes** que vai na porta da sala dizendo quem entra.',
        check: {
          kind: 'sort',
          id: 'og-r',
          prompt: 'Para cada necessidade, OU ou grupo?',
          categories: ['OU', 'Grupo'],
          items: [
            { text: 'Delegar a um técnico a troca de senhas só do setor de Auditoria', cat: 0, why: 'Delegação se faz na OU.' },
            { text: 'Dar leitura numa pasta à equipe de auditoria', cat: 1, why: 'Permissão em recurso vai para grupo.' },
            { text: 'Aplicar uma GPO só aos computadores da Diretoria', cat: 0, why: 'GPO se vincula à OU.' },
          ],
        },
      },
    },
    {
      id: 'confianca',
      part: 'Active Directory',
      title: 'Relações de confiança',
      goal: 'Saber o que é uma confiança e como ela funciona dentro da floresta.',
      explain:
        'Uma **relação de confiança** permite que usuários de um domínio acessem recursos de outro domínio.\n\nDentro da mesma floresta, as confianças entre domínios são:\n\n- **automáticas** (criadas sem ação do administrador);\n- **bidirecionais** (valem nos dois sentidos);\n- **transitivas** (se A confia em B e B confia em C, A confia em C).',
      example: 'tribunal.local, auditoria.tribunal.local e ti.tribunal.local estão na mesma floresta. Um usuário de auditoria acessa uma pasta em ti, se tiver permissão, sem que ninguém crie a confiança à mão.',
      check: {
        kind: 'choice',
        id: 'cf-c',
        prompt: 'Dentro da mesma floresta, as confianças entre domínios são:',
        options: [
          { text: 'Automáticas, bidirecionais e transitivas', why: 'Isso.' },
          { text: 'Manuais e de um só sentido', why: 'Dentro da floresta são automáticas e valem nos dois sentidos.' },
          { text: 'Inexistentes: cada domínio é isolado', why: 'Os domínios da floresta confiam entre si automaticamente.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: '**Transitiva** é como a confiança entre colegas de um mesmo órgão: se o setor A confia no B, e o B confia no C, então A também confia em C. **Bidirecional** é a confiança mútua. Dentro da floresta, as duas coisas valem automaticamente.',
        check: {
          kind: 'choice',
          id: 'cf-r',
          prompt: 'Na floresta, A confia em B e B confia em C. O que se pode dizer de A e C?',
          options: [
            { text: 'A confia em C, porque a confiança é transitiva', why: 'Isso.' },
            { text: 'A não confia em C, porque não há ligação direta', why: 'Na floresta a confiança é transitiva: passa por B.' },
            { text: 'Só C confia em A', why: 'Além de transitiva, ela é bidirecional.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'gpo',
      part: 'GPO',
      title: 'GPO e a ordem LSDOU',
      goal: 'Saber o que é GPO e qual prevalece em caso de conflito.',
      explain:
        'Uma **GPO** (*Group Policy Object*) é um conjunto de configurações aplicado a usuários e computadores: política de senha, mapeamento de unidades, bloqueio de USB, papel de parede, instalação de software.\n\nAs GPOs são aplicadas na ordem **LSDOU**: **L**ocal, **S**ite, **D**omínio e **OU**, da mais externa para a mais interna.\n\nEm conflito, prevalece a **aplicada por último**, ou seja, a **mais próxima do objeto** (a da OU), salvo as opções **Imposto** (*Enforced*) ou **Bloquear herança**.',
      check: {
        kind: 'choice',
        id: 'gp-c',
        prompt: 'A GPO do domínio libera USB; a GPO da OU Auditoria bloqueia. Sem Imposto nem Bloquear herança, o que vale para um computador da OU Auditoria?',
        options: [
          { text: 'Bloqueado, porque a GPO da OU é aplicada por último', why: 'Isso. LSDOU: a OU vem por último e prevalece.' },
          { text: 'Liberado, porque o domínio é mais importante', why: 'Na ordem LSDOU, a OU é aplicada depois do domínio e prevalece.' },
          { text: 'Depende de qual GPO foi criada primeiro', why: 'O que decide é a ordem LSDOU, não a data de criação.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em ordens que chegam em sequência: primeiro a **local**, depois a do **site**, depois a do **domínio**, por fim a da **OU**. Quem fala por último é quem fica valendo. A exceção é a ordem marcada como **Imposta**, que não pode ser contrariada pelas de baixo.',
        check: {
          kind: 'order',
          id: 'gp-r',
          prompt: 'Ponha as GPOs na ordem em que são aplicadas.',
          items: ['Local', 'Site', 'Domínio', 'OU'],
          why: 'LSDOU: da mais externa para a mais interna. A última aplicada prevalece.',
        },
      },
    },
    {
      id: 'gpo-comandos',
      part: 'GPO',
      title: 'gpupdate e gpresult',
      goal: 'Usar gpupdate /force e gpresult /r no cliente.',
      explain:
        'Dois comandos úteis no computador do usuário:\n\n- **`gpupdate /force`**: **reaplica** as políticas agora, sem esperar o próximo ciclo.\n- **`gpresult /r`**: **mostra** quais GPOs foram aplicadas ao usuário e ao computador.',
      example: 'A nova GPO de bloqueio de USB não parece ter chegado num computador. O técnico roda `gpupdate /force` e depois `gpresult /r` para conferir se ela aparece na lista.',
      check: {
        kind: 'choice',
        id: 'gc-c',
        prompt: 'Qual comando mostra quais GPOs foram aplicadas no computador?',
        options: [
          { text: 'gpresult /r', why: 'Isso. Mostra o resultado das políticas.' },
          { text: 'gpupdate /force', why: 'Esse reaplica as políticas; não lista o resultado.' },
          { text: 'Get-ExecutionPolicy', why: 'Esse mostra a política de scripts do PowerShell.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Os nomes ajudam: **gp*update*** atualiza (aplica de novo); **gp*result*** mostra o resultado. Primeiro se atualiza, depois se confere o resultado.',
        check: {
          kind: 'choice',
          id: 'gc-r',
          prompt: 'Você mudou uma GPO e quer aplicá-la agora no computador, sem esperar:',
          options: [
            { text: 'gpupdate /force', why: 'Isso.' },
            { text: 'gpresult /r', why: 'Esse só mostra o que já foi aplicado.' },
            { text: 'systemctl restart gpo', why: 'Não existe isso no Windows; o comando é gpupdate /force.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'kerberos',
      part: 'Autenticação',
      title: 'Kerberos: TGT e ticket de serviço',
      goal: 'Seguir os três passos do Kerberos no domínio.',
      explain:
        'No domínio, a autenticação padrão é o **Kerberos** (porta **88**). O controlador de domínio atua como **KDC** (*Key Distribution Center*).\n\n1. No logon, o usuário prova sua identidade ao KDC e recebe um **TGT** (*Ticket Granting Ticket*).\n2. Para acessar um serviço (um servidor de arquivos, por exemplo), apresenta o TGT e recebe um **ticket de serviço**.\n3. Apresenta o ticket ao servidor, **sem enviar a senha pela rede**.',
      check: {
        kind: 'choice',
        id: 'kb-c',
        prompt: 'No Kerberos, o que o usuário recebe do KDC logo no logon?',
        options: [
          { text: 'O TGT', why: 'Isso. Com ele, pede depois os tickets de serviço.' },
          { text: 'O ticket do servidor de arquivos', why: 'Esse vem depois, quando ele pede acesso ao serviço, apresentando o TGT.' },
          { text: 'A senha dos outros usuários', why: 'Não. E a própria senha nem é enviada aos servidores.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense num **parque com brinquedos**: na entrada, você mostra o documento e ganha uma **pulseira** (TGT). Em cada brinquedo, mostra a pulseira no guichê e recebe o **ingresso daquele brinquedo** (ticket de serviço). Você não mostra o documento de novo em cada fila.',
        check: {
          kind: 'order',
          id: 'kb-r',
          prompt: 'Ponha os passos do Kerberos na ordem.',
          items: ['Provar a identidade ao KDC e receber o TGT', 'Apresentar o TGT e receber o ticket de serviço', 'Apresentar o ticket ao servidor de arquivos'],
          why: 'Primeiro o TGT, depois o ticket do serviço, por fim o acesso.',
        },
      },
    },
    {
      id: 'kerberos-relogio',
      part: 'Autenticação',
      title: 'Relógios sincronizados e o NTLM',
      goal: 'Saber por que o Kerberos exige relógios certos e o que é o NTLM.',
      explain:
        'Os tickets do Kerberos têm **validade**. Por isso ele exige **relógios sincronizados** entre as máquinas. Por padrão, o AD tolera diferença de até **5 minutos**.\n\nO **NTLM** é o protocolo **legado**, ainda aceito para compatibilidade.',
      example: 'Um notebook com o relógio 12 minutos atrasado não consegue autenticar no domínio. Corrigida a hora, o logon volta a funcionar.',
      check: {
        kind: 'choice',
        id: 'kr-c',
        prompt: 'Por padrão, qual diferença de relógio o AD tolera para o Kerberos?',
        options: [
          { text: 'Até 5 minutos', why: 'Isso.' },
          { text: 'Até 5 horas', why: 'Muito mais que o padrão. São 5 minutos.' },
          { text: 'Qualquer diferença, porque o Kerberos não usa o relógio', why: 'Usa: os tickets têm validade, por isso os relógios precisam estar sincronizados.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Um ingresso com **horário de validade** só funciona se o porteiro e você concordarem sobre que horas são. Se o relógio do computador está muito diferente do relógio do DC, o ticket parece vencido (ou ainda não válido).',
        check: {
          kind: 'choice',
          id: 'kr-r',
          prompt: 'Qual é o protocolo de autenticação legado, ainda aceito por compatibilidade?',
          options: [
            { text: 'NTLM', why: 'Isso.' },
            { text: 'Kerberos', why: 'Kerberos é o padrão atual no domínio.' },
            { text: 'LDAPS', why: 'LDAPS é LDAP sobre TLS.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'ldap-portas',
      part: 'LDAP',
      title: 'LDAP 389, LDAPS 636 e StartTLS',
      goal: 'Memorizar as portas do LDAP e as formas de proteger a conexão.',
      explain:
        'O **LDAP** é um protocolo aberto para consultar e alterar diretórios. O AD o implementa, assim como o OpenLDAP. Sistemas web, VPN e Wi-Fi corporativo usam LDAP para autenticar usuários.\n\n| Uso | Porta |\n|---|---|\n| LDAP | **389** (TCP) |\n| LDAPS (LDAP sobre TLS) | **636** |\n| Catálogo global do AD | 3268 (3269 com TLS) |\n\nTambém é possível iniciar TLS na **própria porta 389**, com a operação **StartTLS**.',
      check: {
        kind: 'choice',
        id: 'lp-c',
        prompt: 'Qual porta usa o LDAPS?',
        options: [
          { text: '636', why: 'Isso. LDAP comum é 389.' },
          { text: '389', why: '389 é o LDAP comum. LDAPS é 636.' },
          { text: '88', why: '88 é o Kerberos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Duas portas, duas formas de proteger:\n\n- **LDAPS**: já começa protegido, na **636**.\n- **StartTLS**: começa na **389** e, em seguida, liga a proteção TLS na mesma conexão.',
        check: {
          kind: 'sort',
          id: 'lp-r',
          prompt: 'Qual porta?',
          categories: ['389', '636', '88'],
          items: [
            { text: 'LDAP comum', cat: 0, why: 'LDAP usa 389.' },
            { text: 'LDAPS', cat: 1, why: 'LDAP sobre TLS usa 636.' },
            { text: 'Kerberos', cat: 2, why: 'Kerberos usa 88.' },
          ],
        },
      },
    },
    {
      id: 'dn',
      part: 'LDAP',
      title: 'Lendo um DN: CN, OU e DC',
      goal: 'Ler um nome distinto do mais específico ao mais geral.',
      explain:
        'Cada entrada do diretório é identificada pelo **nome distinto (DN)**, o caminho completo na árvore, **do mais específico ao mais geral**:\n\n```\nCN=Maria Souza,OU=Auditoria,DC=tribunal,DC=local\n```\n\n| Sigla | Significado |\n|---|---|\n| `CN` | Nome comum (usuário, grupo, computador) |\n| `OU` | Unidade organizacional |\n| `DC` | Componente de domínio (cada parte do nome DNS) |',
      check: {
        kind: 'choice',
        id: 'dn-c',
        prompt: 'No DN CN=João Lima,OU=TI,DC=tribunal,DC=local, em que OU está João?',
        options: [
          { text: 'TI', why: 'Isso. OU=TI.' },
          { text: 'tribunal', why: 'tribunal é um componente de domínio (DC), parte de tribunal.local.' },
          { text: 'João Lima', why: 'João Lima é o nome comum (CN), o próprio usuário.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Leia o DN como um **endereço de carta escrito ao contrário**: primeiro a pessoa (CN), depois o setor (OU), depois a cidade e o estado (DC=tribunal, DC=local). Cada `DC` é um pedaço do nome DNS: `tribunal.local` vira `DC=tribunal,DC=local`.',
        check: {
          kind: 'choice',
          id: 'dn-r',
          prompt: 'O domínio auditoria.tribunal.local aparece num DN como:',
          options: [
            { text: 'DC=auditoria,DC=tribunal,DC=local', why: 'Isso. Cada parte do nome DNS vira um DC.' },
            { text: 'OU=auditoria.tribunal.local', why: 'OU é unidade organizacional; partes do domínio são DC.' },
            { text: 'CN=auditoria,CN=tribunal', why: 'CN é nome comum; partes do domínio são DC.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'ldap-operacoes',
      part: 'LDAP',
      title: 'Operações e o risco do simple bind',
      goal: 'Conhecer as operações do LDAP e por que usar LDAPS ou StartTLS.',
      explain:
        'Operações: ***bind*** (autenticar a sessão), ***search*** (buscar com base, escopo e filtro), *add*, *modify*, *delete* e *compare*.\n\nUm ***simple bind* na porta 389 sem TLS envia a senha em texto claro**. Por isso as integrações devem usar **LDAPS** ou **StartTLS**.\n\nOs dados são trocados no formato **LDIF**; a ferramenta clássica de linha de comando é o **`ldapsearch`**. Um filtro tem esta forma:\n\n`(&(objectClass=user)(sAMAccountName=msouza))`',
      check: {
        kind: 'choice',
        id: 'lo-c',
        prompt: 'Um sistema web autentica usuários por simple bind na porta 389, sem TLS. Qual é o risco?',
        options: [
          { text: 'A senha trafega em texto claro na rede', why: 'Isso. A correção é usar LDAPS (636) ou StartTLS.' },
          { text: 'Nenhum, porque o LDAP sempre criptografa', why: 'Sem TLS, o simple bind envia a senha em texto claro.' },
          { text: 'A conta é apagada do diretório', why: 'Não. O risco é a senha passar sem proteção.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O *bind* é o momento em que o sistema diz ao diretório "sou fulano, minha senha é tal". Sem TLS, isso é como falar a senha **em voz alta no corredor**. Com LDAPS ou StartTLS, a conversa vai **em envelope lacrado**.',
        check: {
          kind: 'choice',
          id: 'lo-r',
          prompt: 'Qual operação LDAP autentica a sessão?',
          options: [
            { text: 'bind', why: 'Isso.' },
            { text: 'search', why: 'search busca entradas.' },
            { text: 'modify', why: 'modify altera uma entrada.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'hipervisores',
      part: 'Virtualização',
      title: 'Hipervisor tipo 1 e tipo 2',
      goal: 'Classificar hipervisores pelo lugar onde rodam.',
      explain:
        'A **virtualização** faz uma máquina física executar várias **máquinas virtuais** (VMs), cada uma com seu sistema operacional. Quem cria e controla as VMs é o **hipervisor**.\n\n| | Tipo 1 (nativo, *bare metal*) | Tipo 2 (hospedado) |\n|---|---|---|\n| Roda | **Direto no hardware** | **Sobre um sistema operacional** |\n| Desempenho | Maior | Menor |\n| Uso | Datacenters, produção | Estações, testes |\n| Exemplos | VMware ESXi, Hyper-V, Xen, KVM | VirtualBox, VMware Workstation |',
      check: {
        kind: 'choice',
        id: 'hv-c',
        prompt: 'O VirtualBox, instalado como programa no Windows do analista, é um hipervisor:',
        options: [
          { text: 'Tipo 2, porque roda sobre um sistema operacional', why: 'Isso.' },
          { text: 'Tipo 1, porque cria máquinas virtuais', why: 'Os dois tipos criam VMs. O que define é onde roda: o VirtualBox roda sobre um SO.' },
          { text: 'Não é hipervisor; é um container', why: 'Ele cria VMs completas; é hipervisor tipo 2.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pergunte: **o que está embaixo do hipervisor?** Se for o **hardware**, é tipo 1. Se for **outro sistema operacional**, é tipo 2.\n\nAtenção: a classificação do **KVM** é discutida; costuma aparecer como tipo 1, porque transforma o próprio núcleo Linux em hipervisor. Leia o critério do enunciado.',
        check: {
          kind: 'sort',
          id: 'hv-r',
          prompt: 'Classifique cada hipervisor.',
          categories: ['Tipo 1', 'Tipo 2'],
          items: [
            { text: 'VMware ESXi', cat: 0, why: 'Roda direto no hardware.' },
            { text: 'Microsoft Hyper-V', cat: 0, why: 'Tipo 1.' },
            { text: 'Oracle VirtualBox', cat: 1, why: 'Roda sobre um SO.' },
            { text: 'VMware Workstation', cat: 1, why: 'Roda sobre um SO.' },
          ],
        },
      },
    },
    {
      id: 'recursos-vm',
      part: 'Virtualização',
      title: 'VT-x, snapshot e migração ao vivo',
      goal: 'Conhecer os recursos típicos e saber que snapshot não é backup.',
      explain:
        '- **Intel VT-x** e **AMD-V**: extensões do processador que **aceleram** a virtualização.\n- **Paravirtualização**: o sistema convidado é **modificado** para cooperar com o hipervisor.\n- **Snapshot**: registro do estado da VM num momento, útil antes de uma atualização.\n- **Clonagem e modelos** (*templates*).\n- **Migração ao vivo**: mover uma VM entre hosts **sem desligá-la**.\n\n**Snapshot não substitui backup**: em geral ele depende dos discos da própria VM e fica no mesmo armazenamento.',
      check: {
        kind: 'choice',
        id: 'rv-c',
        prompt: 'Antes de atualizar o sistema de uma VM, o técnico tira um snapshot. Isso dispensa o backup?',
        options: [
          { text: 'Não: o snapshot depende dos discos da VM e fica no mesmo armazenamento', why: 'Isso. Se o armazenamento falhar, perde-se a VM e o snapshot juntos.' },
          { text: 'Sim: snapshot e backup são a mesma coisa', why: 'Não são. Snapshot é um ponto de retorno; backup é uma cópia independente.' },
          { text: 'Sim, se o snapshot for tirado à noite', why: 'O horário não muda a natureza do snapshot.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O **snapshot** é um **marcador de página** no próprio livro: ótimo para voltar ao ponto antes da atualização. O **backup** é uma **cópia do livro guardada em outro prédio**. Se o livro pega fogo, o marcador vai junto.',
        check: {
          kind: 'choice',
          id: 'rv-r',
          prompt: 'Mover uma VM de um servidor físico para outro sem desligá-la chama-se:',
          options: [
            { text: 'Migração ao vivo', why: 'Isso.' },
            { text: 'Paravirtualização', why: 'Paravirtualização é o convidado modificado para cooperar com o hipervisor.' },
            { text: 'Snapshot', why: 'Snapshot registra o estado da VM num momento.' },
          ],
          answer: 0,
        },
      },
    },
    {
      id: 'containers',
      part: 'Containers',
      title: 'Containers: namespaces e cgroups',
      goal: 'Saber que containers compartilham o núcleo e quais recursos os isolam.',
      explain:
        'Um **container** isola processos **compartilhando o núcleo** do sistema hospedeiro, sem um sistema operacional convidado completo. No Linux, a base são dois recursos do núcleo:\n\n- **Namespaces**: dão ao container uma **visão própria** de processos (PID), rede, pontos de montagem, nome do host, usuários e comunicação entre processos.\n- **cgroups** (*control groups*): **limitam e contabilizam** CPU, memória e E/S.\n\nAntecessores e variantes: `chroot`, FreeBSD Jails, Solaris Zones e **LXC**.',
      check: {
        kind: 'choice',
        id: 'ct-c',
        prompt: 'Qual recurso do Linux limita quanta memória e CPU um container pode usar?',
        options: [
          { text: 'cgroups', why: 'Isso. Limitam e contabilizam recursos.' },
          { text: 'namespaces', why: 'Namespaces dão a visão isolada (PID, rede, montagem); limitar recursos é dos cgroups.' },
          { text: 'snapshot', why: 'Snapshot é recurso de VM, não de limite de memória.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em salas num mesmo prédio. **Namespaces** são as **paredes**: cada sala vê só os seus móveis (processos, rede, arquivos). **cgroups** são os **medidores de luz e água**: cada sala só pode gastar até um limite. O prédio (o núcleo) é um só.',
        check: {
          kind: 'sort',
          id: 'ct-r',
          prompt: 'Namespaces ou cgroups?',
          categories: ['Namespaces', 'cgroups'],
          items: [
            { text: 'O container vê só os próprios processos', cat: 0, why: 'Visão isolada de PID.' },
            { text: 'O container não passa de 512 MB de memória', cat: 1, why: 'Limite de recurso.' },
            { text: 'O container tem sua própria interface de rede', cat: 0, why: 'Namespace de rede.' },
          ],
        },
      },
    },
    {
      id: 'vm-container',
      part: 'Containers',
      title: 'Máquina virtual ou container',
      goal: 'Comparar VM e container em isolamento, peso e sistema convidado.',
      explain:
        '| | Máquina virtual | Container |\n|---|---|---|\n| Isola | Um **sistema operacional inteiro** | **Processos** sobre o mesmo núcleo |\n| Peso e início | Gigabytes; minutos | Megabytes; segundos |\n| Isolamento | **Mais forte** (núcleos separados) | Menor (núcleo compartilhado) |\n| Convidado | Qualquer um suportado pelo hipervisor | Precisa ser **compatível com o núcleo** do hospedeiro |\n\nO Windows tem containers próprios, com isolamento de processo ou isolamento Hyper-V (cada container numa VM leve).',
      example: 'No Tribunal: servidores de produção como VMs num cluster com hipervisor tipo 1; VirtualBox nos notebooks dos analistas para testes; sistemas web em containers. Todos autenticam no AD por LDAPS, porta 636.',
      check: {
        kind: 'choice',
        id: 'vc-c',
        prompt: 'Qual oferece isolamento mais forte entre os ambientes?',
        options: [
          { text: 'A máquina virtual, porque cada uma tem seu próprio núcleo', why: 'Isso.' },
          { text: 'O container, porque é mais leve', why: 'Mais leve, sim, mas compartilha o núcleo: o isolamento é menor.' },
          { text: 'Os dois isolam igualmente', why: 'Não. VMs têm núcleos separados; containers compartilham o núcleo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**VM** é uma **casa separada**: paredes grossas, demora para construir, cabe qualquer estilo. **Container** é um **apartamento no mesmo prédio**: fica pronto rápido e é leve, mas divide a estrutura (o núcleo) com os vizinhos.',
        check: {
          kind: 'sort',
          id: 'vc-r',
          prompt: 'Máquina virtual ou container?',
          categories: ['Máquina virtual', 'Container'],
          items: [
            { text: 'Inicia em segundos e ocupa megabytes', cat: 1, why: 'Container é leve.' },
            { text: 'Pode rodar um sistema com núcleo diferente do hospedeiro', cat: 0, why: 'Cada VM tem seu núcleo.' },
            { text: 'Compartilha o núcleo do hospedeiro', cat: 1, why: 'É a definição de container.' },
          ],
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Um usuário faz logon no domínio e abre uma pasta no servidor de arquivos. Ponha na ordem.',
      items: [
        'O computador localiza o DC pelo DNS (registro SRV)',
        'O usuário prova a identidade ao KDC e recebe o TGT',
        'Com o TGT, obtém o ticket de serviço do servidor de arquivos',
        'Apresenta o ticket ao servidor de arquivos',
        'O servidor confere as permissões NTFS do grupo do usuário',
      ],
      why: 'Achar o DC, autenticar (TGT), pedir o ticket do serviço, apresentá-lo e só então valem as permissões.',
      errorKind: 'procedimento',
    },
    {
      kind: 'multi',
      id: 'cons-2',
      prompt: 'Quais afirmações estão corretas? Marque todas.',
      options: [
        { text: 'A floresta é o limite de segurança do AD', correct: true, why: 'Seus domínios compartilham esquema e catálogo global.' },
        { text: 'Containers Linux compartilham o núcleo e usam namespaces e cgroups', correct: true, why: 'É a base dos containers.' },
        { text: 'Pode-se dar permissão NTFS diretamente a uma OU', correct: false, why: 'Permissão vai para usuários e grupos.' },
        { text: 'LDAPS usa a porta 389', correct: false, why: 'LDAP é 389; LDAPS é 636.' },
      ],
      errorKind: 'confusao',
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'Brites anotou a configuração segura da integração do sistema web com o AD. Toque na linha errada.',
      lines: ['Servidor: dc01.tribunal.local', 'Protocolo: LDAPS, porta 389', 'Base de busca: OU=Auditoria,DC=tribunal,DC=local'],
      bug: 1,
      why: 'LDAPS usa a porta 636. Na 389 só seria seguro com StartTLS.',
      fixed: 'Protocolo: LDAPS, porta 636',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-4',
      prompt: 'O Tribunal quer bloquear USB só nos computadores da Diretoria de Auditoria e deixar um técnico do setor trocar as senhas dos usuários de lá. Qual solução?',
      scenarios: [
        { title: 'Solução A', body: 'Criar a OU Auditoria com os computadores e usuários do setor, vincular a ela uma GPO de bloqueio de USB e delegar ao técnico a redefinição de senhas nessa OU.' },
        { title: 'Solução B', body: 'Criar um grupo de distribuição Auditoria, dar a ele a permissão NTFS "Bloquear USB" e colocar o técnico no grupo Administradores do domínio.' },
      ],
      answer: 0,
      why: 'GPO se vincula à OU, e a delegação limitada também se faz na OU. Grupo de distribuição serve a e-mail, e Administradores do domínio dá poder sobre o domínio inteiro.',
      errorKind: 'conceito',
    },
    {
      kind: 'choice',
      id: 'cons-5',
      prompt: 'Situação nova: o analista quer testar uma atualização no próprio notebook, com Windows, antes de levá-la à produção. O que é mais adequado?',
      options: [
        { text: 'Uma VM num hipervisor tipo 2, como o VirtualBox', why: 'Isso. Tipo 2 é o típico de estações e testes.' },
        { text: 'Instalar o VMware ESXi por cima do Windows do notebook', why: 'ESXi é tipo 1: roda direto no hardware, não sobre o Windows.' },
        { text: 'Tirar um snapshot do servidor de produção e considerar isso o teste', why: 'Snapshot não é ambiente de teste nem substitui backup.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.infra.03.012' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.infra.03.013' },
  ],
  summary: [
    'Serviço de diretório: banco hierárquico, otimizado para leitura, de usuários, grupos e computadores.',
    'Domínio, DC (autentica e replica), árvore (DNS contíguo) e floresta (limite de segurança).',
    'OU organiza, delega e recebe GPO; grupo de segurança recebe permissões.',
    'GPO na ordem LSDOU: a da OU, aplicada por último, prevalece. gpupdate /force e gpresult /r.',
    'Kerberos (porta 88): TGT, ticket de serviço, sem senha na rede; relógios com até 5 minutos de diferença.',
    'LDAP 389, LDAPS 636, StartTLS na 389. DN: CN, OU, DC. Simple bind sem TLS expõe a senha.',
    'Hipervisor tipo 1 no hardware; tipo 2 sobre um SO. Snapshot não é backup.',
    'Containers compartilham o núcleo: namespaces isolam, cgroups limitam. VM isola mais.',
  ],
};
