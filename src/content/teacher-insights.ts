import { teacherForChapter } from '@/content/teachers';
import type { FictionalTeacher } from '@/content/teachers';

export interface TeacherInsightContent { title:string; lead:string; practical:string; question:string; answer:string }
export interface TeacherInsight { teacher:FictionalTeacher; content:TeacherInsightContent }
const entries:Record<string,TeacherInsightContent>={
 math:{title:'A estimativa que evita um erro',lead:'Antes da conta exata, faça uma previsão aproximada. A ordem de grandeza ajuda a perceber resultados impossíveis.',practical:'Se algo custa R$ 48 e recebe desconto de 10%, o resultado deve ficar perto de R$ 43 — não em R$ 4 nem em R$ 480.',question:'Qual é o primeiro teste para conferir um resultado numérico?',answer:'Veja se ele faz sentido no contexto e na ordem de grandeza antes de confiar nas operações.'},
 basic:{title:'Modelo útil não é a realidade inteira',lead:'Diagramas e analogias simplificam um sistema para facilitar o raciocínio, mas sempre deixam detalhes de fora.',practical:'A analogia “CPU como cérebro” ajuda a começar, porém memória, armazenamento e sistema operacional têm funções próprias.',question:'Por que não devemos levar uma analogia ao pé da letra?',answer:'Porque ela destaca algumas relações e esconde outras; use-a para começar e confirme os detalhes técnicos.'},
 os:{title:'Investigue antes de encerrar um processo',lead:'Um processo lento pode ser sintoma de outra coisa. Coletar estado e consumo antes de agir preserva evidências.',practical:'Compare uso de CPU, memória e horário do problema antes de decidir se precisa reiniciar um serviço.',question:'Por que encerrar um processo à força deve ser o último recurso?',answer:'Porque pode perder trabalho não salvo, interromper uma operação ou esconder a causa original.'},
 networks:{title:'Latência não é largura de banda',lead:'Uma rede pode transferir muitos dados por segundo e ainda demorar para iniciar uma resposta. São medidas diferentes.',practical:'Uma chamada pode sofrer com latência alta mesmo quando um teste de download mostra boa velocidade.',question:'O que investigar primeiro numa chamada com atraso?',answer:'Latência, variação da latência (jitter) e perda de pacotes; largura de banda isolada não explica tudo.'},
 data:{title:'NULL não significa zero',lead:'Em bancos relacionais, NULL representa ausência ou desconhecimento de um valor; não é igual a 0 nem a texto vazio.',practical:'Para procurar valores ausentes, use IS NULL em vez de comparar com = NULL.',question:'Como filtrar linhas sem data de encerramento?',answer:'Use WHERE data_encerramento IS NULL.'},
 security:{title:'Comece pelo ativo que precisa proteger',lead:'Uma revisão de segurança fica concreta ao identificar o ativo, o cenário de ameaça, o impacto e uma mitigação verificável.',practical:'Para uma conta administrativa, considere roubo de credenciais, autenticação multifator, privilégio mínimo e auditoria.',question:'Qual é a primeira pergunta antes de escolher um controle?',answer:'O que estamos protegendo e qual cenário de ameaça queremos reduzir?'},
 cloud:{title:'Nuvem não elimina responsabilidades',lead:'O provedor protege parte da infraestrutura; o cliente ainda responde por identidades, dados, configurações e uso.',practical:'Um banco gerenciado não impede, por si só, que alguém exponha uma credencial ou conceda acesso amplo demais.',question:'Ter um serviço gerenciado dispensa revisar permissões?',answer:'Não. A responsabilidade é compartilhada e a configuração de acesso continua importante.'},
 language:{title:'Conectivos mudam a interpretação',lead:'Palavras como “porém”, “embora” e “portanto” indicam contraste, concessão ou conclusão e podem mudar o sentido da alternativa.',practical:'Se uma frase apresenta hipótese e depois usa “however”, procure oposição, não repetição.',question:'O que fazer quando duas alternativas parecem corretas?',answer:'Compare a relação lógica entre frases e veja qual mantém os conectivos e a ideia global.'},
 governance:{title:'Transforme regra em evidência',lead:'Uma política só funciona quando alguém é responsável, há procedimento aplicável e existe evidência do resultado.',practical:'Além de “fazer backup”, defina frequência, responsável, retenção e testes de restauração.',question:'Como provar que um controle funciona?',answer:'Com registros e testes que demonstrem execução e resultado, não apenas a existência de um documento.'},
 software:{title:'Um requisito precisa ser verificável',lead:'Um requisito como “o sistema deve ser rápido” é vago até virar uma condição observável e testável.',practical:'“95% das consultas respondem em até 300 ms sob 200 requisições simultâneas” oferece um critério verificável.',question:'O que falta num requisito como “fácil de usar”?',answer:'Contexto, usuário, tarefa e um critério de avaliação mensurável.'},
 ai:{title:'Resposta plausível ainda precisa de verificação',lead:'Modelos generativos podem produzir texto fluente com fatos incorretos. Fluência não comprova verdade.',practical:'Para um dado do edital ou uma norma, confira a fonte primária e registre qual versão foi consultada.',question:'Qual é o cuidado mínimo antes de usar uma resposta de IA como fato?',answer:'Validar afirmações relevantes em fontes confiáveis e não inserir dados pessoais ou sigilosos sem base autorizada.'},
};
export function teacherInsightForChapter(chapterId:string):TeacherInsight{
 let key='basic';
 if(chapterId.startsWith('cap.mat'))key='math';
 else if(chapterId.startsWith('cap.port')||chapterId.startsWith('cap.ingles'))key='language';
 else if(chapterId.startsWith('cap.dados'))key='data';
 else if(chapterId.startsWith('cap.gov')||chapterId.startsWith('cap.leg')||chapterId.startsWith('cap.inst'))key='governance';
 else if(chapterId.startsWith('cap.es')||chapterId.startsWith('cap.dev')||chapterId.startsWith('cap.devops'))key='software';
 else if(chapterId.startsWith('cap.seg'))key='security';
 else if(chapterId.startsWith('cap.ia'))key='ai';
 else if(chapterId==='cap.infra.01'||chapterId==='cap.prim.02')key='networks';
 else if(chapterId==='cap.infra.02')key='cloud';
 else if(chapterId==='cap.infra.03'||chapterId.startsWith('cap.prim'))key='os';
 return {teacher:teacherForChapter(chapterId),content:entries[key]};
}
