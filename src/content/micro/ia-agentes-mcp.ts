// Microaulas graduais de cap.ia.02: agentes, ciclo agentivo, MCP, skills e qualidade.
// A primeira aula de cada trecho apresenta a história; todas têm checagem, recuperação e prática.
// Revisão editorial humana pendente.
import type { MicroLesson } from '@/content/types';
import type { MissionActivity } from '@/lib/activities';

type Q = { prompt: string; correct: string; wrong: [string, string]; answer: 0 | 1 | 2; why: string };
type L = {
 id:string; section:'agentes'|'ciclo'|'mcp'|'skills'|'qualidade'; group:string; order:number; title:string;
 history:string; core:string; application:string; q1:Q; q2:Q; questions:string[]; summary:[string,string,string]
};
const base={
 agentes:{chapterId:'cap.ia.02',sectionId:'agentes'},
 ciclo:{chapterId:'cap.ia.02',sectionId:'ciclo'},
 mcp:{chapterId:'cap.ia.02',sectionId:'mcp'},
 skills:{chapterId:'cap.ia.02',sectionId:'skills'},
 qualidade:{chapterId:'cap.ia.02',sectionId:'qualidade'},
} as const;
function activity(q:Q,id:string):MissionActivity{
 const options:string[]=[]; const reasons:string[]=[]; const spare=[0,1,2].filter(i=>i!==q.answer);
 options[q.answer]=q.correct; reasons[q.answer]=q.why;
 options[spare[0]]=q.wrong[0]; reasons[spare[0]]='Essa alternativa confunde conceitos ou ignora uma condição importante.';
 options[spare[1]]=q.wrong[1]; reasons[spare[1]]='Essa alternativa não corresponde ao conceito apresentado.';
 return {kind:'choice',id,prompt:q.prompt,options:options.map((text,i)=>({text,why:reasons[i]})),answer:q.answer,errorKind:'conceito'};
}
function variant(q:Q,prefix:string):Q{
 return {...q,prompt:prefix+q.prompt,wrong:[q.wrong[1],q.wrong[0]+' — sem verificar o resultado']};
}
function build(l:L):MicroLesson{
 const first={id:'base',part:l.order===1?'A história':'Fundamentos',title:l.order===1?'Como surgiu '+l.title:l.title,
  goal:'Compreender a ideia principal de '+l.title+'.',explain:l.history+'\n\n'+l.core,art:l.section==='mcp'?'rede' as const:'livro' as const,
  check:activity(l.q1,l.id+'-base-check'),recovery:{explain:'Retome a ideia central: '+l.core,check:activity(variant(l.q1,'Em outro caso: '),l.id+'-base-recovery')}};
 const second={id:'aplicar',part:'Aplicação prática',title:'Aplicar '+l.title,goal:'Usar o conceito em uma situação concreta.',
  explain:l.application,art:l.section==='qualidade'?'cadeado' as const:'engrenagem' as const,
  check:activity(l.q2,l.id+'-apply-check'),recovery:{explain:'Compare a situação com o princípio: '+l.application,check:activity(variant(l.q2,'Em uma nova situação: '),l.id+'-apply-recovery')}};
 const transferQ:Record<L['section'],Q>={
  agentes:{prompt:'Ao transferir essa tarefa para outro arquivo, o que mantém o agente seguro?',correct:'Conferir escopo, permissão e retorno da ferramenta antes de concluir.',wrong:['Aceitar o resumo sem verificar.','Executar qualquer comando que pareça útil.'],answer:0,why:'A ação precisa respeitar o escopo e a evidência do resultado.'},
  ciclo:{prompt:'O teste falha após a mudança. Qual próximo passo respeita o ciclo?',correct:'Analisar o resultado, rever a hipótese e ajustar o plano.',wrong:['Publicar sem nova verificação.','Apagar o teste para terminar.'],answer:0,why:'A evidência indica se é preciso voltar à investigação ou ao planejamento.'},
  mcp:{prompt:'Antes de conectar um novo servidor, qual controle é adequado?',correct:'Conferir a origem, o escopo de acesso e as permissões.',wrong:['Confiar no servidor só porque usa MCP.','Compartilhar credenciais administrativas.'],answer:0,why:'O protocolo padroniza a comunicação, mas não atesta confiança.'},
  skills:{prompt:'Uma regra precisa ser aplicada em toda execução. Qual desenho é mais confiável?',correct:'Usar permissão ou hook automático, além de explicar a regra na instrução.',wrong:['Depender apenas de texto num prompt.','Copiar uma instrução diferente para cada conversa.'],answer:0,why:'Um controle executado pela aplicação reduz dependência da memória.'},
  qualidade:{prompt:'O código gerado compila, mas precisa ir para produção. O que ainda é necessário?',correct:'Conferir testes, dependências, dados e aprovação humana.',wrong:['Publicar apenas porque o build passou.','Tratar o modelo como responsável final.'],answer:0,why:'Build é uma evidência, não comprova sozinho todos os requisitos.'},
 };
 const tq=transferQ[l.section];
 const third={id:'transferir',part:'Síntese',title:'Transferir para um cenário novo',goal:'Aplicar o conceito em uma nova situação e conferir evidências.',
  explain:'Use o mesmo princípio em outro cenário: '+l.application+' A conclusão precisa indicar qual evidência confirma que o comportamento atende ao objetivo. Se o resultado divergir, revise a hipótese ou peça esclarecimento antes de declarar a tarefa concluída.',
  art:'revisao' as const,check:activity(tq,l.id+'-transfer-check'),
  recovery:{explain:'Na recuperação, retorne ao critério de aceite e identifique qual observação comprova a conclusão; não aceite uma afirmação sem evidência.',
   check:activity(variant(tq,'Em outro cenário, qual decisão é mais segura? '),l.id+'-transfer-recovery')}};
 return {...base[l.section],id:l.id,series:{id:l.group,order:l.order},title:l.title,
  opening:activity({...l.q1,prompt:'Antes da explicação: '+l.q1.prompt},l.id+'-abertura'),steps:[first,second,third],
  consolidation:[
   {kind:'sort',id:'classificar',prompt:'Classifique as afirmações sobre '+l.title+'.',categories:['Correta','Erro comum'],items:[
    {text:l.q1.correct,cat:0,why:l.q1.why},{text:l.q1.wrong[0],cat:1,why:'Essa alternativa contraria a ideia central.'},{text:l.q2.wrong[1],cat:1,why:'Essa alternativa ignora um controle ou uso correto.'}]},
   {kind:'fix',id:'depurar',prompt:'A anotação contém um erro. Toque na linha errada.',lines:[l.q1.correct,l.q2.correct,l.q2.wrong[1]],bug:2,why:l.q2.why,fixed:l.q2.correct,errorKind:'conceito'},
   {kind:'compare',id:'comparar',prompt:'Qual decisão aplica melhor '+l.title+'?',scenarios:[
    {title:'Opção A',body:l.q2.correct+' '+l.q2.why},{title:'Opção B',body:'Aceitar uma resposta sem verificar evidências, autorização ou critérios de aceite.'}],
    answer:0,why:'A decisão precisa corresponder ao conceito e ser verificável.',errorKind:'procedimento'}],
  exam:l.questions.map((questionId,i)=>({kind:'exam',id:'fixacao-'+(i+1),prompt:'Questão de fixação',questionId})),summary:[...l.summary]};
}
const lessons:L[]=[
{id:'ia.agentes.1',section:'agentes',group:'ia.agentes',order:1,title:'De ReAct ao uso de ferramentas',
 history:'Em 2022, a pesquisa ReAct explorou a combinação de raciocínio, ações externas e observações. Em junho de 2023, a OpenAI anunciou function calling; em maio de 2024, o uso de ferramentas do Claude tornou-se geralmente disponível na API da Anthropic.',
 core:'ReAct estudou a alternância entre raciocínio e ação: o sistema propõe uma operação, recebe o resultado e usa essa evidência para decidir o próximo passo. É uma referência de pesquisa, não o nome oficial das quatro fases do ciclo do edital.',
 application:'Chamadas estruturadas de ferramentas trazem um nome de função e argumentos que a aplicação pode validar. O host continua responsável por permissões, execução e retorno; o formato não garante que a decisão do modelo esteja correta.',
 q1:{prompt:'Qual ideia caracteriza ReAct?',correct:'Intercalar raciocínio com ações e observações do ambiente.',wrong:['Substituir testes por uma resposta em texto.','Ignorar o retorno das ferramentas.'],answer:0,why:'A observação da ação influencia a decisão seguinte.'},
 q2:{prompt:'O que acrescenta uma chamada estruturada de ferramenta?',correct:'Um pedido com nome e argumentos que a aplicação pode validar.',wrong:['Garantia de que o modelo nunca erra.','Execução automática sem passar pelo host.'],answer:0,why:'A aplicação valida e executa ou recusa a solicitação.'},
 questions:[],summary:['ReAct (2022) estudou raciocínio intercalado com ações e observações.','Function calling (2023) e tool use no Claude (2024) ampliaram pedidos estruturados.','O modelo solicita; a aplicação controla permissões e executa ou recusa.']},
{id:'ia.agentes.2',section:'agentes',group:'ia.agentes',order:2,title:'Componentes de um agente',
 history:'Agentes modernos combinam modelo, ferramentas, contexto, memória e controles para percorrer objetivos em ciclos, em vez de só responder a uma pergunta por vez.',
 core:'Um agente combina um modelo que escolhe próximos passos; ferramentas que leem ou alteram recursos; um laço que devolve resultados; contexto do projeto; e controles como permissões e aprovações. Sem ação e observação, o sistema se aproxima de um assistente que apenas responde.',
 application:'No tool use, a aplicação apresenta ferramentas e parâmetros. O modelo pede uma função; o host valida argumentos, aplica permissões, executa e devolve o resultado. Isso limita ações perigosas e cria rastreabilidade.',
 q1:{prompt:'Qual combinação descreve melhor um agente?',correct:'Objetivo, modelo, ferramentas, retorno e controles.',wrong:['Só um prompt grande, sem ferramenta nem retorno.','Uma ferramenta sem objetivo ou contexto.'],answer:0,why:'Esses componentes permitem decidir, agir, observar e controlar.'},
 q2:{prompt:'Antes de uma ferramenta alterar arquivos, convém:',correct:'Validar argumentos e permissões e confirmar quando o risco exigir.',wrong:['Confiar sempre no pedido do modelo.','Apagar logs para acelerar.'],answer:0,why:'A aplicação deve limitar ações e registrar o que ocorreu.'},
 questions:['q.ia.02.001','q.ia.02.002'],summary:['Agente combina objetivo, decisão, ferramentas, observação e ciclo de execução.','O modelo solicita ações; a aplicação hospedeira executa ou recusa.','Validação, permissões e registros são controles fundamentais.']},
{id:'ia.agentes.3',section:'agentes',group:'ia.agentes',order:3,title:'Programação por intenção e revisão',
 history:'O trabalho com agentes desloca parte do esforço de digitar cada linha para especificar resultados, revisar mudanças e validar testes; a responsabilidade pela aprovação continua humana.',
 core:'Na programação baseada em intenção, a pessoa descreve resultado e critérios de aceite; o agente propõe a implementação. Vibe coding descreve uma delegação mais solta, com pouca leitura do código gerado — arriscada em sistemas de produção.',
 application:'CLI trabalha no terminal; IDE integra o agente ao editor, aos arquivos e aos diagnósticos. A interface não garante qualidade: revisar o diff, executar testes e conferir permissões continuam necessários.',
 q1:{prompt:'O que caracteriza programação baseada em intenção?',correct:'Definir resultado e critérios e deixar o agente propor a implementação.',wrong:['Aceitar código sem comportamento esperado.','Proibir testes para não limitar o modelo.'],answer:0,why:'A pessoa continua responsável pela especificação e validação.'},
 q2:{prompt:'Antes de aceitar uma grande mudança, convém:',correct:'Revisar o diff, conferir os testes e comparar com o pedido.',wrong:['Ler apenas o resumo do agente.','Supor que está correto se a tela abre.'],answer:0,why:'Isso confronta a implementação com evidências.'},
 questions:['q.ia.02.006'],summary:['Programação por intenção descreve resultado e critérios; o agente propõe a implementação.','CLI e IDE são interfaces, não garantias de correção.','A pessoa continua responsável por revisar e testar.']},
{id:'ia.ciclo.1',section:'ciclo',group:'ia.ciclo',order:1,title:'Da ação observada ao ciclo agentivo',
 history:'A pesquisa ReAct, publicada em 2022, estudou raciocínio alternado com ações externas. O ciclo de desenvolvimento do edital organiza o trabalho em quatro fases práticas: contexto, planejamento, execução e verificação.',
 core:'O resultado de uma busca ou teste pode exigir nova investigação. As quatro fases do edital são um procedimento de trabalho; ReAct é uma referência histórica para a combinação de raciocínio e ação, não a autoria dessas quatro fases.',
 application:'O ciclo tem quatro fases: descoberta e coleta de contexto; planejamento e decisão; execução; verificação e autocorreção. Se o resultado não atende ao requisito, o agente retorna à fase relevante e ajusta o plano.',
 q1:{prompt:'Por que o agente pode voltar ao contexto depois de um teste?',correct:'O resultado pode revelar informação ausente ou uma hipótese errada.',wrong:['Todas as etapas reiniciam mesmo quando tudo passa.','Testes não oferecem informação.'],answer:0,why:'A evidência pode mudar a decisão seguinte.'},
 q2:{prompt:'Qual é a sequência do ciclo?',correct:'Contexto, planejamento, ação, verificação e autocorreção.',wrong:['Ação, publicação, apagar testes e contexto.','Publicar e encerrar sem verificar.'],answer:0,why:'Essa é a sequência de alto nível descrita no capítulo.'},
 questions:[],summary:['ReAct (2022) estudou alternância entre raciocínio e ação.','O ciclo inclui contexto, planejamento, execução e verificação/autocorreção.','A evidência pode exigir retorno a uma fase anterior.']},
{id:'ia.ciclo.2',section:'ciclo',group:'ia.ciclo',order:2,title:'Investigar e planejar antes de editar',
 history:'Agentes de programação precisam investigar estrutura, instruções, usos e testes antes de alterar código, para evitar mudanças duplicadas ou no arquivo errado.',
 core:'Na descoberta, o agente examina estrutura de pastas, instruções, arquivos relacionados, testes e histórico do Git. O objetivo não é ler tudo, mas encontrar informações que afetam a tarefa.',
 application:'O planejamento transforma o objetivo em passos e define como provar a correção. Deve ser proporcional ao risco: uma mudança pequena exige poucas etapas; uma migração ou publicação pede verificações adicionais.',
 q1:{prompt:'Qual conjunto ajuda a investigar um defeito?',correct:'Código responsável, usos, instruções e testes relevantes.',wrong:['Só o nome do repositório.','Apenas a hipótese da tentativa anterior.'],answer:0,why:'Isso estabelece contexto verificável.'},
 q2:{prompt:'O que torna um plano verificável?',correct:'Cada etapa tem resultado observável, como teste ou diff.',wrong:['O plano promete sucesso sem evidências.','O plano proíbe mudar mesmo se os testes falharem.'],answer:0,why:'Resultados observáveis permitem conferir o avanço.'},
 questions:['q.ia.02.003'],summary:['Descoberta examina instruções, arquivos, usos, testes e histórico.','Planejamento divide o objetivo em passos verificáveis.','O plano pode mudar com a evidência.']},
{id:'ia.ciclo.3',section:'ciclo',group:'ia.ciclo',order:3,title:'Executar, verificar e autocorrigir',
 history:'A verificação autônoma usa evidências reais, como testes, compilação, lint, logs e comparação com o requisito; ela não elimina a revisão humana.',
 core:'O agente deve executar ações dentro do escopo necessário. Use menor privilégio, isolamento quando possível e confirmação para operações destrutivas ou externas. Ter shell não significa precisar de credenciais de produção.',
 application:'Autocorreção usa retorno de ferramentas para diagnosticar, ajustar e verificar novamente. Não significa infalibilidade: se nenhum teste cobre o requisito, uma suíte verde ainda pode deixar defeitos passarem.',
 q1:{prompt:'Qual configuração segue o menor privilégio?',correct:'Permitir só a pasta e comandos necessários e confirmar ações destrutivas.',wrong:['Dar acesso administrativo amplo.','Fornecer todas as credenciais e confiar no prompt.'],answer:0,why:'Isso limita o impacto de erros.'},
 q2:{prompt:'O que demonstra autocorreção?',correct:'Ler a falha, corrigir com base no diagnóstico e repetir a verificação.',wrong:['Relatar sucesso sem executar testes.','Remover todas as verificações que falham.'],answer:0,why:'A correção responde à evidência observada.'},
 questions:['q.ia.02.004','q.ia.02.005'],summary:['Execute dentro das permissões necessárias.','Autocorreção usa erros e testes para ajustar e verificar novamente.','Testes verdes não provam comportamentos não testados.']},
{id:'ia.mcp.1',section:'mcp',group:'ia.mcp',order:1,title:'De integrações sob medida ao MCP',
 history:'Em 25 de novembro de 2024, a Anthropic anunciou o Model Context Protocol como padrão aberto para conectar aplicações de IA a fontes de dados, ferramentas e ambientes de desenvolvimento.',
 core:'A motivação do MCP foi reduzir integrações específicas que isolavam aplicações e serviços. Um protocolo comum permite interfaces compartilhadas, mas não torna automaticamente confiável qualquer servidor.',
 application:'Sem padrão, M aplicações conectadas a N sistemas podem exigir até M × N integrações; com protocolo comum, o objetivo é aproximar o esforço de M + N. É uma simplificação: autenticação, capacidades e autorização ainda variam.',
 q1:{prompt:'Qual foi a finalidade central do MCP?',correct:'Padronizar conexões entre aplicações de IA, ferramentas e fontes de dados.',wrong:['Criar um novo modelo de linguagem.','Dispensar validação de segurança.'],answer:0,why:'Essa é a função central de interoperabilidade.'},
 q2:{prompt:'Qual vantagem o MCP oferece?',correct:'Reduzir integrações específicas por meio de uma interface comum.',wrong:['Eliminar diferenças entre todos os sistemas.','Garantir que qualquer ferramenta serve para toda tarefa.'],answer:0,why:'Uma interface compartilhada evita parte da duplicação.'},
 questions:['q.ia.02.007'],summary:['MCP foi anunciado em novembro de 2024 como protocolo aberto.','Uma interface comum pode reduzir conectores específicos.','MCP não substitui autorização, validação ou confiança.']},
{id:'ia.mcp.2',section:'mcp',group:'ia.mcp',order:2,title:'Arquitetura e transporte do MCP',
 history:'A arquitetura do MCP separa a aplicação que hospeda a experiência de IA, o componente de conexão e o sistema que expõe capacidades.',
 core:'O host é a aplicação de IA; o cliente fica dentro do host e mantém conexão com um servidor; o servidor expõe ferramentas, resources ou prompts. Um host pode manter vários clientes, normalmente um por servidor.',
 application:'MCP usa JSON-RPC 2.0 para estruturar mensagens. Em servidores locais, é comum stdio pela entrada e saída padrão; em servidores remotos, há Streamable HTTP. JSON-RPC define a estrutura; o transporte define como trafega.',
 q1:{prompt:'Quem mantém conexão com um servidor MCP específico?',correct:'O cliente dentro do host.',wrong:['O resource que executa a função.','O usuário manualmente a cada mensagem.'],answer:0,why:'Esse é o papel do cliente.'},
 q2:{prompt:'Qual combinação está correta?',correct:'JSON-RPC 2.0 estrutura mensagens; stdio é transporte local comum.',wrong:['stdio é linguagem para definir ferramentas.','JSON-RPC criptografa todos os dados.'],answer:0,why:'Isso separa formato e transporte.'},
 questions:['q.ia.02.008','q.ia.02.010','q.ia.02.011'],summary:['Host é a aplicação; cliente mantém conexão; servidor expõe capacidades.','MCP usa mensagens JSON-RPC 2.0.','stdio é comum em processos locais; Streamable HTTP atende conexões remotas.']},
{id:'ia.mcp.3',section:'mcp',group:'ia.mcp',order:3,title:'Tools, resources, prompts e segurança',
 history:'O uso do MCP exige distinguir funções executáveis, dados de contexto e modelos de instrução, bem como tratar conteúdo de terceiros como não confiável.',
 core:'Tools são funções que o modelo pode pedir para executar; resources são dados incluídos como contexto; prompts são modelos de instrução reutilizáveis. O host decide como mediar o uso dessas capacidades.',
 application:'Um servidor pode fornecer descrições, parâmetros ou resultados com instruções maliciosas, como enviar arquivos a endereço externo. Isso pode ser injeção de prompt indireta. Verifique origem, limite credenciais e confirme ações sensíveis.',
 q1:{prompt:'Qual primitiva corresponde a uma função que consulta uma API?',correct:'Tool.',wrong:['Resource.','Prompt reutilizável.'],answer:0,why:'Tool representa uma ação executável.'},
 q2:{prompt:'Uma descrição de ferramenta manda enviar arquivos fora da tarefa. O que fazer?',correct:'Tratar a descrição como não confiável e bloquear ação não autorizada.',wrong:['Aceitar porque veio via MCP.','Ampliar permissões para não falhar.'],answer:0,why:'O protocolo não torna automaticamente confiável o conteúdo.'},
 questions:['q.ia.02.009','q.ia.02.012'],summary:['Tool executa ação; resource fornece dado; prompt oferece instrução reutilizável.','Conteúdo externo pode conter instruções maliciosas.','Revise servidores, limite credenciais e confirme ações sensíveis.']},
{id:'ia.skills.1',section:'skills',group:'ia.skills',order:1,title:'De instruções repetidas a procedimentos reutilizáveis',
 history:'Equipes passaram de prompts repetidos para convenções persistentes, procedimentos especializados e automações acionadas por eventos.',
 core:'Arquivos como CLAUDE.md registram convenções recorrentes: como testar, quais padrões seguir e quais cuidados adotar. Isso economiza repetição, mas texto é orientação, não trava técnica absoluta.',
 application:'Uma skill empacota instruções para um fluxo especializado e pode incluir scripts, modelos e arquivos de apoio. O agente carrega o conteúdo completo quando a tarefa é relevante: isso é divulgação progressiva.',
 q1:{prompt:'Para que serve um arquivo de instruções do projeto?',correct:'Registrar regras e convenções aplicáveis a várias tarefas.',wrong:['Garantir que o agente jamais cometa erros.','Substituir testes e permissões.'],answer:0,why:'Isso torna instruções recorrentes acessíveis.'},
 q2:{prompt:'Que problema as skills ajudam a resolver?',correct:'Reutilizar procedimentos especializados sem repetir todo o conteúdo.',wrong:['Executar qualquer ação sem permissão.','Substituir o código por instruções.'],answer:0,why:'Isso melhora reutilização e consistência.'},
 questions:[],summary:['Arquivos de projeto guardam convenções gerais; skills reúnem procedimentos específicos.','Divulgação progressiva carrega detalhes quando relevantes.','Instruções não substituem controles técnicos.']},
{id:'ia.skills.2',section:'skills',group:'ia.skills',order:2,title:'Divulgação progressiva e contexto',
 history:'Divulgação progressiva disponibiliza descrições compactas no início e carrega detalhes quando a tarefa exige um procedimento especializado.',
 core:'O agente vê nomes e descrições curtas das skills e carrega instruções completas quando a tarefa é relevante; os pacotes podem apontar para checklists, modelos ou scripts.',
 application:'Regras gerais devem ter fonte comum; procedimentos específicos podem ficar em skills separadas. Escopo claro e materiais versionados evitam instruções duplicadas, antigas ou contraditórias.',
 q1:{prompt:'O que significa divulgação progressiva?',correct:'Carregar os detalhes de uma skill conforme a relevância para a tarefa.',wrong:['Carregar todas as skills completas no início.','Desativar todas as skills quando o contexto cresce.'],answer:0,why:'O conteúdo detalhado entra sob demanda.'},
 q2:{prompt:'Qual organização é mais consistente?',correct:'Regras gerais num local central e procedimentos em skills claras.',wrong:['Cópias divergentes do checklist em vários prompts.','Um arquivo com segredos e instruções misturados.'],answer:0,why:'Uma fonte adequada reduz conflitos.'},
 questions:['q.ia.02.013'],summary:['A descrição localiza uma skill; os detalhes entram sob demanda.','Escopo claro e materiais versionados facilitam manutenção.','Evite cópias conflitantes e nunca misture segredos ao conteúdo.']},
{id:'ia.skills.3',section:'skills',group:'ia.skills',order:3,title:'Hooks: tornar verificações automáticas',
 history:'Hooks conectam verificações a eventos do fluxo de trabalho para reduzir a dependência da memória do agente.',
 core:'Um hook é uma ação executada pela aplicação quando ocorre um evento, como antes ou depois de uma ferramenta. Pode formatar, validar ou bloquear operações. Skill descreve procedimento sob demanda; hook é acionado por evento.',
 application:'Prompt, arquivo de projeto e skill orientam o modelo, mas não garantem que ele siga a instrução. Permissões, proteção de branch e hooks podem impor verificações no momento da ação.',
 q1:{prompt:'Qual recurso representa verificação automática após edição?',correct:'Hook vinculado ao evento de edição.',wrong:['Skill que talvez seja escolhida para a tarefa.','Descrição de ferramenta sem execução.'],answer:0,why:'A execução é ligada ao evento.'},
 q2:{prompt:'Uma ação destrutiva exige confirmação. Qual controle é mais forte?',correct:'A aplicação bloqueia a ação até receber confirmação explícita.',wrong:['Um prompt diz “não apague”, sem barreira.','O agente promete não errar.'],answer:0,why:'O bloqueio é aplicado pela aplicação.'},
 questions:['q.ia.02.014'],summary:['Hook é acionado por evento; skill é procedimento; tool executa ação.','Instruções orientam; permissões e hooks podem impor controles.','Use verificações técnicas para requisitos críticos.']},
{id:'ia.qualidade.1',section:'qualidade',group:'ia.qualidade',order:1,title:'Validar código, não confiança',
 history:'Ferramentas de IA aceleram o desenvolvimento, mas podem inventar APIs ou gerar comportamento incorreto; a validação exige documentação, compilação, testes e revisão humana.',
 core:'Modelos podem sugerir métodos, parâmetros, arquivos ou bibliotecas inexistentes. O código pode falhar no build ou comportar-se errado mesmo compilando. Use documentação da versão, build, tipos e testes para riscos diferentes.',
 application:'Um teste útil falha quando o comportamento exigido está errado e passa quando está correto. Testes que aceitam qualquer resultado ou são alterados só para deixar o CI verde oferecem pouca proteção.',
 q1:{prompt:'Qual é a forma mais confiável de detectar método inexistente?',correct:'Conferir a API na documentação da versão e executar build/tipos.',wrong:['Perguntar ao mesmo modelo se tem certeza.','Renomear o método até compilar sem entender.'],answer:0,why:'Isso usa fonte e verificações objetivas.'},
 q2:{prompt:'Como avaliar se um teste protege a funcionalidade?',correct:'Verificar asserções, requisito e capacidade de detectar versão defeituosa.',wrong:['Aceitar que passou sem ler o que verifica.','Remover o teste quando encontra erro.'],answer:0,why:'Isso avalia o poder de detecção.'},
 questions:['q.ia.02.015','q.ia.02.017'],summary:['Modelos podem inventar APIs ou produzir comportamento incorreto.','Documentação, build, testes e revisão cobrem riscos distintos.','Uma suíte verde só dá evidência sobre casos testados.']},
{id:'ia.qualidade.2',section:'qualidade',group:'ia.qualidade',order:2,title:'Pacotes inventados e cadeia de suprimentos',
 history:'Nomes de pacotes sugeridos ou inventados por modelos podem ser registrados por atacantes e usados para distribuir código malicioso.',
 core:'Slopsquatting é o risco de registrar nomes de pacotes que modelos tendem a inventar e induzir desenvolvedores a instalá-los. Confira registro oficial, mantenedor, origem e atividade do projeto.',
 application:'Código de IA passa pelos controles normais: revisão, testes, análise estática, auditoria de dependências e busca de segredos. Se uma credencial aparecer no histórico, trate-a como exposta e revogue ou troque.',
 q1:{prompt:'O que descreve slopsquatting?',correct:'Registrar nomes de pacotes alucinados para induzir instalação maliciosa.',wrong:['Publicar documentação oficial de biblioteca.','Usar dependência com origem verificada.'],answer:0,why:'Isso explora confiança em nomes sugeridos por IA.'},
 q2:{prompt:'Qual prática reduz risco de dependência maliciosa?',correct:'Conferir origem, mantenedor e necessidade antes de instalar; limitar privilégios.',wrong:['Instalar com administrador sem revisar.','Desativar controles porque veio de IA.'],answer:0,why:'Isso reduz risco da cadeia de suprimentos.'},
 questions:['q.ia.02.016'],summary:['Slopsquatting explora nomes de pacotes sugeridos ou inventados por IA.','Verifique origem, mantenedor, versão, licença e necessidade.','Código gerado continua sujeito a revisão de dependências e segredos.']},
{id:'ia.qualidade.3',section:'qualidade',group:'ia.qualidade',order:3,title:'Privacidade, responsabilidade e ética',
 history:'O NIST publicou o AI Risk Management Framework 1.0 em janeiro de 2023 como referência voluntária para mapear, medir e gerir riscos de IA.',
 core:'Enviar código, logs ou dados a ferramenta externa é compartilhar informação com terceiro. Verifique autorização, finalidade, necessidade e regras de retenção. Dados pessoais ou sigilosos não devem ir para ferramentas não autorizadas; prefira dados sintéticos ou minimizados.',
 application:'A ferramenta não assume responsabilidade pelo código publicado. Quem aprova confere requisitos, testes, controles, licenças e políticas. O framework do NIST é referência para gestão de risco, não garantia automática de segurança.',
 q1:{prompt:'Uma consulta contém nomes e CPFs. Qual conduta é adequada?',correct:'Não enviar a serviço externo não autorizado; usar dados sintéticos/minimizados e seguir a política.',wrong:['Enviar a base inteira porque a pergunta é técnica.','Colar dados numa ferramenta pública e pedir discrição.'],answer:0,why:'Isso limita exposição e respeita autorização.'},
 q2:{prompt:'Quem responde pelo código gerado por IA e aprovado para o órgão?',correct:'As pessoas e a organização que revisam, aprovam e colocam o código em uso.',wrong:['A ferramenta de IA exclusivamente.','O fornecedor do compilador, independentemente da mudança.'],answer:0,why:'A responsabilidade não é transferida ao modelo.'},
 questions:['q.ia.02.018','q.ia.02.019','q.ia.02.020'],summary:['Avalie autorização, finalidade e minimização antes de usar ferramenta externa.','Quem revisa e aprova continua responsável pelo código gerado.','A revisão inclui testes, segurança, dependências, licenças e critérios de aceite.']}
];
export const microLessonsAgentesMcp:MicroLesson[]=lessons.map(build);
